import type { League } from "../types";

type Props = {
  league: League;
  onClick: (league: League) => void;
  onHover?: (league: League) => void;
};

export default function LeagueCard({ league, onClick, onHover }: Props) {
  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => onClick(league)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(league)}
      onMouseEnter={() => onHover?.(league)}
      aria-label={`Open seasons for ${league.strLeague}`}
    >
      <h3>{league.strLeague}</h3>
      <div className="meta">
        <div>Sport: {league.strSport}</div>
        {league.strLeagueAlternate ? (
          <div>Also known as: {league.strLeagueAlternate}</div>
        ) : (
          <div className="helper">No alternate name</div>
        )}
      </div>
    </article>
  );
}
