import type { Season } from "../types";
import { pickDisplaySeason } from "../lib/season";

type Props = {
  open: boolean;
  onClose: () => void;
  leagueName: string;
  seasons: Season[] | undefined;
  isLoading: boolean;
  error: unknown;
};

export default function BadgeDialog({
  open, onClose, leagueName, seasons, isLoading, error,
}: Props) {
  if (!open) return null;
  const hasError = Boolean(error);

  let seasonLabel = "";
  let badgeUrl: string | null = null;

  if (seasons && seasons.length > 0) {
    const pick = pickDisplaySeason(seasons);
    seasonLabel = pick?.strSeason ?? "Unknown season";
    badgeUrl = (pick?.strBadge as string) || null;
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3>{leagueName}</h3>
          <button className="btn-close" onClick={onClose}>Close</button>
        </header>

        {isLoading && <p className="helper">Loading seasons…</p>}
        {hasError && <p className="helper">Couldn’t load seasons. Try again later.</p>}

        {!isLoading && !hasError && seasons && seasons.length === 0 && (
          <p className="helper">No seasons returned for this league.</p>
        )}

        {!isLoading && !hasError && seasons && seasons.length > 0 && (
          <>
            <p className="kicker">Season: {seasonLabel}</p>
            {badgeUrl ? (
              <img
                className="badge-img"
                src={badgeUrl}
                alt={`Season badge for ${leagueName} ${seasonLabel}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <p className="helper">No season badge found for the most recent seasons.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
