// api/qs.js
export default async function handler(req, res) {
  const { univ } = req.query;

  if (!univ) {
    return res.status(400).json({ error: 'University name is required' });
  }

  const googleKey = process.env.GOOGLE_API_KEY;
  const googleCx = process.env.GOOGLE_CX_ID;
  const serperKey = process.env.SERPER_API_KEY;

  // Query updated for more precise results specifically from topuniversities
  const query = `"${univ}" "QS World University Rankings 2025" site:topuniversities.com`;
  let rank = null;

  // Improved Regex to strictly catch the main QS ranking
  // Looks for patterns like "Ranked #143" or "Rank: 143" or just "#143" near "QS World University Rankings"
  const extractRank = (snippet) => {
    if (!snippet) return null;
    
    // Pattern 1: Exact matches like "Ranked #143" or "Rank 143"
    const strictMatch = snippet.match(/(?:rank(?:ed)?\s*#?|ranking\s*#?)(\d{1,4}(?:-\d{1,4})?)/i);
    if (strictMatch && strictMatch[1]) return strictMatch[1];

    // Pattern 2: Looks for #Number close to QS related text
    const fallbackMatch = snippet.match(/#\s*(\d{1,4}(?:-\d{1,4})?)\s*(?:in|QS|World|University)/i);
    if (fallbackMatch && fallbackMatch[1]) return fallbackMatch[1];

    return null;
  };

  if (googleKey && googleCx && !rank) {
    try {
      const gUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&q=${encodeURIComponent(query)}`;
      const r = await fetch(gUrl);
      const data = await r.json();
      
      if (data.items) {
        for (let item of data.items) {
          // Check both snippet and page title for rank
          rank = extractRank(item.snippet) || extractRank(item.title);
          if (rank) break;
        }
      }
    } catch (e) {
      console.error("Google API Failed", e);
    }
  }

  if (!rank && serperKey) {
    try {
      const r = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': serperKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query })
      });
      const data = await r.json();
      
      if (data.organic) {
        for (let item of data.organic) {
          rank = extractRank(item.snippet) || extractRank(item.title);
          if (rank) break;
        }
      }
    } catch (e) {
      console.error("Serper API Failed", e);
    }
  }

  if (rank) {
    return res.status(200).json({ rank });
  } else {
    // If exact rank is not found, return N/A so the user can input it manually without errors
    return res.status(200).json({ rank: 'N/A' }); 
  }
}