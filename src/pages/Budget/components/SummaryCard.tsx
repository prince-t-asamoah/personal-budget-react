export default function SummaryCard({ label, amount}: {
    label: string,
    amount: string
}) {
  return (
    <div className="summary-card">
      <div className="summary-label">{label}</div>
      <div className="summary-amount">{amount}</div>
    </div>
  );
}
