import { useState, useEffect } from 'react';
import { config } from '../config';

interface Match {
  name: string;
  image: string;
  link: string;
}

interface LeagueData {
  title: string;
  matches: Match[];
}

export default function LeagueGrid() {
  const [data, setData] = useState<LeagueData | null>(null);

  useEffect(() => {
    fetch(config.api.footballHomepage)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div className="league-wrap">
      <style>{`
        .league-wrap {
          margin-bottom: 24px;
        }
        .league-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .league-header h2 {
          font-size: 20px;
          font-weight: 800;
          color: #222;
        }
        .league-list {
          display: flex;
          flex-direction: column;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }
        .league-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          transition: all 0.15s;
        }
        .league-item:last-child {
          border-bottom: none;
        }
        .league-item:hover {
          background: #fafafa;
        }
        .league-item img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .league-item span {
          font-size: 14px;
          color: #444;
          font-weight: 500;
        }
        .league-item:hover span {
          color: #ff0037;
        }
        .league-item .arrow {
          margin-left: auto;
          color: #bbb;
          font-size: 14px;
        }
      `}</style>

      <div className="league-header">
        <h2>{data?.title || 'All Football Events'}</h2>
      </div>

      <div className="league-list">
        {data?.matches.map((m, i) => (
          <a key={i} href={m.link} className="league-item">
            <img src={m.image} alt={m.name} loading="lazy" />
            <span>{m.name}</span>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
