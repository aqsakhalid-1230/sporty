import type { Season } from "../types";

// Parse season like "2004-2005" -> 2005 or "2013" -> 2013. Unknown -> -Infinity
export function seasonEndYear(season?: string | null) {
  if (!season) return -Infinity;
  const m = /(\d{4})(?:\D+(\d{4}))?/.exec(season);
  if (!m) return -Infinity;
  const start = parseInt(m[1], 10);
  const end = m[2] ? parseInt(m[2], 10) : start;
  return Number.isFinite(end) ? end : -Infinity;
}

export function pickDisplaySeason(seasons: Season[]): Season | null {
  if (!seasons?.length) return null;
  const sorted = [...seasons].sort(
    (a, b) => seasonEndYear(b.strSeason) - seasonEndYear(a.strSeason)
  );
  return sorted.find((s) => s.strBadge) ?? sorted[0];
}
