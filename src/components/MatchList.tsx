import { useState, useEffect, useRef } from 'react';
import ShareButtons from './ShareButtons';
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

  const leagues = [...new Set(allMatches.map(m => m.league))];
  const filtered = activeLeague === 'All' ? allMatches : allMatches.filter(m => m.league === activeLeague);

  useEffect(() => {
    if (!loading && allMatches.length > 0) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {}
    }
  }, [loading, allMatches]);

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
    intervalRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

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
    <div class="ml-wrap">
      <style>{`
        .ml-wrap {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 0.75rem 3rem;
        }
        .ml-header { margin-bottom: 16px; }
        .ml-header h1 { font-size: clamp(16px, 5vw, 24px); font-weight: 800; color: #222; margin-bottom: 4px; }
        .ml-header .share-wrap { padding: 0; }
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
          align-items: center;
        }
        .ml-league-filters::-webkit-scrollbar { display: none; }
        .ml-filter-btn {
          flex-shrink: 0;
          padding: 6px 14px;
          border: 2px solid #ddd;
          border-radius: 20px;
          background: #fff;
          color: #666;
          font-size: clamp(11px, 2.8vw, 13px);
          font-weight: 600;
          cursor: pointer;
          touch-action: manipulation;
          white-space: nowrap;
        }
        .ml-filter-btn.active { background: #ff0037; border-color: #ff0037; color: #fff; }
        .ml-filter-share {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border-color: #1877F2;
          color: #1877F2;
          padding: 6px 12px;
        }
        .ml-filter-share svg { width: 14px; height: 14px; flex-shrink: 0; }

        .match-card {
          display: block;
          background: #fff;
          border: 1px solid #e0e0e0;
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
        .match-team-name { font-size: 13px; font-weight: 600; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .match-center { display: flex; flex-direction: column; align-items: center; gap: 2px; flex-shrink: 0; min-width: 70px; }
        .match-time { font-size: 11px; font-weight: 600; color: #888; }
        .ml-status { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; display: inline-block; min-width: 48px; text-align: center; line-height: 1.3; }
        .ml-status-countdown { background: #f0f0f0; color: #ff0037; }
        .ml-status-live { background: #ff0037; color: #fff; animation: pulse 1.2s infinite; }
        .ml-status-over { background: #eee; color: #999; }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.7 } }
        .match-league-bar { margin-top: 4px; padding-top: 4px; border-top: 1px solid #f0f0f0; }
        .match-league-bar p { font-size: 10px; color: #999; font-weight: 500; text-align: center; }

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

      <div class="ml-header">
        <h1>{title}</h1>
        <ShareButtons title={title} />
      </div>

      {leagues.length > 1 && (
        <div class="ml-league-filters">
          <button class="ml-filter-btn ml-filter-share" onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) { navigator.share({ title: title, url: window.location.href }); } else { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'); } }} title="Share this page">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
            Share
          </button>
          <button class={`ml-filter-btn${activeLeague === 'All' ? ' active' : ''}`} onClick={() => setActiveLeague('All')}>All</button>
          {leagues.map(lg => (
            <button key={lg} class={`ml-filter-btn${activeLeague === lg ? ' active' : ''}`} onClick={() => setActiveLeague(lg)}>{lg}</button>
          ))}
        </div>
      )}

      {loading && <div class="ml-loading">Loading matches...</div>}
      {!loading && filtered.length === 0 && <div class="ml-empty">No upcoming matches found.</div>}

      {!loading && [...new Set(filtered.map(m => m.league))].map(lg => (
        <div key={lg}>
          {filtered.filter(m => m.league === lg).flatMap((m, i) => {
            const status = getStatus(m.start, m.duration);
            const card = (
              <a key={`card-${i}`} href={m.event_id ? `/match/${m.event_id}` : (m.details_url || '#')} class="match-card">
                <div class="match-card-content">
                  <div class="match-row-teams">
                    <div class="match-team home">
                      <img src={m.team1_logo || placeholderImg} alt={m.team1} loading="lazy" />
                      <span class="match-team-name">{m.team1}</span>
                    </div>
                    <div class="match-center">
                      <span class="match-time">{formatLocalTime(m.start)}</span>
                      <span class={`ml-status ${status.cls}`}>{status.text}</span>
                    </div>
                    <div class="match-team away">
                      <span class="match-team-name">{m.team2}</span>
                      <img src={m.team2_logo || placeholderImg} alt={m.team2} loading="lazy" />
                    </div>
                  </div>
                  <div class="match-league-bar">
                    <p>{m.displayLeague || m.league || m.competition || m.league_name || ''}</p>
                  </div>
                </div>
              </a>
            );
            const items = [card];
            if ((i + 1) % 3 === 0) {
              items.push(
                <div key={`ad-${i}`} style={{ textAlign: 'center', padding: '8px 0', background: '#fff', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ins className="adsbygoogle"
                       style={{ display: 'block', background: 'transparent' }}
                       data-ad-client={config.ads.google.client}
                       data-ad-slot={config.ads.google.slots.betweenCards300x50}
                       data-ad-format="auto"
                       data-full-width-responsive="true"></ins>
                </div>
              );
            }
            return items;
          })}
        </div>
      ))}
    </div>
  );
}
