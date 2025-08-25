import { lazy, Suspense, useDeferredValue, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import LeagueCard from "./components/LeagueCard";
import { useLeagues, filterLeagues } from "./hooks/useLeagues";
import { useSeasonBadge } from "./hooks/useSeasonBadge";
import { fetchSeasonsWithBadge } from "./lib/api";
import type { League } from "./types";

const BadgeDialog = lazy(() => import("./components/BadgeDialog"));

export default function App() {
  const { data, isLoading, isError } = useLeagues();

  const [search, setSearch] = useState("");
  const [sport, setSport] = useState<string>("ALL");
  const deferredSearch = useDeferredValue(search);

  const visible = useMemo(
    () => filterLeagues(data, deferredSearch, sport),
    [data, deferredSearch, sport]
  );

  const [selected, setSelected] = useState<League | null>(null);
  const badgeQuery = useSeasonBadge(selected?.idLeague ?? null);
  const qc = useQueryClient();

  const handleHover = (league: League) => {
    qc.prefetchQuery({
      queryKey: ["season-badge", league.idLeague],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        fetchSeasonsWithBadge(league.idLeague, signal),
      staleTime: Infinity,
    });
  };

  return (
    <>
      <TopBar currentSport={sport} onSelectSport={setSport} />

      <main className="main">
        <div className="container">
          <div className="header">
            <h1>Sports Leagues</h1>
            <p className="kicker">
              Filter by name or sport. Click any league to fetch seasons and display a season badge (when provided).
            </p>
            <div className="toolbar toolbar--single">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>

          {isLoading && <p className="helper">Loading leagues…</p>}
          {isError && <p className="helper">Couldn’t load leagues. Please reload.</p>}

          {!isLoading && !isError && (
            <>
              <p className="count">Showing {visible.length} of {data?.length ?? 0} leagues</p>
              <section className="grid">
                {visible.map((l) => (
                  <LeagueCard key={l.idLeague} league={l} onClick={setSelected} onHover={handleHover} />
                ))}
              </section>
            </>
          )}

          <Suspense fallback={null}>
            <BadgeDialog
              open={!!selected}
              onClose={() => setSelected(null)}
              leagueName={selected?.strLeague ?? ""}
              seasons={badgeQuery.data}
              isLoading={badgeQuery.isLoading}
              error={badgeQuery.error}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
