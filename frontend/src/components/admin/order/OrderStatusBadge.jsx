export default function OrderStatusBadge({ status }) {
  const map = {
    pending: { label: "Chờ", bg: "#eee", color: "#333" },
    confirmed: { label: "Đã nhận", bg: "#dbeafe", color: "#1e40af" },
    preparing: { label: "Đang làm", bg: "#fef9c3", color: "#854d0e" },
    ready: { label: "Sẵn sàng", bg: "#ede9fe", color: "#5b21b6" },
    completed: { label: "Hoàn tất", bg: "#dcfce7", color: "#166534" },
    cancelled: { label: "Đã hủy", bg: "#fee2e2", color: "#991b1b" },
  };

  const current = map[status] || map.pending;

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        background: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}