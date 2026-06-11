export default function TableFilter({ status, setStatus }) {
  const options = ["all", "available", "occupied"];

  return (
    <div className="table-filter">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setStatus(opt)}
          className={status === opt ? "active" : ""}
        >
          {opt === "all"
            ? "Tất cả"
            : opt === "available"
            ? "Trống"
            : "Có khách"}
        </button>
      ))}
    </div>
  );
}