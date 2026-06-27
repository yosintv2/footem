export const config = {
  site: {
    name: 'YoSinTV',
    tagline: 'FIFA World Cup 2026 | Playing XI | Football News',
    url: 'https://www.yosin-tv.net',
    description: 'YoSinTV is sports website that covers all the Cricket Matches, World Cup, International/Domestic Matches, Football Matches, etc.',
    logoUrl: 'https://www.yosintv.net/logo.png',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    robots: 'follow, index',
    favicon: 'https://cdn.bio.link/uploads/profile_pictures/2024-06-12/cITldnIcB9Nq7SSUDcZegs3lRiCxS1vJ.png',
    locale: 'en-US',
  },
  api: {
    football: 'https://cdn.singhs.com.np/api/match-football.json',
    cricket: 'https://cdn.singhs.com.np/api/match-cricket.json',
    footballHomepage: 'https://cdn.singhs.com.np/api/football-homepage.json',
    cricketHomepage: 'https://cdn.singhs.com.np/api/cricket-homepage.json',
    articles: 'https://cdn.singhs.com.np/api/articles.json',
  },
  features: {
    showLeagueContainer: true,
  },
  ads: {
    google: {
      scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      client: 'ca-pub-5525538810839147',
      slots: {
        responsive: '4345862479',
        betweenMatch: '8381900703',
        sidebar300x250: '4345862479',
        betweenCards300x50: '4345862479',
      },
    },
  },
  links: {
    social: {
      telegram: 'https://t.me/yosintvlive',
      twitter: 'https://twitter.com/yosintv',
      facebook: 'https://facebook.com/yosintv.official',
      instagram: 'https://instagram.com/yosintv.official',
    },
    apk: 'https://www.yosintv.net/apk',
    contact: 'https://www.yosin-tv.net/contact-us',
    dmca: 'https://www.yosin-tv.net/dmca',
    rss: 'https://www.yosin-tv.net/feed/',
  },
  fonts: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    css: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  },
  nav: {
    menuItems: [
      { key: '/', label: 'Home' },
      {
        key: 'cricket',
        label: 'Cricket',
        children: [
          { key: '/cricket', label: 'All Cricket' },
          { key: '/cricket', label: 'T20 World Cup 2026' },
        ],
      },
      {
        key: 'football',
        label: 'Football',
        children: [
          { key: '/football', label: 'All Football' },
          { key: '/football', label: 'FIFA World Cup 2026' },
        ],
      },
      { key: '/', label: 'Articles' },
    ],
  },
  footer: {
    description: 'YoSinTV is a sports website that covers all Cricket Matches, World Cup, International/Domestic Matches, Football Matches, and more. Stay updated with live scores, match previews, playing XI, and expert analysis.',
    badge: '',
    brandHtml: 'YoSin<span>TV</span>',
    copyright: 'All rights reserved. YoSinTV does not host any media content on its servers. All streams are embedded from third-party sources.',
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
          { href: 'https://www.yosintv.net/apk', label: 'Download APK' },
          { href: 'https://t.me/yosintvlive', label: 'Telegram Channel' },
          { href: '/contact', label: 'Contact Us' },
          { href: '/dmca', label: 'DMCA' },
          { href: '/privacy-policy', label: 'Privacy Policy' },
          { href: '/about', label: 'About Us' },
        ],
      },
    },
  },
};
