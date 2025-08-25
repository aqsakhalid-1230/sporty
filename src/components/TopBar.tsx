type TopBarProps = {
  currentSport: string; // "ALL", "Soccer", "Basketball", "Tennis", "American Football"
  onSelectSport: (sport: string) => void;
};

const TABS: Array<{ label: string; value: string }> = [
  { label: "All", value: "ALL" },
  // Sporty calls it "Football" but the API uses "Soccer"
  { label: "Football", value: "Soccer" },
  { label: "Basketball", value: "Basketball" },
  { label: "Tennis", value: "Tennis" },
  { label: "American Football", value: "American Football" }
];

export default function TopBar({ currentSport, onSelectSport }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="brand" href="/" aria-label="Sporty.com Home">
          <span className="brand__logo">Sporty<span className="brand__dot">.com</span></span>
        </a>

        <span className="divider" aria-hidden="true" />

        <nav className="tabs" aria-label="Sport categories">
          {TABS.map((t) => {
            const active = currentSport === t.value || (t.value === "ALL" && currentSport === "ALL");
            return (
              <button
                key={t.label}
                className={`tab ${active ? "is-active" : ""}`}
                onClick={() => onSelectSport(t.value)}
                aria-pressed={active}
                type="button"
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="topbar__spacer" />
      </div>
    </header>
  );
}
