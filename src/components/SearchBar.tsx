type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="input"
      placeholder="Search leagues (name or alternate)…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search leagues"
    />
  );
}
