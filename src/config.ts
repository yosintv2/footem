// ============================================================
// Footem - Central Configuration File
// ============================================================
// Edit this file to change site content without touching components.
// Each section has comments to help other admins understand what to change.
// ============================================================

const SITE_URL = 'https://www.footem.co';


export const config = {
  // Site base path (leave empty for root, e.g. '/blog' if hosted in subfolder)
  base: '',

  // ============================================================
  // SITE INFO — changes site name, tagline, SEO meta, favicon
  // ============================================================
  site: {
    name: 'FOOTEM',
    tagline: 'Football In Every Minute!',
    url: SITE_URL,
    description: 'Footem — footem live match, footem site, footem live. Your destination for live football scores, match previews, playing XI, and expert analysis across FIFA World Cup 2026, Premier League, Champions League, La Liga, and more.',
    keywords: 'footem, footem live, footem site, footem live match, fotem',
    logoUrl: '/footem-logo.png',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    robots: 'follow, index',
    favicon: '/favicon.ico',
    locale: 'en-US',
  },

  // ============================================================
  // API ENDPOINTS — where match data, articles, etc. are fetched from
  // ============================================================
  api: {
    football: 'https://cdn.singhs.com.np/api/match-football.json',
    cricket: 'https://cdn.singhs.com.np/api/match-cricket.json',
    footballHomepage: 'https://cdn.singhs.com.np/api/noads-football.json',
    cricketHomepage: 'https://cdn.singhs.com.np/api/noads-cricket.json',
    articles: 'https://cdn.singhs.com.np/api/articles.json',
  },

  // ============================================================
  // FEATURES — toggle site features on/off
  // ============================================================
  features: {
    showLeagueContainer: true,        // show/hide league grid on homepage
    showWhatsAppPopup: false,          // show/hide WhatsApp popup on homepage
    showVisitorCounter: true,         // show/hide Whos visitor stats counter
  },

  // ============================================================
  // APK BUTTON — the download APK button text and URL
  // ============================================================
  apkButton: {
    text: 'Download Footem APK',
    url: `${SITE_URL}/apk`,
  },

  // ============================================================
  // SOCIAL LINKS — all social media URLs
  // Change these to point to your accounts
  // ============================================================
  links: {
    social: {
      whatsapp: 'https://www.whatsapp.com/channel/0029Vb7ikzn9hXF5ec0uUI0H',
      twitter: '',
      facebook: '',
      instagram: '',
    },
    apk: `${SITE_URL}/apk`,
    contact: '/contact',
    dmca: '/dmca',
    rss: `${SITE_URL}/feed/`,
  },

  // ============================================================
  // REMOTE CONFIG — fetches dynamic config (e.g. WhatsApp URL) from a remote JSON
  // Host a JSON file with { "whatsappUrl": "..." } and change the URL below
  // Set enabled: false to always use local config values
  // ============================================================
  remoteConfig: {
    enabled: true,
    url: 'https://cdn.singhs.com.np/api/articles.json',
  },

  // ============================================================
  // WHATSAPP POPUP — the "Join Footem Whatsapp" popup on homepage
  // Change text, timing, or disable it entirely
  // ============================================================
  whatsappPopup: {
    enabled: true,                     // set false to hide the popup completely
    duration: 3000,                    // auto-hide after this many milliseconds
    heading: 'Join Footem Whatsapp',  // bold title at top
    subtitle: 'Join Our Community',    // smaller text below heading
    description: 'Get latest updates, breaking news and exclusive content directly on WhatsApp.',
    ctaText: '👥 Join Footem Whatsapp', // button text
  },

  // ============================================================
  // SOCIAL DISPLAY TEXT — labels and handle names shown on the site
  // Change how each social platform appears (used in contact page, aria-labels, etc.)
  // ============================================================
  socialDisplay: {
    whatsapp: {
      label: 'WhatsApp',
      handle: 'Footem Channel',
    },
    twitter: {
      label: 'Twitter',
      handle: '@footem',
    },
    facebook: {
      label: 'Facebook',
      handle: 'Footem Official',
    },
    instagram: {
      label: 'Instagram',
      handle: '@footem',
    },
  },

  // ============================================================
  // HEADER — top navigation bar settings
  // ============================================================
  header: {
    buttons: {
      whatsappAriaLabel: 'WhatsApp',         // hidden text for screen readers (desktop icon button)
      whatsappDrawer: 'Join WhatsApp',       // text in mobile drawer menu
      apkDesktop: 'APK',                     // text on desktop APK button
      apkDrawer: 'Download APK',             // text in mobile drawer APK button
    },
  },

  // ============================================================
  // SIDEBAR — text and settings for the sidebar widget
  // ============================================================
  sidebar: {
    buttons: {
      apk: 'Download APK',
      whatsapp: 'Join WhatsApp',
    },
    widgetTitle: 'Recent Posts',       // heading for the recent articles widget
    articleLimit: 6,                   // max articles to show in sidebar
  },

  // ============================================================
  // CONTACT PAGE — all text for the /contact page
  // ============================================================
  contact: {
    pageTitle: 'Contact Us - ',
    heading: 'Contact Us',
    description: 'Have questions, feedback, or suggestions? We\'d love to hear from you. Reach out to us through any of the channels below.',
    email: '',
    labels: {
      email: 'Email:',
      whatsapp: 'WhatsApp:',
      twitter: 'Twitter:',
      facebook: 'Facebook:',
      instagram: 'Instagram:',
    },
  },

  // ============================================================
  // FONTS — Google Fonts configuration
  // ============================================================
  fonts: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    css: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  },

  // ============================================================
  // NAVIGATION MENU — main nav bar items (desktop + mobile drawer)
  // Each item can have optional 'children' for dropdown submenus
  // Set key to '/' for internal links, or full URL for external
  // ============================================================
  nav: {
    menuItems: [
      { key: '/ucl', label: 'UCL' },
      { key: '/premier-league', label: 'Premier League' },
      { key: '/laliga', label: 'LaLiga' },
      { key: '/ligue-1', label: 'Ligue 1' },
      { key: '/serie-a', label: 'Serie A' },
      { key: '/bundesliga', label: 'Bundesliga' },
    ],
  },

  // ============================================================
  // FOOTER — full footer configuration
  // socialAria: aria-labels for social icon links
  // sections.*.links: link columns in the footer
  // ============================================================
  // ============================================================
  // LEAGUE PAGES — each page is auto-generated with matches + iframe player
  // To add a new league: add an entry here, create its .astro page,
  // and add it to nav.menuItems above.
  // ============================================================
  leagues: [
    { slug: 'ucl', label: 'UCL', title: 'UEFA Champions League', api: 'football' },
    { slug: 'premier-league', label: 'Premier League', title: 'Premier League', api: 'football' },
    { slug: 'laliga', label: 'LaLiga', title: 'LaLiga', api: 'football' },
    { slug: 'ligue-1', label: 'Ligue 1', title: 'Ligue 1', api: 'football' },
    { slug: 'serie-a', label: 'Serie A', title: 'Serie A', api: 'football' },
    { slug: 'bundesliga', label: 'Bundesliga', title: 'Bundesliga', api: 'football' },
  ],

  // ============================================================
  // PLAYER — the video iframe player used on homepage and league pages
  // Triggered by adding ?src=<url> to any page URL
  // brand: title shown in player header bar
  // notice: subtitle shown below brand
  // dmcaHeading / dmcaText: legal notice at bottom
  // ============================================================
  player: {
    brand: 'YoSinTV',
    notice: 'Stream loading below — thanks for watching!',
    monetagScript: 'https://suii.pages.dev/monetag.js',
    dmcaHeading: 'DMCA Notice',
    dmcaText: 'Footem does not host any media content on its own servers. All streams are embedded from third-party sources. We do not control or endorse the content displayed.',
    retryText: 'Retry',
    shareText: 'Share',
    whatsappText: 'WhatsApp',
    noStreamMessage: 'No Stream Source Provided',
  },

  footer: {
    description: 'Footem is a football website covering FIFA World Cup 2026, Premier League, Champions League, La Liga, and more. Stay updated with live scores, match previews, playing XI, and expert analysis.',
    badge: '',
    brandHtml: '<span>Footem</span>',
    copyright: 'All rights reserved. Footem does not host any media content on its servers. All streams are embedded from third-party sources.',
    socialAria: {
      whatsapp: 'WhatsApp',
      twitter: 'Twitter',
      facebook: 'Facebook',
      instagram: 'Instagram',
      apk: 'Download APK',
    },
    sections: {
      cricket: {
        heading: 'Cricket',
        links: [
          { href: '/cricket', label: 'Live Cricket' },
          { href: '/cricket', label: 'Upcoming Matches' },
        ],
      },
      football: {
        heading: 'Football',
        links: [
          { href: '/ucl', label: 'UEFA Champions League' },
          { href: '/premier-league', label: 'Premier League' },
          { href: '/laliga', label: 'LaLiga' },
          { href: '/ligue-1', label: 'Ligue 1' },
          { href: '/serie-a', label: 'Serie A' },
          { href: '/bundesliga', label: 'Bundesliga' },
        ],
      },
      quickLinks: {
        heading: 'Quick Links',
        links: [
          { href: '/', label: 'Home' },
          { href: '/news', label: 'News' },
          { href: `${SITE_URL}/apk`, label: 'Download APK' },
          { href: '/contact', label: 'Contact Us' },
          { href: '/dmca', label: 'DMCA' },
          { href: '/privacy-policy', label: 'Privacy Policy' },
          { href: '/about', label: 'About Us' },
        ],
      },
    },
  },
};
