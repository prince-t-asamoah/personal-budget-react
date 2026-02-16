export default function SummaryCard({ label, amount}: {
    label: string,
    amount: string
}) {
  return (
    <div className="overview-card">
      <div className="overview-label">{label}</div>
      <div className="overview-amount">{amount}</div>
    </div>
  );
}
