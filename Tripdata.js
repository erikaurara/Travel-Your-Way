/* ==========================================================================
   TRAVEL YOUR WAY — Trip generation engine (v1, client-side only)

   This is intentionally simple: a small curated dataset for a couple of
   flagship destinations, plus a generic engine that can produce a
   reasonable-looking itinerary for ANY typed destination by combining
   an activity pool with the traveler's interests.

   Nothing here calls a server. Everything runs in the browser.
   ========================================================================== */

const CURRENCY_DEFAULT = '$';

/* ---------- Curated destinations ---------- */
const DESTINATIONS = {
  japan: {
    name: 'Japan',
    aliases: ['japan', 'tokyo', 'kyoto', 'osaka', 'hakone', 'nara', 'nikko'],
    currency: '¥',
    stops: [
      {
        area: 'Tokyo — Shibuya & Harajuku',
        activities: ['Shibuya Crossing', 'Harajuku\'s Takeshita Street', 'Meiji Shrine'],
        tags: ['shopping', 'photography', 'nightlife'],
        crowd: 'popular', walking: 'moderate', transferMin: 0, spending: 10000,
        rain: { area: 'Tokyo — Indoor Shibuya & Harajuku', activities: ['teamLab digital art museum', 'Shibuya Scramble Square observation deck', 'covered shopping arcades'], walking: 'low', spending: 9000 }
      },
      {
        area: 'Tokyo — Asakusa & Old Town',
        activities: ['Senso-ji Temple', 'Nakamise shopping street', 'Sumida River cruise'],
        tags: ['history', 'photography', 'shopping'],
        crowd: 'popular', walking: 'moderate', transferMin: 0, spending: 7000,
        rain: { area: 'Tokyo — Asakusa indoors', activities: ['Sumida Aquarium', 'Tobacco & Salt Museum', 'covered arcade shopping'], walking: 'low', spending: 6000 }
      },
      {
        area: 'Hakone — Lake Ashi & Onsen',
        activities: ['Lake Ashi cruise', 'Hakone Shrine', 'Onsen soak with Mt. Fuji views'],
        tags: ['nature', 'photography'],
        crowd: 'hidden', walking: 'low', transferMin: 120, spending: 12000,
        rain: { area: 'Hakone — Museums & Onsen', activities: ['Hakone Open-Air Museum (covered pavilions)', 'Pola Museum of Art', 'indoor onsen ryokan'], walking: 'low', spending: 11000 }
      },
      {
        area: 'Kyoto — Temples & Gion',
        activities: ['Fushimi Inari Shrine', 'Kiyomizu-dera', 'Gion district walk'],
        tags: ['history', 'photography', 'art'],
        crowd: 'popular', walking: 'high', transferMin: 150, spending: 8000,
        rain: { area: 'Kyoto — Indoor Kyoto', activities: ['Nijo Castle interior', 'Kyoto International Manga Museum', 'covered Nishiki Market'], walking: 'moderate', spending: 7000 }
      },
      {
        area: 'Kyoto — Arashiyama',
        activities: ['Bamboo Grove', 'Tenryu-ji Temple garden', 'riverside lunch'],
        tags: ['nature', 'photography', 'food'],
        crowd: 'hidden', walking: 'moderate', transferMin: 30, spending: 6000,
        rain: { area: 'Kyoto — Arashiyama indoors', activities: ['Tenryu-ji temple hall', 'local sake tasting room', 'covered craft workshop'], walking: 'low', spending: 6000 }
      },
      {
        area: 'Osaka — Dotonbori & Street Food',
        activities: ['Dotonbori canal walk', 'street food crawl (takoyaki, okonomiyaki)', 'Shinsaibashi shopping'],
        tags: ['food', 'nightlife', 'shopping'],
        crowd: 'popular', walking: 'moderate', transferMin: 90, spending: 9000,
        rain: { area: 'Osaka — Indoor food halls', activities: ['Kuromon covered market', 'department store food basement (depachika)', 'indoor arcade'], walking: 'low', spending: 8000 }
      },
      {
        area: 'Nara — Deer Park & Temples',
        activities: ['Nara Park deer', 'Todai-ji Great Buddha Hall', 'Kasuga Taisha lanterns'],
        tags: ['nature', 'history', 'photography'],
        crowd: 'hidden', walking: 'moderate', transferMin: 45, spending: 4000,
        rain: { area: 'Nara — Indoor Nara', activities: ['Todai-ji Great Buddha Hall (covered)', 'Nara National Museum', 'covered shopping arcade'], walking: 'low', spending: 4000 }
      },
      {
        area: 'Nikko — Shrines & Waterfalls',
        activities: ['Toshogu Shrine', 'Kegon Falls viewpoint', 'forest walk'],
        tags: ['nature', 'history'],
        crowd: 'hidden', walking: 'high', transferMin: 120, spending: 6000,
        rain: { area: 'Nikko — Indoor Nikko', activities: ['Toshogu Shrine covered halls', 'Nikkozan Rinnoji Temple hall', 'local museum'], walking: 'low', spending: 5000 }
      }
    ]
  },
  italy: {
    name: 'Italy',
    aliases: ['italy', 'rome', 'florence', 'venice', 'tuscany', 'cinque terre'],
    currency: '€',
    stops: [
      {
        area: 'Rome — Ancient Core',
        activities: ['Colosseum', 'Roman Forum', 'Palatine Hill'],
        tags: ['history', 'photography'],
        crowd: 'popular', walking: 'high', transferMin: 0, spending: 90,
        rain: { area: 'Rome — Indoor Ancient Rome', activities: ['Colosseum underground exhibit', 'Capitoline Museums', 'covered gallery near the Forum'], walking: 'moderate', spending: 85 }
      },
      {
        area: 'Rome — Vatican',
        activities: ['Vatican Museums', 'Sistine Chapel', 'St. Peter\'s Basilica'],
        tags: ['art', 'history'],
        crowd: 'popular', walking: 'moderate', transferMin: 20, spending: 70,
        rain: { area: 'Rome — Vatican (fully indoor already)', activities: ['Vatican Museums', 'Sistine Chapel', 'St. Peter\'s Basilica'], walking: 'moderate', spending: 70 }
      },
      {
        area: 'Rome — Trastevere',
        activities: ['Trastevere back streets', 'trattoria dinner', 'gelato crawl'],
        tags: ['food', 'nightlife', 'photography'],
        crowd: 'hidden', walking: 'low', transferMin: 15, spending: 60,
        rain: { area: 'Rome — Trastevere indoors', activities: ['covered food market', 'wine bar tasting', 'trattoria dinner'], walking: 'low', spending: 60 }
      },
      {
        area: 'Florence — Renaissance Core',
        activities: ['Uffizi Gallery', 'Duomo climb', 'Ponte Vecchio'],
        tags: ['art', 'history', 'photography'],
        crowd: 'popular', walking: 'moderate', transferMin: 90, spending: 75,
        rain: { area: 'Florence — Indoor Florence', activities: ['Uffizi Gallery', 'Accademia (David)', 'covered leather market'], walking: 'low', spending: 70 }
      },
      {
        area: 'Tuscany — Countryside',
        activities: ['vineyard tour', 'wine tasting', 'hilltop village stroll'],
        tags: ['food', 'nature', 'photography'],
        crowd: 'hidden', walking: 'low', transferMin: 60, spending: 95,
        rain: { area: 'Tuscany — Indoor tasting', activities: ['cellar wine tasting', 'cooking class', 'covered village market'], walking: 'low', spending: 90 }
      },
      {
        area: 'Venice — Canals & San Marco',
        activities: ['Gondola ride', 'St. Mark\'s Basilica', 'Rialto Market'],
        tags: ['photography', 'history', 'shopping'],
        crowd: 'popular', walking: 'moderate', transferMin: 150, spending: 100,
        rain: { area: 'Venice — Indoor Venice', activities: ['Doge\'s Palace', 'Peggy Guggenheim Collection', 'covered glass-blowing workshop on Murano'], walking: 'low', spending: 90 }
      },
      {
        area: 'Cinque Terre — Coastal Villages',
        activities: ['coastal trail hike', 'Vernazza harbor', 'seafood lunch'],
        tags: ['nature', 'food', 'photography'],
        crowd: 'hidden', walking: 'high', transferMin: 120, spending: 65,
        rain: { area: 'Cinque Terre — Village-only day', activities: ['train hop between villages', 'covered trattoria lunch', 'harbor-front cafe'], walking: 'low', spending: 55 }
      }
    ]
  }
};

/* ---------- Generic fallback pool (used for any typed destination) ---------- */
const GENERIC_AREA_NAMES = [
  'Old Town', 'Waterfront District', 'Market Quarter', 'Hilltop Overlook',
  'Cultural District', 'Riverside Promenade', 'Historic Center', 'Local Neighborhoods'
];

const GENERIC_ACTIVITY_POOL = {
  food: { activities: ['a local food market crawl', 'a cooking class', 'a tasting menu at a family-run restaurant'], walking: 'low', spending: 50 },
  nature: { activities: ['a scenic trail walk', 'a viewpoint hike', 'a park or botanical garden visit'], walking: 'high', spending: 20 },
  shopping: { activities: ['the main shopping district', 'a local artisan market', 'a boutique-lined old quarter'], walking: 'moderate', spending: 60 },
  history: { activities: ['the old town\'s historic core', 'a landmark museum', 'a heritage site walking tour'], walking: 'moderate', spending: 30 },
  photography: { activities: ['a golden-hour viewpoint', 'a colorful old-town street', 'a landmark photo stop'], walking: 'moderate', spending: 10 },
  art: { activities: ['the city\'s main art museum', 'a gallery district', 'a public art & mural walk'], walking: 'low', spending: 25 },
  nightlife: { activities: ['a rooftop bar', 'a live-music neighborhood', 'a night market'], walking: 'moderate', spending: 45 }
};

/* ---------- Helpers ---------- */
const WALK_NUM = { low: 1, moderate: 2, high: 3 };

function findDestination(input) {
  const q = (input || '').trim().toLowerCase();
  if (!q) return null;
  for (const key in DESTINATIONS) {
    const d = DESTINATIONS[key];
    if (d.aliases.some(a => q.includes(a) || a.includes(q))) return d;
  }
  return null;
}

function titleCase(str) {
  return str.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
}

/* Build a synthetic stop pool for an unrecognized destination name,
   using the traveler's interests so it still feels relevant. */
function buildGenericPool(destinationLabel, interests) {
  const label = titleCase(destinationLabel || 'Your Destination');
  const usedInterests = interests.length ? interests : ['history', 'food', 'photography'];
  const pool = [];
  GENERIC_AREA_NAMES.forEach((area, i) => {
    const interest = usedInterests[i % usedInterests.length];
    const spec = GENERIC_ACTIVITY_POOL[interest] || GENERIC_ACTIVITY_POOL.history;
    pool.push({
      area: `${label} — ${area}`,
      activities: spec.activities,
      tags: [interest],
      crowd: i % 2 === 0 ? 'popular' : 'hidden',
      walking: spec.walking,
      transferMin: i === 0 ? 0 : 20 + (i * 10),
      spending: spec.spending,
      rain: {
        area: `${label} — ${area} (indoor plan)`,
        activities: ['a covered market or museum nearby', 'an indoor cultural stop', 'a cafe to wait out the weather'],
        walking: 'low',
        spending: Math.round(spec.spending * 0.85)
      }
    });
  });
  return { name: label, currency: CURRENCY_DEFAULT, stops: pool };
}

function scoreStop(stop, request) {
  let score = 0;
  const interests = request.interests || [];
  interests.forEach(i => { if (stop.tags.includes(i)) score += 3; });
  if (request.crowds === 'avoid' && stop.crowd === 'hidden') score += 2;
  if (request.crowds === 'popular' && stop.crowd === 'popular') score += 2;
  if (request.walking === 'minimal' && stop.walking === 'low') score += 1;
  if (request.walking === 'a lot' && stop.walking === 'high') score += 1;
  return score;
}

function activityCountForStyle(style) {
  if (style === 'relaxed') return 2;
  if (style === 'adventure') return 4;
  return 3; // balanced
}

/* ---------- Core generator ---------- */
function generateTrip(request, easyMode) {
  easyMode = !!easyMode;
  const dest = findDestination(request.destination);
  const dataset = dest || buildGenericPool(request.destination, request.interests);
  const isGeneric = !dest;

  const pool = [...dataset.stops].sort((a, b) => scoreStop(b, request) - scoreStop(a, request));

  const days = Math.max(1, Math.min(21, parseInt(request.days, 10) || 5));
  let chosen = pool.slice(0, days);
  // If not enough curated stops, cycle back through the pool for extra days
  while (chosen.length < days) {
    chosen.push(pool[chosen.length % pool.length]);
  }

  let baseActivityCount = activityCountForStyle(request.style);
  if (easyMode) baseActivityCount = Math.max(1, baseActivityCount - 1);

  const itinerary = chosen.map((stop, idx) => {
    let useStop = stop;
    let walking = stop.walking;

    // Easy mode: if this stop is high-walking and has a gentler rain/indoor
    // alternative, borrow that alternative's pacing even on a clear day.
    if (easyMode && stop.walking === 'high' && stop.rain) {
      walking = 'moderate';
    }

    let acts = useStop.activities.slice(0, baseActivityCount);
    if (acts.length === 0) acts = useStop.activities.slice(0, 1);

    return {
      dayNum: idx + 1,
      area: useStop.area,
      activities: acts,
      walking: walking,
      transferMin: easyMode ? Math.round(useStop.transferMin * 0.6) : useStop.transferMin,
      spending: easyMode ? Math.round(useStop.spending * 0.9) : useStop.spending,
      rain: useStop.rain
    };
  });

  const totalSpending = itinerary.reduce((s, d) => s + d.spending, 0);
  const budget = parseFloat(request.budget) || 0;
  let budgetStatus = 'unknown';
  if (budget > 0) {
    if (totalSpending <= budget * 0.85) budgetStatus = 'under';
    else if (totalSpending <= budget * 1.1) budgetStatus = 'on';
    else budgetStatus = 'over';
  }

  const effort = computeEffort(itinerary, request, easyMode);

  return {
    destinationLabel: isGeneric ? titleCase(request.destination) : dataset.name,
    currency: dataset.currency || CURRENCY_DEFAULT,
    days: days,
    itinerary: itinerary,
    totalSpending: totalSpending,
    budget: budget,
    budgetStatus: budgetStatus,
    effort: effort,
    isGeneric: isGeneric,
    easyMode: easyMode
  };
}

/* ---------- Effort scoring (the signature feature) ---------- */
function computeEffort(itinerary, request, easyMode) {
  const styleBase = { relaxed: 3, balanced: 5, adventure: 8 }[request.style] || 5;

  const avgWalkNum = itinerary.reduce((s, d) => s + WALK_NUM[d.walking], 0) / itinerary.length;
  const longTransferDays = itinerary.filter(d => d.transferMin >= 90).length;
  const anyTransferDays = itinerary.filter(d => d.transferMin > 0).length;

  let walkMismatch = 0;
  if (request.walking === 'minimal' && avgWalkNum > 1.5) walkMismatch = (avgWalkNum - 1) * 1.5;
  if (request.walking === 'a lot' && avgWalkNum < 2) walkMismatch = -0.5;

  let score = styleBase + walkMismatch + (longTransferDays * 0.7);
  if (easyMode) score -= 2.5;
  score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));

  let label = 'relaxed';
  if (score >= 9) label = 'intense';
  else if (score >= 7) label = 'active';
  else if (score >= 4) label = 'moderate';

  function starsFrom(n) { return Math.max(1, Math.min(5, Math.round(n))); }

  const walkingStars = starsFrom((avgWalkNum / 3) * 5 - (easyMode ? 1 : 0));
  const transportStars = starsFrom(1 + anyTransferDays * 0.6 - (easyMode ? 1 : 0));
  const earlyMorningStars = starsFrom((request.style === 'adventure' ? 3 : request.style === 'balanced' ? 2 : 1) - (easyMode ? 1 : 0));
  const transferStars = starsFrom(1 + longTransferDays * 0.8 - (easyMode ? 1 : 0));

  return {
    score: score,
    label: label,
    walkingStars: walkingStars,
    transportStars: transportStars,
    earlyMorningStars: earlyMorningStars,
    transferStars: transferStars
  };
}

function starString(n) {
  const full = '★'.repeat(n);
  const empty = '<span class="off">' + '★'.repeat(5 - n) + '</span>';
  return full + empty;
}

function walkingLabel(w) {
  return { low: 'Low', moderate: 'Moderate', high: 'High' }[w] || w;
}