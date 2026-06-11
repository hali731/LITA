import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TableCard({ table, onEdit, onDelete }) {
  const handleDownloadQR = async () => {
    const response = await fetch(table.qrCode);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `QR-table-${table.code}.png`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`table-card ${table.status}`}>
      <h3>{table.name}</h3>

      <p className="table-code">Code: {table.code}</p>

      <div className={`table-status ${table.status}`}>
        {table.status === "available" ? "Trống" : "Có khách"}
      </div>

      {table.qrCode && (
        <div className="qr-section">
          <a href={table.qrCode} download={`table-${table.code}.png`}>
            <img src={table.qrCode} alt="QR" className="table-qr" />
          </a>

          <button onClick={handleDownloadQR}>
            Download QR
          </button>
        </div>
      )}

      <div className="table-actions">
        <button onClick={() => onEdit(table)}>
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(table._id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}