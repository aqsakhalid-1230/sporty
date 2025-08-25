import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeagues } from "../lib/api";
import type { League } from "../types";

export function useLeagues() {
  const q = useQuery({
    queryKey: ["leagues"],
    queryFn: ({ signal }: { signal?: AbortSignal }) => fetchAllLeagues(signal),
  });

  const sports = useMemo(() => {
    if (!q.data) return [] as string[];
    const set = new Set<string>();
    for (const l of q.data) if (l.strSport) set.add(l.strSport);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [q.data]);

  return { ...q, sports };
}

export function filterLeagues(
  leagues: League[] | undefined,
  search: string,
  sport: string
) {
  const s = search.trim().toLowerCase();
  return (leagues || []).filter((l) => {
    const bySport = !sport || sport === "ALL" || l.strSport === sport;
    if (!bySport) return false;
    if (!s) return true;
    const hay = `${l.strLeague} ${l.strLeagueAlternate || ""}`.toLowerCase();
    return hay.includes(s);
  });
}
