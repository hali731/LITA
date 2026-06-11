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
              font-family: 'Courier New', Courier, monospace;
              background-color: #f0f0f0;
              padding: 20px;
            }
            .invoice-container {
              background-color: #fff;
              width: 100%;
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              font-size: 15px;
              color: #000;
            }
            .invoice-header {
              text-align: center;
              border-bottom: 2px dashed #000;
              padding-bottom: 15px;
              margin-bottom: 15px;
            }
            .invoice-header h2 {
              font-size: 24px;
              margin-bottom: 5px;
            }
            .invoice-header p {
              font-size: 13px;
              color: #444;
            }
            .invoice-info {
              margin-bottom: 15px;
              font-size: 14px;
              line-height: 1.5;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
            .invoice-table th {
              text-align: left;
              border-bottom: 2px dashed #000;
              padding: 8px 0;
              font-size: 14px;
            }
            .invoice-table td {
              padding: 8px 0;
              font-size: 14px;
              vertical-align: top;
            }
            .invoice-table .right { text-align: right; }
            .invoice-table .center { text-align: center; }
            
            .invoice-total {
              border-top: 2px dashed #000;
              padding-top: 12px;
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 18px;
            }
            .invoice-footer {
              text-align: center;
              margin-top: 20px;
              border-top: 2px dashed #000;
              padding-top: 15px;
              font-size: 13px;
              color: #444;
            }
            .invoice-status {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 4px;
              font-size: 13px;
              font-weight: bold;
              border: 1px solid #000;
            }
            @media print {
              body { 
                background-color: transparent; 
                padding: 0;
              }
              .invoice-container { 
                box-shadow: none; 
                max-width: 100%; 
                margin: 0; 
                padding: 10px;
                font-size: 16px; /* Chữ to hơn khi in giấy A4 */
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${content.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              }, 500);
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
