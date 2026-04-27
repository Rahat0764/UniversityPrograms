export default async function handler(req, res) {
  const { univ } = req.query;

  if (!univ) {
    return res.status(400).json({ error: 'University name is required' });
  }

  const googleKey = process.env.GOOGLE_API_KEY;
  const googleCx  = process.env.GOOGLE_CX_ID;
  const serperKey = process.env.SERPER_API_KEY;

  
  const query = `"${univ}" QS World University Rankings 2026 site:topuniversities.com`;
  let rank = null;

  
  const extractRank = (snippet, title) => {
    if (!snippet && !title) return null;
    const text = `${title || ''} ${snippet || ''}`;

    
    const isSubjectRank = (matchIndex, captured) => {
      const start = Math.max(0, matchIndex - 80);
      const end   = Math.min(text.length, matchIndex + captured.length + 80);
      const ctx   = text.slice(start, end);
      return /by\s+(?:subject|faculty|topic|area|discipline)/i.test(ctx);
    };

    const patternA = /#\s*(\d{1,4}(?:-\d{1,4})?)\s*(?:in\s+)?(?=QS World)|(?:QS World University Rankings?[^\n#]{0,80}?)#\s*(\d{1,4}(?:-\d{1,4})?)/gi;
    let mA;
    while ((mA = patternA.exec(text)) !== null) {
      const r   = mA[1] || mA[2];
      const idx = text.indexOf(r, mA.index);
      if (!isSubjectRank(idx, r)) return r;
    }

    
    const patternB = /\b(?:rank(?:ed|ing)?)\s*[:#]?\s*(\d{1,4}(?:-\d{1,4})?)\b/gi;
    let mB;
    while ((mB = patternB.exec(text)) !== null) {
      const r   = mB[1];
      const idx = text.indexOf(r, mB.index);
      if (!isSubjectRank(idx, r)) return r;
    }

    const patternC = /=\s*(\d{1,4})\s+(?:in|QS)/i;
    const mC = text.match(patternC);
    if (mC) {
      const idx = text.indexOf(mC[1]);
      if (!isSubjectRank(idx, mC[1])) return mC[1];
    }

    return null;
  };

  // Google Custom Search 
  if (googleKey && googleCx) {
    try {
      const gUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&q=${encodeURIComponent(query)}&num=5`;
      const r    = await fetch(gUrl);
      const data = await r.json();

      if (data.items) {
        
        const sorted = [...data.items].sort((a, b) => {
          const aProfile = a.link?.includes('/universities/') ? 0 : 1;
          const bProfile = b.link?.includes('/universities/') ? 0 : 1;
          return aProfile - bProfile;
        });

        for (const item of sorted) {
          rank = extractRank(item.snippet, item.title);
          if (rank) break;
        }
      }
    } catch (e) {
      console.error('Google API Failed', e);
    }
  }

  // Serper Fallback
  if (!rank && serperKey) {
    try {
      const r = await fetch('https://google.serper.dev/search', {
        method:  'POST',
        headers: { 'X-API-KEY': serperKey, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ q: query, num: 5 }),
      });
      const data = await r.json();

      if (data.organic) {
        const sorted = [...data.organic].sort((a, b) => {
          const aProfile = a.link?.includes('/universities/') ? 0 : 1;
          const bProfile = b.link?.includes('/universities/') ? 0 : 1;
          return aProfile - bProfile;
        });

        for (const item of sorted) {
          rank = extractRank(item.snippet, item.title);
          if (rank) break;
        }
      }
    } catch (e) {
      console.error('Serper API Failed', e);
    }
  }

  
  if (rank) {
    return res.status(200).json({ rank });
  } else {
    return res.status(404).json({ rank: null });
  }
}
