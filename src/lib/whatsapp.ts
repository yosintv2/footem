import { config } from '../config';

const CACHE_KEY = 'yosintv_whatsapp_url';
const CACHE_DURATION = 1000 * 60 * 60;

interface CacheEntry {
  url: string;
  timestamp: number;
}

function getCached(): string | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) return null;
    return entry.url;
  } catch {
    return null;
  }
}

function setCache(url: string) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ url, timestamp: Date.now() }));
  } catch {}
}

export async function getWhatsAppUrl(): Promise<string> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const res = await fetch(config.remoteConfig.url);
    const data = await res.json();
    const url = data?.whatsappUrl || config.links.social.whatsapp;
    setCache(url);
    return url;
  } catch {
    return config.links.social.whatsapp;
  }
}
