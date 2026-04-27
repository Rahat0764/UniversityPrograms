export default async function handler(req, res) {
  const { univ } = req.query;

  if (!univ) {
    return res.status(400).json({ error: 'University name is required' });
  }

  const googleKey = process.env.GOOGLE_API_KEY;
  const googleCx = process.env.GOOGLE_CX_ID;
  const serperKey = process.env.SERPER_API_KEY;

  const query = `"${univ}" "QS World University Rankings 2024" OR "QS World University Rankings 2025"`;
  let rank = null;

  const extractRank = (snippet) => {
    const match = snippet?.match(/(?:rank(?:ed)?\s*(?:#|no\.?)?\s*|qs\s*ranking\s*(?:#|no\.?)?\s*|\b(?:is|placed|positioned)\s*(?:#|no\.?)?\s*)(\d{1,4}(?:\s*-\s*\d{1,4})?)/i);
    return match ? match[1].replace(/\s/g, '') : null;
  };

  if (googleKey && googleCx && !rank) {
    try {
      const gUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&q=${encodeURIComponent(query)}`;
      const r = await fetch(gUrl);
      const data = await r.json();
      for (let item of (data.items || [])) {
        rank = extractRank(item.snippet);
        if (rank) break;
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
      for (let item of (data.organic || [])) {
        rank = extractRank(item.snippet);
        if (rank) break;
      }
    } catch (e) {
      console.error("Serper API Failed", e);
    }
  }

  if (rank) {
    return res.status(200).json({ rank });
  } else {
    return res.status(404).json({ error: 'Rank not found in search results' });
  }
}