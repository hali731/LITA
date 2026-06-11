// frontend/src/pages/admin/tables.jsx
import { useState, useMemo, useEffect } from "react";
import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from "../../services/tables.service.js";

import TableGrid from "../../components/admin/Table/TableGrid";
import TableEditorPanel from "../../components/admin/Table/TableEditorPanel";
import TableFilter from "../../components/admin/Table/TableFilter";
import "../../assets/style/admin/table.css";

export default function Tables() {
  // ================= STATE =================
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await getTables();
      setTables(res.data.data);
    } catch (err) {
      console.error("Fetch tables error:", err);
    }
  };

  // ================= FILTER =================
  const filteredTables = useMemo(() => {
    return tables.filter((t) => {
      if (statusFilter === "all") return true;
      return t.status === statusFilter;
    });
  }, [tables, statusFilter]);

  // ================= EDIT =================
  const handleEdit = (table) => {
    setSelectedTable(table);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Xóa bàn này?");
    if (!confirmDelete) return;

    try {
      await deleteTable(id);
      fetchTables();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (data) => {
    try {
      if (selectedTable) {
        await updateTable(selectedTable._id, data);
      } else {
        await createTable(data);
      }

      fetchTables();
      setSelectedTable(null);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // ================= UI =================
  return (
    <div className="table-page">
      <h2>Quản lý bàn</h2>

      <TableFilter status={statusFilter} setStatus={setStatusFilter} />

      <div className="table-content">
        {/* LEFT */}
        <div className="table-left">
          <TableGrid
            tables={filteredTables}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* RIGHT */}
        <div className="table-right">
          <TableEditorPanel
            selected={selectedTable}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}