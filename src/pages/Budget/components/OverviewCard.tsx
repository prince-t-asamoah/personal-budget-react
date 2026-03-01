export default function OverviewCard({
  id,
  label,
  value,
  change,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  change: string;
}>) {
  return (
    <div className="overview-card">
      <div className="overview-label">{label}</div>
      <div className="overview-value" id={id}>
        {value}
      </div>
      <div className="overview-change positive">{change}</div>
    </div>
  );
}
