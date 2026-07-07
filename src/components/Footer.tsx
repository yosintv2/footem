import { Typography } from 'antd';
import { config } from '../config';

const { Text } = Typography;

const SVGSend = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-2.2 8.6 3.1 17.2 11.7 19.3 1.3.3 2.6.5 3.9.5 3.2 0 6.4-1 9.1-2.8l836.5-419.4c3.3-1.6 5.6-5 5.6-8.7s-2.3-7.1-5.6-8.7zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403.3 170.8 197.7l618.4 310.2-618.4 318.4z"/></svg>';
const SVGDownload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/></svg>';
const SVGTwitter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-352-178.1a169.2 169.2 0 00-23.2 85.8c0 59.2 30.1 111.4 76 142.1a169.7 169.7 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a169.6 169.6 0 01-77.1 2.9c21.7 67.8 84.8 117.1 159.5 118.6a341.8 341.8 0 01-211.4 72.9c-14.1 0-27.5-.9-40.8-2.5A482.3 482.3 0 00480 879.7c249.2 0 385.5-206.4 385.5-385.5 0-5.8-.1-11.7-.4-17.4 26.4-19.2 49.4-43 67.5-70.1z"/></svg>';
const SVGFacebook = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"/></svg>';
const SVGInstagram = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9-21.4-47.9-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.1-3.1-109.8-2.6-165-2.6s-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.1-2.6 109.8-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.1 3.1 109.8 2.6 165 2.6s109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.1-55.1 2.6-109.8 2.6-165zM832 713.1c-18.8 48-55.8 85-103.9 103.9-38.4 15.1-88.6 20.6-216.1 20.6s-177.7-5.5-216.1-20.6c-48.1-18.9-85-55.9-103.9-103.9-15.1-38.4-20.6-88.6-20.6-216.1s5.5-177.7 20.6-216.1c18.9-48 55.9-85 103.9-103.9 38.4-15.1 88.6-20.6 216.1-20.6s177.7 5.5 216.1 20.6c48.1 18.9 85 55.9 103.9 103.9 15.1 38.4 20.6 88.6 20.6 216.1s-5.5 177.7-20.6 216.1z"/></svg>';

const resolvePath = (path: string) => {
  if (path.startsWith('http') || path.startsWith('//')) return path;
  return config.base ? config.base + path : path;
};

export default function Footer() {
  return (
    <>
      <style>{`
        .yosin-footer {
          background: linear-gradient(180deg, #0d0d0d 0%, #050505 100%);
          border-top: 2px solid #1a1a1a;
          padding-top: 60px;
        }
        .yosin-footer-top {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 40px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .yosin-footer-brand {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
        }
        .yosin-footer-brand span {
          color: #ff0037;
        }
        .yosin-footer-desc {
          color: #888;
          font-size: 14px;
          line-height: 1.7;
          max-width: 360px;
        }
        .yosin-footer h4 {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .yosin-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .yosin-footer-links li {
          margin-bottom: 10px;
        }
        .yosin-footer-links a {
          color: #888;
          font-size: 14px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .yosin-footer-links a:hover {
          color: #ff0037;
          padding-left: 4px;
        }
        .yosin-footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }
        .yosin-footer-social a {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          font-size: 18px;
          transition: all 0.3s;
        }
        .yosin-footer-social a:hover {
          background: rgba(255, 0, 55, 0.2);
          border-color: #ff0037;
          color: #ff0037;
          transform: translateY(-2px);
        }
        .yosin-footer-bottom {
          border-top: 1px solid #1a1a1a;
          padding: 20px 16px;
          text-align: center;
        }
        .yosin-footer-bottom-text {
          color: #666;
          font-size: 13px;
        }
        .yosin-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 0, 55, 0.1);
          border: 1px solid rgba(255, 0, 55, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          color: #ff0037;
          font-size: 12px;
          font-weight: 600;
          margin-top: 12px;
        }

        @media (min-width: 768px) {
          .yosin-footer-top {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }
      `}</style>

      <footer className="yosin-footer">
        <div className="yosin-footer-top">
          <div>
            <div className="yosin-footer-brand" dangerouslySetInnerHTML={{ __html: config.footer.brandHtml }} />
            <p className="yosin-footer-desc">{config.footer.description}</p>
            {config.footer.badge && (
              <div className="yosin-footer-badge">
                <span className="live-dot" />
                {config.footer.badge}
              </div>
            )}
            <div className="yosin-footer-social">
              <a href={config.links.social.whatsapp} aria-label="WhatsApp"><span dangerouslySetInnerHTML={{ __html: SVGSend }} /></a>
              <a href={config.links.social.twitter} aria-label="Twitter"><span dangerouslySetInnerHTML={{ __html: SVGTwitter }} /></a>
              <a href={config.links.social.facebook} aria-label="Facebook"><span dangerouslySetInnerHTML={{ __html: SVGFacebook }} /></a>
              <a href={config.links.social.instagram} aria-label="Instagram"><span dangerouslySetInnerHTML={{ __html: SVGInstagram }} /></a>
              <a href={config.links.apk} aria-label="Download APK"><span dangerouslySetInnerHTML={{ __html: SVGDownload }} /></a>
            </div>
          </div>

          <div>
            <h4>{config.footer.sections.cricket.heading}</h4>
            <ul className="yosin-footer-links">
              {config.footer.sections.cricket.links.map(l => (
                <li key={l.href}><a href={resolvePath(l.href)}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{config.footer.sections.football.heading}</h4>
            <ul className="yosin-footer-links">
              {config.footer.sections.football.links.map(l => (
                <li key={l.href}><a href={resolvePath(l.href)}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{config.footer.sections.quickLinks.heading}</h4>
            <ul className="yosin-footer-links">
              {config.footer.sections.quickLinks.links.map(l => (
                <li key={l.href}><a href={resolvePath(l.href)}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="yosin-footer-bottom">
          <Text className="yosin-footer-bottom-text">
            &copy; {new Date().getFullYear()} <strong>{config.site.name}</strong>. {config.footer.copyright}
          </Text>
        </div>
      </footer>
    </>
  );
}
