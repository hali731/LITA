import { useState, useMemo, useEffect } from "react";
import { getUsers } from "../../services/user.service";
import "../../assets/style/admin/customer.css";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getUsers();
      setCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FILTER =================
  const filtered = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div className="customer-page">
      <h2 className="title">Khách hàng</h2>

      {/* 🔍 Search */}
      <input
        className="search"
        placeholder="Tìm khách hàng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.role}</td>
                <td>{c.isActive ? "Active" : "Blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card */}
      <div className="mobile-list">
        {filtered.map((c) => (
          <div key={c._id} className="card">
            <h4>{c.name}</h4>
            <p>📧 {c.email}</p>
            <p>🎭 {c.role}</p>
            <p>
              {c.isActive ? "🟢 Active" : "🔴 Blocked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}