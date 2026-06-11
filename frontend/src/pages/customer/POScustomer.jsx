import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/style/staff/POS.css";

import { createOrder } from "../../services/order.service";
import { getMenus } from "../../services/menu.service";
import { UPLOADS_URL } from "../../config/env.js";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const tableId = params.get("table");

  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  // ================= TABLE CHECK =================
  useEffect(() => {
    if (!tableId) {
      navigate("/select-table");
    } else {
      localStorage.setItem("tableId", tableId);
    }
  }, [tableId]);

  // ================= LOAD MENU =================
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await getMenus();

        const formatted = (res.data.data || res.data).map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image ? `${UPLOADS_URL}/${item.image}` : "",
        }));

        setMenus(formatted);
      } catch (err) {
        console.log("Load menu error:", err);
      }
    };

    fetchMenus();
  }, []);

  // ================= FILTER =================
  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" || item.category === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [menus, category, search]);

  // ================= CART =================
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === item._id);

      if (exist) {
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    try {
      if (!cart.length) return alert("Giỏ hàng trống!");

      setLoading(true);

      const payload = {
        table: tableId, // ✅ FIX
        source: "qr",   // ✅ FIX QUAN TRỌNG
        items: cart.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),
        note: note,
      };

      console.log("🔥 QR ORDER PAYLOAD:", payload);

      const res = await createOrder(payload);

      console.log("✅ ORDER SUCCESS:", res.data);

      alert("Đặt hàng thành công!");

      setCart([]);
      setShowCart(false);
      localStorage.removeItem("cart");

    } catch (err) {
      console.log("❌ ORDER ERROR:", err);
      alert(err.response?.data?.message || "Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-page pos-page">

      {/* TABLE INFO */}
      <p className="table-label">
        🪑 Bàn: <b>{tableId}</b>
      </p>

      <MenuSearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />

      <div className="menu-content">
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        <div className="menu-right">
          <CartPanel
            cart={cart}
            setCart={setCart}
            tableId={tableId}
            note={note}          // 👈 thêm
            setNote={setNote}    // 👈 thêm
            onCheckout={handleCheckout}
            loading={loading}
          />
        </div>
      </div>

      {/* FLOAT CART */}
      {cart.length > 0 && (
        <div className="cart-bubble" onClick={() => setShowCart(!showCart)}>
          🛒 <span>{cart.length}</span>
        </div>
      )}

      {/* MINI CART */}
      {showCart && (
        <div className="cart-mini">
          <CartPanel
  cart={cart}
  setCart={setCart}
  tableId={tableId}
  note={note}
  setNote={setNote}
  onCheckout={handleCheckout}
  loading={loading}
/>
        </div>
      )}
    </div>
  );
}