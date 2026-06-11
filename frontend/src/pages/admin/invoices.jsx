import { useState, useEffect, useMemo } from "react";
import { getInvoices } from "../../services/invoice.service";
import "../../assets/style/admin/invoices.css";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState("all");

  // ================= FETCH =================
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FILTER =================
  const filtered = useMemo(() => {
    if (filter === "all") return invoices;
    return invoices.filter((inv) => inv.paymentStatus === filter);
  }, [invoices, filter]);

  const renderStatus = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thất bại";
      default:
        return status;
    }
  };

  return (
    <div className="invoice-page">
      <h2>Hóa đơn</h2>

      {/* FILTER */}
      <div className="payment-filter">
        {["all", "paid", "pending", "failed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="invoice-content">
        {/* LEFT */}
        <div className="invoice-list">
          {filtered.map((inv) => (
            <div
              key={inv._id}
              className={`invoice-card ${
                selectedInvoice?._id === inv._id ? "active" : ""
              }`}
              onClick={() => setSelectedInvoice(inv)}
            >
              <h4>{inv.table?.name}</h4>
              <p>{inv.totalAmount.toLocaleString()}đ</p>

              <span className={`invoice-status ${inv.paymentStatus}`}>
                {renderStatus(inv.paymentStatus)}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="invoice-detail">
          {!selectedInvoice ? (
            <p>Chọn hóa đơn để xem chi tiết</p>
          ) : (
            <>
              <h3>{selectedInvoice.table?.name}</h3>

              <div className="invoice-items">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={idx} className="invoice-item">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              <h4 className="invoice-total">
                Tổng: {selectedInvoice.totalAmount.toLocaleString()}đ
              </h4>

              <p>
                Thanh toán:{" "}
                <b>{renderStatus(selectedInvoice.paymentStatus)}</b>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}