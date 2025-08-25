import type { AllLeaguesResponse, League, AllSeasonsResponse, Season } from "../types";

const BASE = import.meta.env.VITE_SPORTSDB_BASE ?? "https://www.thesportsdb.com/api/v1/json/3";

async function json<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { ...(init?.headers || {}), Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function fetchAllLeagues(signal?: AbortSignal): Promise<League[]> {
  const data = await json<AllLeaguesResponse>(`${BASE}/all_leagues.php`, { signal });
  return (data.leagues || []).filter(Boolean);
}

export async function fetchSeasonsWithBadge(leagueId: string, signal?: AbortSignal): Promise<Season[]> {
  const url = `${BASE}/search_all_seasons.php?badge=1&id=${encodeURIComponent(leagueId)}`;
  const data = await json<AllSeasonsResponse>(url, { signal });
  return data.seasons || [];
}
