/* ==========================================================================
   TRAVEL YOUR WAY — i18n (v1 scope)

   Honest scope note: this translates the site CHROME — nav, hero, footer,
   buttons, section headers — across English / Japanese / Spanish / Chinese.
   It does NOT translate generated trip content (itineraries are produced
   on the fly from an English dataset). A real localized itinerary engine
   is future work; see README.
   ========================================================================== */

const LANGUAGES = {
  en: { label: 'English', flag: '🇬🇧' },
  ja: { label: '日本語', flag: '🇯🇵' },
  es: { label: 'Español', flag: '🇪🇸' },
  zh: { label: '中文', flag: '🇨🇳' }
};

const I18N = {
  en: {
    'nav.home': 'Home', 'nav.plan': 'Plan My Trip', 'nav.destinations': 'Destinations',
    'nav.sample': 'Sample Trips', 'nav.about': 'About', 'nav.contact': 'Contact',
    'hero.eyebrow': 'A travel agency built around you',
    'hero.title': 'Your trip. Your pace. Your way.',
    'hero.lede': 'Tell us how you want to travel and we\u2019ll build a trip around you \u2014 not just a list of sights.',
    'hero.cta': 'Plan My Trip',
    'hero.note': 'No account needed \u00b7 takes about 2 minutes',
    'why.eyebrow': 'Why travel with us',
    'why.title': 'We plan around how you travel, not just where',
    'why.pace.title': 'Your Pace',
    'why.pace.body': 'Choose relaxed, balanced, or adventure \u2014 every itinerary is paced to match, not the other way around.',
    'why.budget.title': 'Your Budget',
    'why.budget.body': 'We build the trip around what you\u2019re comfortable spending, and show you exactly where the money goes.',
    'why.backup.title': 'Your Backup Plan',
    'why.backup.body': 'Every day comes with a Plan B, so weather or a closed attraction never derails your trip.',
    'footer.tagline': 'Trips planned around how you actually like to travel.',
    'footer.explore': 'Explore', 'footer.company': 'Company', 'footer.legal': 'Legal',
    'btn.planTrip': 'Plan My Trip', 'btn.seeSample': 'See a Sample Trip'
  },
  ja: {
    'nav.home': 'ホーム', 'nav.plan': '旅程を作成', 'nav.destinations': '目的地',
    'nav.sample': 'サンプル旅程', 'nav.about': '会社概要', 'nav.contact': 'お問い合わせ',
    'hero.eyebrow': 'あなたに合わせた旅行代理店',
    'hero.title': 'あなたの旅。あなたのペースで。',
    'hero.lede': '旅のスタイルを教えてください。あなたに合わせた旅程をお作りします。',
    'hero.cta': '旅程を作成する',
    'hero.note': '登録不要・所要時間は約2分',
    'why.eyebrow': '選ばれる理由',
    'why.title': '「どこへ」だけでなく「どう旅するか」で計画します',
    'why.pace.title': 'あなたのペース',
    'why.pace.body': 'のんびり・バランス・アドベンチャーから選択。旅程はあなたのペースに合わせます。',
    'why.budget.title': 'あなたの予算',
    'why.budget.body': 'ご予算に合わせて旅程を組み立て、内訳もわかりやすくご提示します。',
    'why.backup.title': 'バックアッププラン',
    'why.backup.body': '毎日プランBをご用意。悪天候や休館でも旅が止まりません。',
    'footer.tagline': 'あなたの旅のスタイルに合わせて計画します。',
    'footer.explore': '探す', 'footer.company': '会社情報', 'footer.legal': '規約',
    'btn.planTrip': '旅程を作成する', 'btn.seeSample': 'サンプルを見る'
  },
  es: {
    'nav.home': 'Inicio', 'nav.plan': 'Planear mi viaje', 'nav.destinations': 'Destinos',
    'nav.sample': 'Viajes de ejemplo', 'nav.about': 'Nosotros', 'nav.contact': 'Contacto',
    'hero.eyebrow': 'Una agencia de viajes creada en torno a ti',
    'hero.title': 'Tu viaje. Tu ritmo. A tu manera.',
    'hero.lede': 'Cu\u00e9ntanos c\u00f3mo te gusta viajar y crearemos un itinerario alrededor de ti.',
    'hero.cta': 'Planear mi viaje',
    'hero.note': 'No necesitas cuenta \u00b7 toma unos 2 minutos',
    'why.eyebrow': 'Por qu\u00e9 viajar con nosotros',
    'why.title': 'Planeamos seg\u00fan c\u00f3mo viajas, no solo a d\u00f3nde',
    'why.pace.title': 'Tu ritmo',
    'why.pace.body': 'Elige relajado, equilibrado o aventura: el itinerario se ajusta a tu ritmo.',
    'why.budget.title': 'Tu presupuesto',
    'why.budget.body': 'Armamos el viaje seg\u00fan lo que te sientas c\u00f3modo gastando y te mostramos en qu\u00e9 se va cada peso.',
    'why.backup.title': 'Tu plan B',
    'why.backup.body': 'Cada d\u00eda incluye un plan alternativo, para que el clima nunca arruine tu viaje.',
    'footer.tagline': 'Viajes planeados seg\u00fan c\u00f3mo realmente te gusta viajar.',
    'footer.explore': 'Explorar', 'footer.company': 'Empresa', 'footer.legal': 'Legal',
    'btn.planTrip': 'Planear mi viaje', 'btn.seeSample': 'Ver un viaje de ejemplo'
  },
  zh: {
    'nav.home': '首页', 'nav.plan': '规划我的行程', 'nav.destinations': '目的地',
    'nav.sample': '行程范例', 'nav.about': '关于我们', 'nav.contact': '联系我们',
    'hero.eyebrow': '为你量身定制的旅行社',
    'hero.title': '你的旅程，你的节奏，你的方式。',
    'hero.lede': '告诉我们你想怎么旅行，我们会围绕你来规划行程。',
    'hero.cta': '规划我的行程',
    'hero.note': '无需注册 · 大约需要2分钟',
    'why.eyebrow': '为什么选择我们',
    'why.title': '我们规划的是你的旅行方式，而不仅是目的地',
    'why.pace.title': '你的节奏',
    'why.pace.body': '选择轻松、均衡或探险模式，行程节奏完全为你调整。',
    'why.budget.title': '你的预算',
    'why.budget.body': '我们根据你的预算安排行程，并清楚展示每一笔花费。',
    'why.backup.title': '你的备用方案',
    'why.backup.body': '每天都配有备用计划，天气或场馆关闭都不会打乱你的旅程。',
    'footer.tagline': '根据你真正喜欢的旅行方式来规划。',
    'footer.explore': '探索', 'footer.company': '公司', 'footer.legal': '法律',
    'btn.planTrip': '规划我的行程', 'btn.seeSample': '查看行程范例'
  }
};

function getLang() {
  return localStorage.getItem('tywLang') || 'en';
}

function applyLanguage(lang) {
  if (!I18N[lang]) lang = 'en';
  localStorage.setItem('tywLang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang][key]) el.setAttribute('placeholder', I18N[lang][key]);
  });

  const currentLabel = document.getElementById('langCurrentLabel');
  if (currentLabel) currentLabel.textContent = LANGUAGES[lang].flag + ' ' + lang.toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => applyLanguage(getLang()));