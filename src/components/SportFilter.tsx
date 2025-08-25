type Props = {
  sports: string[];
  value: string;
  onChange: (sport: string) => void;
};

export default function SportFilter({ sports, value, onChange }: Props) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by sport"
    >
      <option value="ALL">All sports</option>
      {sports.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
