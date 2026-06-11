import { useState, useEffect } from "react";
import { UPLOADS_URL } from "../../../config/env.js";

export default function MenuForm({ selected, onSubmit, categories }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stockQuantity: 0,
    image: "",
  });

  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        category: selected.categoryName || selected.category,
        // If image is a full URL, keep it, otherwise format it
        image: selected.image ? (selected.image.startsWith('http') ? selected.image : `${UPLOADS_URL}/${selected.image}`) : ""
      });
    } else {
      setForm({ name: "", price: "", category: "", stockQuantity: 0, image: "" });
    }
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
        <img src={form.image} alt="preview" className="menu-preview" />
      )}

      <input type="file" onChange={handleImageChange} accept="image/*" />

      <input
        name="name"
        placeholder="Tên món"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Giá"
        value={form.price}
        onChange={handleChange}
      />

      <input
        name="category"
        list="category-options"
        placeholder="Danh mục"
        value={form.category}
        onChange={handleChange}
      />
      <datalist id="category-options">
        {categories && categories.map((cat) => (
          <option key={cat._id} value={cat.name} />
        ))}
      </datalist>

      <input
        name="stockQuantity"
        type="number"
        min="0"
        placeholder="Tồn kho"
        value={form.stockQuantity}
        onChange={handleChange}
      />

      <button onClick={() => onSubmit(form)}>
        {selected ? "Cập nhật" : "Xong"}
      </button>
    </div>
  );
}