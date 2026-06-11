// frontend/src/pages/staff/POS.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/staff/CartPanel";

import { getMenus } from "../../services/menu.service";
import { getTables } from "../../services/tables.service";
import { createStaffOrder } from "../../services/order.service";

import { useState, useMemo, useEffect } from "react";
import "../../assets/style/staff/POS.css";

export default function POS() {
  const [menus, setMenus] = useState([]);
  const [tables, setTables] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [showCart, setShowCart] = useState(false);
  const [note, setNote] = useState("");

  // LOAD DATA
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await getMenus();
        const formatted = (res.data.data || res.data).map((item) => ({
  _id: item._id,

  name: item.name,

  price: item.price,

  stockQuantity: item.stockQuantity || 0,

  category: item.category,

  image: item.image
    ? `http://localhost:5000/uploads/${item.image}`
    : "",
}));
        setMenus(formatted);
      } catch (err) {
        console.error("Lỗi load menu:", err);
      }
    };

    const fetchTables = async () => {
      try {
        const res = await getTables();
        setTables(res.data.data || res.data);
      } catch (err) {
        console.error("Lỗi load bàn:", err);
      }
    };

    fetchMenus();
    fetchTables();
  }, []);

  // CATEGORY LIST
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        menus.map((m) =>
          typeof m.category === "object" ? m.category.name : m.category
        )
      ),
    ];
    return ["Tất cả", ...unique];
  }, [menus]);

  // FILTER MENU
  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" ||
        item.category?.name === category ||
        item.category === category;

      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [menus, category, search]);

  // ADD TO CART
  const addToCart = (item) => {
  setCart((prev) => {
    const exist = prev.find(
      (p) => p._id === item._id
    );

    // 🔥 CHECK STOCK
    if (
      exist &&
      exist.quantity >= item.stockQuantity
    ) {
      alert(
        `Chỉ còn ${item.stockQuantity} phần`
      );

      return prev;
    }

    if (exist) {
      return prev.map((p) =>
        p._id === item._id
          ? {
              ...p,
              quantity: p.quantity + 1,
            }
          : p
      );
    }

    return [
      ...prev,
      {
        ...item,
        quantity: 1,
      },
    ];
  });
};

  // CHECKOUT
  const handleCheckout = async () => {
  try {
    console.log("===== CHECKOUT DEBUG START =====");

    console.log("selectedTable:", selectedTable);
    console.log("customer:", customer);
    console.log("cart raw:", cart);

    if (!selectedTable) {
      console.warn("❌ No table selected");
      return alert("Vui lòng chọn bàn");
    }

    if (!cart.length) {
      console.warn("❌ Cart is empty");
      return alert("Giỏ hàng trống");
    }

  const payload = {
  table: selectedTable,
  items: cart.map((i) => ({
    product: i._id,
    quantity: i.quantity,
  })),
  source: "staff",
  guestName: customer,
  note: note,
};
    console.log("🔥 FINAL PAYLOAD:");
    console.log(JSON.stringify(payload, null, 2));

    setLoading(true);

    const res = await createStaffOrder(payload);

    console.log("✅ RESPONSE SUCCESS:");
    console.log(res.data);

    alert("Tạo đơn thành công");

    setCart([]);
    setSelectedTable("");
    setCustomer("");
    setShowCart(false);

    console.log("===== CHECKOUT SUCCESS END =====");
  } catch (err) {
    console.log("===== CHECKOUT ERROR =====");

    console.log("STATUS:", err?.response?.status);
    console.log("DATA:", err?.response?.data);
    console.log("MESSAGE:", err.message);

    console.log("FULL ERROR:", err);

    alert(err?.response?.data?.message || "Lỗi tạo đơn");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="menu-page pos-page">
      <MenuSearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      <div className="menu-content">
        <div className="menu-left">
          <POSGrid menus={filteredMenus} onAdd={addToCart} />
        </div>

        <div className="menu-right pos-page">
          <CartPanel
            cart={cart}
            setCart={setCart}
            tables={tables}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            customer={customer}
            setCustomer={setCustomer}
            note={note}
            setNote={setNote}
            onCheckout={handleCheckout}
            loading={loading}
          />
        </div>
      </div>

      
      {/* FLOAT CART BUTTON */}
{cart.length > 0 && (
  <div className="cart-bubble" onClick={() => setShowCart(!showCart)}>
    🛒 <span>{cart.length}</span>
  </div>
)}

      {showCart && (
  <div className="cart-mini">
    <CartPanel
      cart={cart}
      setCart={setCart}
      tables={tables}
      selectedTable={selectedTable}
      setSelectedTable={setSelectedTable}
      customer={customer}
      setCustomer={setCustomer}
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