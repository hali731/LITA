//frontend/src/pages/customer/POScustomer.jsx
import MenuSearchBar from "../../components/admin/menu/MenuSearchBar";
import CategoryFilter from "../../components/admin/menu/CategoryFilter";
import POSGrid from "../../components/staff/POSGrid";
import CartPanel from "../../components/customer/CartPanel";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "../../assets/style/staff/POS.css";

import {
  createQrOrder,
} from "../../services/order.service";

import { getMenus } from "../../services/menu.service";
import { UPLOADS_URL } from "../../config/env.js";

import {
  getPaymentById,
} from "../../services/payment.service";

import { removeVietnameseTones } from "../../utils/stringUtils";

export default function POScustomer() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const tableId = params.get("table");

  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("Tất cả");

  const [showCart, setShowCart] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [note, setNote] = useState("");

  // ================= TABLE CHECK =================
  useEffect(() => {
    if (!tableId) {
      navigate("/select-table");
    } else {
      localStorage.setItem(
        "tableId",
        tableId
      );
    }
  }, [tableId, navigate]);

  // ================= LOAD MENU =================
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await getMenus();

        const formatted = (
  res.data.data || res.data
).map((item) => ({
  _id: item._id,

  name: item.name,

  price: item.price,

  stockQuantity: item.stockQuantity || 0,

  category: item.category,

  image: item.image
    ? `${UPLOADS_URL}/${item.image}`
    : "",
}));

        setMenus(formatted);
      } catch (err) {
        console.log(
          "❌ Load menu error:",
          err
        );
      }
    };

    fetchMenus();
  }, []);

  // ================= CATEGORY LIST =================
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        menus.map((m) =>
          typeof m.category === "object"
            ? m.category?.name
            : m.category
        )
      ),
    ];

    return [
      "Tất cả",
      ...unique.filter(Boolean),
    ];
  }, [menus]);

  // ================= FILTER MENU =================
  const filteredMenus = useMemo(() => {
    return menus.filter((item) => {
      const matchCategory =
        category === "Tất cả" ||
        item.category?.name === category ||
        item.category === category;

      const normalizedSearch = removeVietnameseTones(search);
      const normalizedName = removeVietnameseTones(item.name);

      const matchSearch = normalizedName.includes(normalizedSearch);

      return (
        matchCategory && matchSearch
      );
    });
  }, [menus, category, search]);

  // ================= ADD TO CART =================
  const addToCart = (item) => {
  setCart((prev) => {
    const exist = prev.find(
      (p) => p._id === item._id
    );

      // 🔥 CHECK STOCK
      if (item.stockQuantity <= 0) {
        alert(`Món này đã hết hàng!`);
        return prev;
      }

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

  // ================= CHECKOUT =================
  const handleCheckout = async ({
    paymentMethod,
    provider,
  }) => {
    try {
      if (!cart.length) {
        return alert(
          "Giỏ hàng trống!"
        );
      }

      setLoading(true);

      // ================= CREATE ORDER =================
      const payload = {
        table: tableId,
        source: "qr",

        items: cart.map((i) => ({
          product: i._id,
          quantity: i.quantity,
        })),

        note,
      };

      // 🔥 TẠO ORDER
      const orderRes =
        await createQrOrder(payload);

      const order =
        orderRes.data.data;

      // =========================================
      // CASH → chỉ tạo order, thanh toán tại quầy
      // =========================================
      if (paymentMethod === "cash") {
        alert(
          "Đặt hàng thành công! Vui lòng thanh toán tại quầy. 🎉"
        );

        setCart([]);
        setShowCart(false);
        setNote("");
        return;
      }

      // =========================================
      // BANKING → tạo payment record
      // =========================================
      await createPayment({
        orderId: order._id,
        method: "banking",
        provider: provider || "vnpay",
      });

      alert(
        `Thanh toán ${(provider || "banking").toUpperCase()} thành công! 🎉`
      );

      setCart([]);
      setShowCart(false);
      setNote("");

    } catch (err) {
      console.log(
        "❌ CHECKOUT ERROR:",
        err
      );

      alert(
        err?.response?.data
          ?.message ||
          "Đặt hàng thất bại"
      );
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

      {/* SEARCH */}
      <MenuSearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* CATEGORY */}
      <CategoryFilter
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      <div className="menu-content">

        {/* LEFT */}
        <div className="menu-left">
          <POSGrid
            menus={filteredMenus}
            onAdd={addToCart}
          />
        </div>

        {/* RIGHT */}
        <div className="menu-right">
          <CartPanel
            cart={cart}
            setCart={setCart}
            tableId={tableId}
            note={note}
            setNote={setNote}
            onCheckout={
              handleCheckout
            }
            loading={loading}
          />
        </div>
      </div>

      {/* FLOAT CART */}
      {cart.length > 0 && (
        <div
          className="cart-bubble"
          onClick={() =>
            setShowCart(!showCart)
          }
        >
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
            onCheckout={
              handleCheckout
            }
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}