// MenuForm.jsx
import { useState, useEffect } from "react";

export default function MenuForm({ selected, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm({ name: "", price: "", category: "", quantity: "", image: "" });
  }, [selected]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: URL.createObjectURL(file),
        file,
      });
    }
  };

  return (
    <div className="menu-form">
      <h3>{selected ? "Cập nhật món" : "Thêm món"}</h3>

      {form.image && (
        <img src={form.image} alt="" className="menu-preview" />
      )}

      <input type="file" onChange={handleImageChange} />

      <input
        name="name"
        placeholder="Tên món"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Danh mục"
        value={form.category}
        onChange={handleChange}
      />

      <input
        name="quantity"
        type="number"
        placeholder="Số lượng"
        value={form.quantity}
        onChange={handleChange}
      />

      <button onClick={() => onSubmit(form)}>
        {selected ? "Update" : "Done"}
      </button>
    </div>
  );
}