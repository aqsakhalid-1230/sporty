import { useQuery } from "@tanstack/react-query";
import { fetchSeasonsWithBadge } from "../lib/api";

export function useSeasonBadge(leagueId: string | null) {
  return useQuery({
    queryKey: ["season-badge", leagueId],
    enabled: !!leagueId,
    queryFn: ({ signal }: { signal?: AbortSignal }) =>
      fetchSeasonsWithBadge(leagueId!, signal),
    staleTime: Infinity, // cache forever once fetched
  });
}
