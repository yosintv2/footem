import { useState, useEffect } from 'react';
import { Button, Drawer, Space } from 'antd';
import { config } from '../config';

const SVGHome = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c-.4 35.2 28.6 64 64 64h48.6V908c0 17.7 14.3 32 32 32H388V732h119.9v208h184.7c17.7 0 32-14.3 32-32V614.9H864c35.4 0 64.4-28.8 64-64-.2-17.3-7.1-33.7-18.5-45.9z"/></svg>';
const SVGCricket = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M874.1 164.6a48 48 0 00-67.9-1.5L531.8 406.1c-3.4 2.7-5.5 6.5-6.3 10.5-2.6 10.8 4.5 21.4 15.4 21.4 2.5 0 5-.5 7.4-1.6L872.6 232.5a48 48 0 001.5-67.9zM512 448c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 80c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 80c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm304-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 80c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"/></svg>';
const SVGSoccer = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm221.7 641.3c-57.8 58.1-134.5 89.7-215.7 87.4-81.2 2.3-157.9-29.3-215.7-87.4-57.8-58.1-89.7-134.5-87.4-215.7-2.3-81.2 29.3-157.9 87.4-215.7 58.1-57.8 134.5-89.7 215.7-87.4 81.2-2.3 157.9 29.3 215.7 87.4 57.8 58.1 89.7 134.5 87.4 215.7 2.3 81.2-29.3 157.9-87.4 215.7zM512 736c-121.6 0-224-102.4-224-224s102.4-224 224-224 224 102.4 224 224-102.4 224-224 224zm0-384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160z"/></svg>';
const SVGArticle = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96zM832 832c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32h576c17.7 0 32 14.3 32 32v640zM320 288h384v64H320v-64zm0 160h384v64H320v-64zm0 160h256v64H320v-64z"/></svg>';
const SVGSend = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-2.2 8.6 3.1 17.2 11.7 19.3 1.3.3 2.6.5 3.9.5 3.2 0 6.4-1 9.1-2.8l836.5-419.4c3.3-1.6 5.6-5 5.6-8.7s-2.3-7.1-5.6-8.7zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403.3 170.8 197.7l618.4 310.2-618.4 318.4z"/></svg>';
const SVGDownload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/></svg>';
const SVGToday = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/></svg>';
const SVGMenu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/></svg>';
const SVGClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>';

const menuItems = [
  { key: '/today-matches', label: 'Today Matches', icon: SVGToday },
  {
    key: 'cricket',
    label: 'Cricket',
    icon: SVGCricket,
    children: [
      { key: '/cricket', label: 'All Cricket' },
      { key: '/cricket', label: 'T20 World Cup 2026' },
    ],
  },
  {
    key: 'football',
    label: 'Football',
    icon: SVGSoccer,
    children: [
      { key: '/football', label: 'All Football' },
      { key: '/football', label: 'FIFA World Cup 2026' },
    ],
  },
  { key: '/', label: 'Articles', icon: SVGArticle },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resolvePath = (path: string) => config.base ? config.base + path : path;

  const handleMenuClick = (info: { key: string }) => {
    window.location.href = resolvePath(info.key);
    setDrawerOpen(false);
  };

  return (
    <>
      <style>{`
        .yosin-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #fff;
          border-bottom: 2px solid #ff0037;
          transition: all 0.3s ease;
        }
        .yosin-header.scrolled {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .yosin-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          height: 64px;
        }
        .yosin-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .yosin-nav {
          display: none;
          flex: 1;
          margin-left: 40px;
        }
        .yosin-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .yosin-mobile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          cursor: pointer;
          color: #333;
          font-size: 18px;
          transition: all 0.2s;
        }
        .yosin-mobile-btn:hover {
          background: rgba(255, 0, 55, 0.08);
          border-color: #ff0037;
          color: #ff0037;
        }
        .yosin-nav-desktop {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 4px;
        }
        .yosin-nav-desktop li {
          position: relative;
        }
        .yosin-nav-desktop a {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          color: #555;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .yosin-nav-desktop a:hover {
          color: #ff0037;
          background: rgba(255, 0, 55, 0.08);
        }
        .yosin-nav-desktop .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 8px;
          min-width: 200px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          z-index: 100;
        }
        .yosin-nav-desktop li:hover .dropdown-content {
          display: block;
        }
        .yosin-nav-desktop .dropdown-content a {
          padding: 10px 14px;
          border-radius: 4px;
        }
        .yosin-nav-desktop .dropdown-content a:hover {
          background: rgba(255, 0, 55, 0.08);
          color: #ff0037;
        }
        .yosin-nav-desktop .has-dropdown > a::after {
          content: '▾';
          margin-left: 4px;
          font-size: 10px;
        }
        .header-btn-apk {
          background: linear-gradient(135deg, #ff0037, #ff6b35) !important;
          border: none !important;
          color: #fff !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          height: 36px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 0 16px !important;
        }
        .header-btn-apk:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .header-btn-telegram {
          background: #0088cc !important;
          border: none !important;
          color: #fff !important;
          border-radius: 8px !important;
          height: 36px !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 0 16px !important;
        }
        .header-btn-telegram:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .drawer-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #444;
          font-size: 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .drawer-menu-item:hover {
          background: rgba(255, 0, 55, 0.06);
          color: #ff0037;
        }
        .drawer-submenu {
          padding-left: 24px;
        }
        .drawer-submenu .drawer-menu-item {
          font-size: 14px;
          padding: 10px 16px;
        }

        @media (min-width: 900px) {
          .yosin-nav {
            display: flex;
          }
          .yosin-mobile-btn {
            display: none;
          }
        }
      `}</style>

      <header className={`yosin-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="yosin-header-inner">
          <div className="yosin-logo" onClick={() => window.location.href = resolvePath('/')}>
            <img src={config.site.logoUrl} alt={config.site.name} style={{ height: 52, width: 'auto' }} />
          </div>

          <nav className="yosin-nav">
            <ul className="yosin-nav-desktop">
              {menuItems.map((item) => (
                <li key={item.key} className={'children' in item ? 'has-dropdown' : ''}>
                  <a href={resolvePath(item.key)}>
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                    {item.label}
                  </a>
                  {'children' in item && (
                    <div className="dropdown-content">
                      {(item.children as Array<{ key: string; label: string }>).map((child) => (
                        <a key={child.key} href={resolvePath(child.key)}>{child.label}</a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="yosin-actions">
            <Button
              className="header-btn-telegram"
              icon={<span dangerouslySetInnerHTML={{ __html: SVGSend }} />}
              href={config.links.social.telegram}
              target="_blank"
              size="small"
            >
              <span style={{ display: 'none' }}>Telegram</span>
            </Button>
            <Button
              className="header-btn-apk"
              icon={<span dangerouslySetInnerHTML={{ __html: SVGDownload }} />}
              href={config.links.apk}
              target="_blank"
              size="small"
            >
              APK
            </Button>
            <button className="yosin-mobile-btn" onClick={() => setDrawerOpen(true)}>
              <span dangerouslySetInnerHTML={{ __html: SVGMenu }} />
            </button>
          </div>
        </div>
      </header>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={config.site.logoUrl} alt={config.site.name} style={{ height: 40, width: 'auto' }} />
          </div>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={300}
        styles={{
          header: { background: '#fff', borderBottom: '1px solid #e0e0e0' },
          body: { background: '#fff', padding: 16 },
        }}
        closeIcon={<span dangerouslySetInnerHTML={{ __html: SVGClose }} style={{ color: '#333', fontSize: 18 }} />}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={4}>
          {menuItems.map((item) => (
            <div key={item.key}>
              <div className="drawer-menu-item" onClick={() => {
                if (!('children' in item)) {
                  window.location.href = resolvePath(item.key);
                  setDrawerOpen(false);
                }
              }}>
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                {item.label}
              </div>
              {'children' in item && (
                <div className="drawer-submenu">
                  {(item.children as Array<{ key: string; label: string }>).map((child) => (
                    <div
                      key={child.key}
                      className="drawer-menu-item"
                      onClick={() => { window.location.href = resolvePath(child.key); setDrawerOpen(false); }}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ height: 16 }} />
          <Button
            className="header-btn-apk"
            icon={<span dangerouslySetInnerHTML={{ __html: SVGDownload }} />}
            href={config.links.apk}
            target="_blank"
            block
          >
            Download APK
          </Button>
          <Button
            className="header-btn-telegram"
            icon={<span dangerouslySetInnerHTML={{ __html: SVGSend }} />}
            href={config.links.social.telegram}
            target="_blank"
            block
          >
            Join Telegram
          </Button>
        </Space>
      </Drawer>
    </>
  );
}
