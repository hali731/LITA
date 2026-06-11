//frpntend/src/pages/staff/profile.jsx
import { useState } from "react";
import "../../assets/style/staff/profile.css";

export default function Profile() {
  const [form, setForm] = useState({
    name: "Staff LITA",
    email: "staff@gmail.com",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("UPDATE PROFILE:", form);

    // 👉 sau này call API
    alert("Cập nhật thành công!");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        
        {/* avatar */}
        <div className="avatar-box">
          <div className="avatar-large"></div>
          <p className="role">Nhân viên</p>
        </div>

        {/* form */}
        <div className="profile-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu mới (optional)"
          />

          <button onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}