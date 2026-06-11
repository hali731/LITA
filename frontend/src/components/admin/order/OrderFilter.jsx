export default function OrderFilter({ status, setStatus }) {
  const options = [
    "all",
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  return (
    <div className="order-filter">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setStatus(opt)}
          className={status === opt ? "active" : ""}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}