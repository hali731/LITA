// frontend/src/components/admin/order/InvoicePrint.jsx
import { useRef } from "react";

export default function InvoicePrint({ order }) {
  const printRef = useRef();

  if (!order) return null;

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open("", "_blank", "width=400,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Hóa đơn - LITA</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Courier New', monospace;
              width: 280px;
              margin: 0 auto;
              padding: 10px;
              font-size: 13px;
              color: #000;
            }
            .invoice-header {
              text-align: center;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .invoice-header h2 {
              font-size: 20px;
              margin-bottom: 4px;
            }
            .invoice-header p {
              font-size: 11px;
              color: #555;
            }
            .invoice-info {
              margin-bottom: 10px;
              font-size: 12px;
            }
            .invoice-info p {
              margin: 3px 0;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }
            .invoice-table th {
              text-align: left;
              border-bottom: 1px dashed #000;
              padding: 4px 0;
              font-size: 12px;
            }
            .invoice-table td {
              padding: 4px 0;
              font-size: 12px;
              vertical-align: top;
            }
            .invoice-table .right {
              text-align: right;
            }
            .invoice-table .center {
              text-align: center;
            }
            .invoice-total {
              border-top: 1px dashed #000;
              padding-top: 8px;
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 15px;
            }
            .invoice-footer {
              text-align: center;
              margin-top: 15px;
              border-top: 1px dashed #000;
              padding-top: 10px;
              font-size: 11px;
              color: #555;
            }
            .invoice-footer p {
              margin: 3px 0;
            }
            .invoice-status {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 10px;
              font-size: 11px;
              font-weight: bold;
            }
            .paid { background: #dcfce7; color: #166534; }
            .unpaid { background: #fee2e2; color: #dc2626; }
            @media print {
              body { width: 100%; }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const createdAt = new Date(order.createdAt);
  const dateStr = createdAt.toLocaleDateString("vi-VN");
  const timeStr = createdAt.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* NÚT IN */}
      <button className="print-invoice-btn" onClick={handlePrint}>
        🖨️ In hóa đơn
      </button>

      {/* NỘI DUNG HÓA ĐƠN (ẩn trên màn hình, chỉ hiện khi in) */}
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <div className="invoice-header">
            <h2>🍔 LITA</h2>
            <p>Quán ăn & Đồ uống</p>
            <p>Hotline: 0123 456 789</p>
          </div>

          <div className="invoice-info">
            <p><b>Hóa đơn:</b> #{order._id?.slice(-6).toUpperCase()}</p>
            <p><b>Bàn:</b> {order.table?.name || "N/A"}</p>
            <p><b>Khách:</b> {order.customer?.name || order.guestName || "Khách lẻ"}</p>
            <p><b>Ngày:</b> {dateStr} - {timeStr}</p>
            <p>
              <b>Trạng thái: </b>
              <span className={`invoice-status ${order.paymentStatus === "paid" ? "paid" : "unpaid"}`}>
                {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
              </span>
            </p>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Món</th>
                <th className="center">SL</th>
                <th className="right">Đơn giá</th>
                <th className="right">T.Tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, i) => (
                <tr key={i}>
                  <td>{item.name || item.product?.name || "Món"}</td>
                  <td className="center">{item.quantity}</td>
                  <td className="right">{(item.price || 0).toLocaleString()}đ</td>
                  <td className="right">{((item.price || 0) * item.quantity).toLocaleString()}đ</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-total">
            <span>TỔNG CỘNG:</span>
            <span>{(order.totalAmount || 0).toLocaleString()}đ</span>
          </div>

          {order.note && (
            <p style={{ marginTop: "8px", fontSize: "11px", fontStyle: "italic" }}>
              📝 Ghi chú: {order.note}
            </p>
          )}

          <div className="invoice-footer">
            <p>Cảm ơn quý khách!</p>
            <p>Hẹn gặp lại ❤️</p>
          </div>
        </div>
      </div>
    </>
  );
}
