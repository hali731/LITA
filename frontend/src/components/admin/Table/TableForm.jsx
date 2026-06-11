import { useState, useEffect } from "react";

export default function TableForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    status: "available",
  });

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || "",
        status: selected.status || "available",
      });
    } else {
      setForm({
        name: "",
        status: "available",
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="table-form">
      <h3>{selected ? "Cập nhật bàn" : "Thêm bàn"}</h3>

      <input
        name="name"
        placeholder="Tên bàn"
        value={form.name}
        onChange={handleChange}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="available">Trống</option>
        <option value="occupied">Có khách</option>
      </select>

      <button onClick={() => onSubmit(form)}>
        {selected ? "Update" : "Done"}
      </button>
    </div>
  );
}