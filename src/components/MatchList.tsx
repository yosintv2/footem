import { useState, useEffect, useRef, useMemo } from 'react';
import { config } from '../config';

interface Match {
  team1: string;
  team1_logo: string;
  team2: string;
  team2_logo: string;
  league_logo: string | null;
  league: string;
  competition?: string;
  league_name?: string;
  start: string;
  match_time?: string;
  duration?: number;
  repeat?: string;
  details_url: string;
  event_id?: number;
}

interface ProcessedMatch extends Match {
  sortPriority: number;
  sortValue: number;
  displayLeague: string;
}

interface Props {
  apiUrl: string;
  title: string;
  isCricket?: boolean;
}

function formatLocalTime(iso: string) {
  if (!iso) return 'Time TBD';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Time TBD';
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch { return 'Time TBD'; }
}

const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%2248%22 height%3D%2248%22 viewBox%3D%220 0 48 48%22%3E%3Crect width%3D%2248%22 height%3D%2248%22 fill%3D%22%23ccc%22%2F%3E%3Ctext x%3D%2224%22 y%3D%2230%22 text-anchor%3D%22middle%22 font-size%3D%2218%22 fill%3D%22%23333%22%3EL%3C%2Ftext%3E%3C%2Fsvg%3E';

export default function MatchList({ apiUrl, title, isCricket }: Props) {
  const [allMatches, setAllMatches] = useState<ProcessedMatch[]>([]);
  const [activeLeague, setActiveLeague] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const leagues = useMemo(() => [...new Set(allMatches.map(m => m.league))], [allMatches]);
  const filtered = useMemo(() => activeLeague === 'All' ? allMatches : allMatches.filter(m => m.league === activeLeague), [allMatches, activeLeague]);

  const needsTick = useMemo(() => {
    if (allMatches.length === 0) return false;
    const nowMs = Date.now();
    return allMatches.some(m => {
      const start = new Date(m.start).getTime();
      const dur = (m.duration || 2) * 3600000;
      const end = start + dur;
      if (isNaN(start)) return false;
      return nowMs < end;
    });
  }, [allMatches]);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        const raw: Match[] = data.matches || data;
        if (!raw || raw.length === 0) { setAllMatches([]); setLoading(false); return; }
        const nowMs = Date.now();
        const processed: ProcessedMatch[] = [];
        raw.forEach(m => {
          const isTest = isCricket && m.repeat === '5';
          const repeatDays = isTest ? 5 : 1;
          const baseStart = new Date(m.start || m.match_time || '').getTime();
          const durationHrs = m.duration || (isTest ? 8 : 2);
          if (isNaN(baseStart)) return;
          for (let i = 0; i < repeatDays; i++) {
            const dStart = baseStart + i * 86400000;
            const dEnd = dStart + durationHrs * 3600000;
            if (isTest && nowMs > dEnd) continue;
            const obj: ProcessedMatch = { ...m, start: new Date(dStart).toISOString(), displayLeague: isTest ? `${m.competition || m.league || ''} (Day ${i + 1})` : (m.competition || m.league || '') };
            if (nowMs >= dStart && nowMs < dEnd) obj.sortPriority = 1;
            else if (nowMs < dStart) obj.sortPriority = 2;
            else obj.sortPriority = 3;
            obj.sortValue = dStart;
            processed.push(obj);
            if (isTest) break;
          }
        });
        processed.sort((a, b) => {
          if (a.sortPriority !== b.sortPriority) return a.sortPriority - b.sortPriority;
          return a.sortValue - b.sortValue;
        });
        setAllMatches(processed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl, isCricket]);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const ms = needsTick ? 1000 : 30000;
    intervalRef.current = setInterval(tick, ms);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [needsTick]);

  function getStatus(startIso: string, durationHrs?: number): { text: string; cls: string } {
    const start = new Date(startIso).getTime();
    const dur = (durationHrs || 2) * 3600000;
    const end = start + dur;
    if (isNaN(start)) return { text: 'Time TBD', cls: '' };
    if (now >= end) return { text: 'END', cls: 'ml-status-over' };
    if (now >= start) return { text: 'LIVE', cls: 'ml-status-live' };
    const diff = start - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { text: `${h}h ${m}m ${s}s`, cls: 'ml-status-countdown' };
  }

  return (
    <div className="ml-wrap">
      <style>{`
        .ml-wrap {
          padding: 0 0 3rem;
          min-width: 0;
          overflow-x: hidden;
        }
        .ml-loading, .ml-empty { text-align: center; padding: 40px 0; color: #888; font-size: 15px; }

        .ml-league-filters {
          display: flex;
          flex-wrap: nowrap;
          gap: 6px;
          justify-content: flex-start;
          padding: 6px 2px 12px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .ml-league-filters::-webkit-scrollbar { display: none; }
        .ml-filter-btn {
          flex-shrink: 0;
          padding: 5px 14px;
          border: 2px solid #2a2a2a;
          border-radius: 20px;
          background: #1a1a1a;
          color: #888;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .ml-filter-btn.active { background: #ff0037; border-color: #ff0037; color: #fff; }

        .match-card {
          display: block;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 10px 12px;
          margin: 8px auto;
          max-width: 960px;
          width: 100%;
          text-decoration: none;
        }
        .match-card-content { display: flex; flex-direction: column; gap: 4px; }
        .match-row-teams { display: flex; align-items: center; gap: 6px; }
        .match-team { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; }
        .match-team.home { justify-content: flex-start; }
        .match-team.away { justify-content: flex-end; }
        .match-team img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; }
        .match-team-name { font-size: 13px; font-weight: 600; color: #e0e0e0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .match-center { display: flex; flex-direction: column; align-items: center; gap: 2px; flex-shrink: 0; min-width: 70px; }
        .match-time { font-size: 11px; font-weight: 600; color: #888; }
        .ml-status { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; display: inline-block; min-width: 48px; text-align: center; line-height: 1.3; }
        .ml-status-countdown { background: #2a2a2a; color: #ff0037; }
        .ml-status-live { background: #ff0037; color: #fff; animation: pulse 1.2s infinite; }
        .ml-status-over { background: #2a2a2a; color: #888; }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.7 } }
        .match-league-bar { margin-top: 4px; padding-top: 4px; border-top: 1px solid #2a2a2a; }
        .match-league-bar p { font-size: 10px; color: #888; font-weight: 500; text-align: center; }

        @media (min-width: 640px) {
          .ml-wrap { padding: 0 1rem 3rem; }
          .ml-header { margin-bottom: 20px; }
          .ml-header h1 { font-size: 24px; }
          .match-card { padding: 14px 18px; border-radius: 10px; }
          .match-team { gap: 10px; }
          .match-team img { width: 36px; height: 36px; }
          .match-team-name { font-size: 15px; }
          .match-center { min-width: 90px; }
          .match-time { font-size: 12px; }
          .ml-status { font-size: 11px; padding: 3px 10px; min-width: 54px; }
          .match-league-bar p { font-size: 11px; }
        }
      `}</style>

      {leagues.length > 1 && (
        <div className="ml-league-filters">
          <button className={`ml-filter-btn${activeLeague === 'All' ? ' active' : ''}`} onClick={() => setActiveLeague('All')}>All</button>
          {leagues.map(lg => (
            <button key={lg} className={`ml-filter-btn${activeLeague === lg ? ' active' : ''}`} onClick={() => setActiveLeague(lg)}>{lg}</button>
          ))}
        </div>
      )}

      {loading && <div className="ml-loading">Loading matches...</div>}
      {!loading && filtered.length === 0 && <div className="ml-empty">No upcoming matches found.</div>}

      {!loading && [...new Set(filtered.map(m => m.league))].map(lg => (
        <div key={lg}>
          {filtered.filter(m => m.league === lg).flatMap((m, i) => {
            const status = getStatus(m.start, m.duration);
            const card = (
              <a key={`card-${i}`}               href={m.details_url || '#'} className="match-card">
                <div className="match-card-content">
                  <div className="match-row-teams">
                    <div className="match-team home">
                      <img src={m.team1_logo || placeholderImg} alt={m.team1} loading="lazy" />
                      <span className="match-team-name">{m.team1}</span>
                    </div>
                    <div className="match-center">
                      <span className="match-time">{formatLocalTime(m.start)}</span>
                      <span className={`ml-status ${status.cls}`}>{status.text}</span>
                    </div>
                    <div className="match-team away">
                      <span className="match-team-name">{m.team2}</span>
                      <img src={m.team2_logo || placeholderImg} alt={m.team2} loading="lazy" />
                    </div>
                  </div>
                  <div className="match-league-bar">
                    <p>{m.displayLeague || m.league || m.competition || m.league_name || ''}</p>
                  </div>
                </div>
              </a>
            );
            return [card];
          })}
        </div>
      ))}
    </div>
  );
}
