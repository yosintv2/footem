// ============================================================
// YoSinTV - Central Configuration File
// ============================================================
// Edit this file to change site content without touching components.
// Each section has comments to help other admins understand what to change.
// ============================================================

const SITE_URL = 'https://www.yosintv.me';


export const config = {
  // Site base path (leave empty for root, e.g. '/blog' if hosted in subfolder)
  base: '',

  // ============================================================
  // SITE INFO — changes site name, tagline, SEO meta, favicon
  // ============================================================
  site: {
    name: 'YoSinTV',
    tagline: 'FIFA World Cup 2026 | Playing XI | Football News',
    url: SITE_URL,
    description: 'YoSinTV is sports website that covers all the Cricket Matches, World Cup, International/Domestic Matches, Football Matches, etc.',
    logoUrl: `${SITE_URL}/logo.png`,
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    robots: 'follow, index',
    favicon: 'https://cdn.bio.link/uploads/profile_pictures/2024-06-12/cITldnIcB9Nq7SSUDcZegs3lRiCxS1vJ.png',
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
  },

  // ============================================================
  // APK BUTTON — the download APK button text and URL
  // ============================================================
  apkButton: {
    text: 'Download YoSinTV APK',
    url: `${SITE_URL}/apk`,
  },

  // ============================================================
  // SOCIAL LINKS — all social media URLs
  // Change these to point to your accounts
  // ============================================================
  links: {
    social: {
      whatsapp: 'https://www.whatsapp.com/channel/0029Vb7ikzn9hXF5ec0uUI0H',
      twitter: 'https://twitter.com/yosintv',
      facebook: 'https://facebook.com/yosintv.official',
      instagram: 'https://instagram.com/yosintv.official',
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
  // WHATSAPP POPUP — the "Join YoSinTV Whatsapp" popup on homepage
  // Change text, timing, or disable it entirely
  // ============================================================
  whatsappPopup: {
    enabled: true,                     // set false to hide the popup completely
    duration: 3000,                    // auto-hide after this many milliseconds
    heading: 'Join YoSinTV Whatsapp',  // bold title at top
    subtitle: 'Join Our Community',    // smaller text below heading
    description: 'Get latest updates, breaking news and exclusive content directly on WhatsApp.',
    ctaText: '👥 Join YoSinTV Whatsapp', // button text
  },

  // ============================================================
  // SOCIAL DISPLAY TEXT — labels and handle names shown on the site
  // Change how each social platform appears (used in contact page, aria-labels, etc.)
  // ============================================================
  socialDisplay: {
    whatsapp: {
      label: 'WhatsApp',
      handle: 'YoSinTV Channel',
    },
    twitter: {
      label: 'Twitter',
      handle: '@yosintv',
    },
    facebook: {
      label: 'Facebook',
      handle: 'YoSinTV Official',
    },
    instagram: {
      label: 'Instagram',
      handle: '@yosintv.official',
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
    email: 'mail.yosintv@gmail.com',
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
      { key: '/', label: 'Home' },
      {
        key: '/',
        label: 'Cricket',
        children: [
          { key: '/', label: 'All Cricket' },
          { key: '/', label: 'T20 World Cup 2026' },
        ],
      },
      {
        key: '/',
        label: 'Football',
        children: [
          { key: '/', label: 'All Football' },
          { key: '/', label: 'FIFA World Cup 2026' },
        ],
      },
      { key: '/', label: 'Articles' },
      { key: '/tools', label: 'Tools' },
    ],
  },

  // ============================================================
  // FOOTER — full footer configuration
  // socialAria: aria-labels for social icon links
  // sections.*.links: link columns in the footer
  // ============================================================
  footer: {
    description: 'YoSinTV is a sports website that covers all Cricket Matches, World Cup, International/Domestic Matches, Football Matches, and more. Stay updated with live scores, match previews, playing XI, and expert analysis.',
    badge: '',
    brandHtml: 'YoSin<span>TV</span>',
    copyright: 'All rights reserved. YoSinTV does not host any media content on its servers. All streams are embedded from third-party sources.',
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
          { href: '/category/cricket', label: 'All Cricket' },
          { href: '/category/t20-world-cup-2026', label: 'T20 World Cup 2026' },
          { href: '/category/ipl', label: 'IPL' },
          { href: '/category/playing-xi', label: 'Playing XI' },
        ],
      },
      football: {
        heading: 'Football',
        links: [
          { href: '/category/football', label: 'All Football' },
          { href: '/category/premier-league', label: 'Premier League' },
          { href: '/category/champions-league', label: 'Champions League' },
          { href: '/category/laliga', label: 'La Liga' },
          { href: '/category/fifa-world-cup-2026', label: 'FIFA World Cup 2026' },
        ],
      },
      quickLinks: {
        heading: 'Quick Links',
        links: [
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: `${SITE_URL}/apk`, label: 'Download APK' },
          { href: '/contact', label: 'Contact Us' },
          { href: '/dmca', label: 'DMCA' },
          { href: '/privacy-policy', label: 'Privacy Policy' },
          { href: '/about', label: 'About Us' },
          { href: '/tools', label: 'Tools' },
        ],
      },
    },
  },
};
