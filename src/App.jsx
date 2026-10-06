import { useState } from "react";
import "./App.css";
import {
  getRestaurantMenu,
  getRestaurantSettings,
} from "./dataService";
import {
  createOrder,
  isOrderingOpen,
} from "./orderService";
const restaurantSlug =
  window.location.pathname.split("/").filter(Boolean)[0] || "burger-house";

const selectedRestaurant =
  getRestaurantSettings(restaurantSlug);

const selectedMenu =
  getRestaurantMenu(restaurantSlug);
const restaurantTheme = selectedRestaurant?.theme || {
  primary: "#ff5a36",
  dark: "#171717",
  
};
const orderingOpen =
  isOrderingOpen(selectedRestaurant);

function PlatoHome() {
  return (
    <div className="plato-home">
      <div className="plato-glow plato-glow-one"></div>
      <div className="plato-glow plato-glow-two"></div>

      <main className="plato-content">
        <div className="plato-logo"> <img
    src="https://platotech.pages.dev/assets/plato-mark.svg"
    alt=""
  />
  <span>PLATO</span>
  </div>

        <svg
          className="plato-network"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className="network-lines">
            <path d="M-50 180 C180 80 250 300 470 190 S760 70 1250 210" />
            <path d="M-100 520 C150 400 260 620 500 500 S850 390 1300 540" />
            <path d="M180 -50 C300 150 250 330 430 430 S650 620 720 850" />
            <path d="M850 -50 C760 160 900 260 760 410 S920 620 1080 850" />
            <path d="M-50 680 C180 560 330 700 520 620 S900 520 1250 650" />
          </g>

          <g className="network-nodes">
            <circle cx="180" cy="130" r="3" />
            <circle cx="470" cy="190" r="3" />
            <circle cx="760" cy="120" r="3" />
            <circle cx="980" cy="210" r="3" />
            <circle cx="250" cy="500" r="3" />
            <circle cx="500" cy="500" r="3" />
            <circle cx="760" cy="410" r="3" />
            <circle cx="1000" cy="540" r="3" />
          </g>

          <g className="network-packets">
            <circle r="5">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M-50 180 C180 80 250 300 470 190 S760 70 1250 210"
              />
            </circle>

            <circle r="4">
              <animateMotion
                dur="9s"
                begin="2s"
                repeatCount="indefinite"
                path="M-100 520 C150 400 260 620 500 500 S850 390 1300 540"
              />
            </circle>

            <circle r="4">
              <animateMotion
                dur="8s"
                begin="1s"
                repeatCount="indefinite"
                path="M180 -50 C300 150 250 330 430 430 S650 620 720 850"
              />
            </circle>

            <circle r="5">
              <animateMotion
                dur="10s"
                begin="3s"
                repeatCount="indefinite"
                path="M850 -50 C760 160 900 260 760 410 S920 620 1080 850"
              />
            </circle>
          </g>
        </svg>

        <p className="plato-slogan">
          YOUR PARTNER FOR TECH SOLUTION
        </p>

        <div className="plato-tech-line">
          <span></span>
          <i></i>
          <span></span>
        </div>

        <p className="plato-description">
          حلول تقنية مصممة لتطوير أعمالك
        </p>

        <div className="plato-contact">
          <a
            href="https://wa.me/9647722248374"
            className="plato-button"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a href="https://www.instagram.com/platotech.iq/" className="plato-button" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="https://www.facebook.com/share/19G4e8csM8/?mibextid=wwXIfr" className="plato-button" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>

        <div className="plato-tech-status">
          <span className="status-dot"></span>
          DIGITAL SOLUTIONS
        </div>

        <p className="plato-footer">
          © 2026 PLATO
        </p>
      </main>
    </div>
  );
}

function getCurrentOrderingDay(restaurant) {
  const timezone =
    restaurant?.timezone || "Asia/Baghdad";

  const formatter = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: timezone,
      weekday: "long",
    }
  );

  const day = formatter.format(new Date());

  const dayNames = {
    Sunday: "sunday",
    Monday: "monday",
    Tuesday: "tuesday",
    Wednesday: "wednesday",
    Thursday: "thursday",
    Friday: "friday",
    Saturday: "saturday",
  };

  return dayNames[day];
}

function App() {
    document.body.classList.remove("plato-mode", "restaurant-mode");

  if (window.location.pathname === "/") {
    document.body.classList.add("plato-mode");
  } else {
    document.body.classList.add("restaurant-mode");
  }

  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
const [createdOrder, setCreatedOrder] = useState(null);
const [whatsappUrl, setWhatsappUrl] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [orderType, setOrderType] = useState(
    "استلام من المطعم"
  );

  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  if (window.location.pathname === "/") {
    return <PlatoHome />;
  }
  const currentDayName =
  getCurrentOrderingDay(selectedRestaurant);

const currentDayHours =
  selectedRestaurant.orderingHours?.[
    currentDayName
  ];
function handleOrderTypeChange(type) {
  setOrderType(type);

  if (type === "داخل المطعم") {
    setSelectedBranch("");
  }
}
  

  if (!selectedRestaurant) {
    return (
      <div className="app"
       style={{
     "--restaurant-primary": restaurantTheme.primary,
    "--restaurant-dark": restaurantTheme.dark,
  }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <div>
            <h1>المطعم غير موجود</h1>
            <p>تأكد من صحة رابط المطعم.</p>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // إضافة منتج للسلة
  // =========================

 function addToCart(item) {
  if (
  !orderingOpen ||
  item.available === false ||
  item.orderEnabled === false
) {
  return;
}

  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      return currentCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );
    }

    return [
      ...currentCart,
      {
        ...item,
        quantity: 1,
      },
    ];
  });
}

  // =========================
  // زيادة الكمية
  // =========================

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // =========================
  // تقليل الكمية
  // =========================

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // =========================
  // حذف المنتج
  // =========================

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  // =========================
  // عدد القطع
  // =========================

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // =========================
  // المجموع
  // =========================

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =========================
  // فتح Checkout
  // =========================

  function openCheckout() {
     if (!orderingOpen) {
    alert("الطلبات غير متاحة في هذا الوقت");
    return;
  }
    if (cart.length === 0) {
      alert("السلة فارغة");
      return;
    }

    setShowCheckout(true);
  }

  // =========================
  // إغلاق Checkout
  // =========================

  function closeCheckout() {
    setShowCheckout(false);
  }

  // =========================
  // إرسال الطلب إلى WhatsApp
  // =========================
function sendToWhatsApp() {
  if (!orderingOpen) {
  alert("الطلبات غير متاحة في هذا الوقت");
  return;
}
  if (
    orderType !== "داخل المطعم" &&
    !customerName.trim()
  ) {
    alert("يرجى كتابة الاسم");
    return;
  }

  if (
    orderType !== "داخل المطعم" &&
    !customerPhone.trim()
  ) {
    alert("يرجى كتابة رقم الهاتف");
    return;
  }

  if (
    orderType === "داخل المطعم" &&
    !tableNumber.trim()
  ) {
    alert("يرجى كتابة رقم الطاولة");
    return;
  }

  if (
    orderType === "توصيل" &&
    !address.trim()
  ) {
    alert("يرجى كتابة عنوان التوصيل");
    return;
  }

  if (
  orderType !== "داخل المطعم" &&
  selectedRestaurant.branchesEnabled &&
  selectedRestaurant.branches?.length > 0 &&
  !selectedBranch
) {
  alert("يرجى اختيار الفرع");
  return;
}

  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let order;

  try {
    order = createOrder({
      restaurant: selectedRestaurant,
      customerName,
      customerPhone,
      orderType,
      tableNumber,
      address,
      notes,
      selectedBranch,
      cart,
    });
    setCreatedOrder(order);
    setCart([]);
    setCustomerName("");
setCustomerPhone("");
setTableNumber("");
setAddress("");
setNotes("");
setSelectedBranch("");
  } catch (error) {
    alert(error.message);
    return;
  }

const phone =
  order.branch?.phone ||
  selectedRestaurant.phone;
  let message = "";

  message += `طلب جديد - ${selectedRestaurant.name}\n`;
  message += `رقم الطلب: ${order.orderNumber}\n`;
  message += `--------------------------\n\n`;

  if (orderType !== "داخل المطعم") {
    message += `الاسم: ${customerName.trim()}\n`;
    message += `الهاتف: ${customerPhone.trim()}\n`;
  }

  message += `نوع الطلب: ${orderType}\n`;

  if (order.branch) {
  message += `الفرع: ${order.branch.name}\n`;
}

  if (orderType === "داخل المطعم") {
    message += `رقم الطاولة: ${tableNumber.trim()}\n`;
  }

  if (orderType === "توصيل") {
    message += `العنوان: ${address.trim()}\n`;
  }

  if (notes.trim()) {
    message += `ملاحظات: ${notes.trim()}\n`;
  }

  message += `\nالطلب:\n`;

  order.items.forEach((item) => {
    message += `${item.name} × ${item.quantity} = ${item.total.toLocaleString()} ${order.currency}\n`;
  });

  message += `\n--------------------------\n`;
  message += `عدد القطع: ${itemCount}\n`;
  message += `المجموع: ${order.subtotal.toLocaleString()} ${order.currency}\n`;

  message += `\nشكراً لطلبك من ${selectedRestaurant.name}`;

  const whatsappLink =
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

setWhatsappUrl(whatsappLink);
setShowCheckout(false);
}
  return (
    <div className="app"
     style={{
        "--restaurant-primary": restaurantTheme.primary,
        "--restaurant-dark": restaurantTheme.dark,
      }}>

      {/* =========================
          HEADER / COVER
      ========================== */}
<header
  className="hero"
  style={{
    backgroundImage: selectedRestaurant.heroImage
      ? `
        linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.15) 0%,
          rgba(0, 0, 0, 0.35) 45%,
          rgba(0, 0, 0, 0.92) 100%
        ),
        url("${selectedRestaurant.heroImage}")
      `
      : "none",
  }}
>
  <div className="wrap hero-in">
    <div className="hero-id">
      <div className="logo">
        {selectedRestaurant.logoImage ? (
          <img
            src={selectedRestaurant.logoImage}
            alt={selectedRestaurant.name}
          />
        ) : (
          selectedRestaurant.logo
        )}
      </div>

      <div>
        <h1>{selectedRestaurant.name}</h1>

        {selectedRestaurant.nameEn && (
          <div className="name-en">
            {selectedRestaurant.nameEn}
          </div>
        )}
      </div>
    </div>

    <p>{selectedRestaurant.description}</p>

    <div className="meta">
      {selectedRestaurant.city && (
        <span>{selectedRestaurant.city}</span>
      )}

      {selectedRestaurant.city &&
        selectedRestaurant.hours && (
          <span>•</span>
        )}

      {selectedRestaurant.hours && (
        <span>{selectedRestaurant.hours}</span>
      )}
    </div>

    <div className="actions">
      {selectedRestaurant.phone && (
        <a
          href={`https://wa.me/${selectedRestaurant.phone}`}
          target="_blank"
          rel="noreferrer"
        >
          تواصل معنا
        </a>
      )}

      {selectedRestaurant.location && (
        <a
          href={selectedRestaurant.location}
          target="_blank"
          rel="noreferrer"
        >
          موقع المطعم
        </a>
      )}

      {selectedRestaurant.instagram && (
        <a
          href={selectedRestaurant.instagram}
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      )}
    </div>
  </div>
</header>

      {/* =========================
          MAIN MENU
      ========================== */}

      <main>
        {!selectedRestaurant.orderEnabled ? (
  <div className="orders-disabled-message">
    <strong>الطلبات غير متاحة حالياً</strong>
    <span>
      المطعم لا يستقبل الطلبات حالياً.
    </span>
  </div>
) : !orderingOpen ? (
  <div className="orders-disabled-message">
    <strong>الطلبات مغلقة حالياً</strong>

    {currentDayHours?.enabled ? (
      <span>
        الطلبات متاحة من{" "}
        {currentDayHours.start}{" "}
        إلى{" "}
        {currentDayHours.end}
      </span>
    ) : (
      <span>
        المطعم لا يستقبل الطلبات اليوم.
      </span>
    )}
  </div>
) : null}
        <nav className="cats" aria-label="تصنيفات المنيو">
  <div className="wrap cats-in">
    {selectedMenu.map((category) => (
      <button
        type="button"
        key={category.name}
        onClick={() => {
          const element = document.getElementById(
            `category-${category.name}`
          );

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      >
        {category.name}
      </button>
    ))}
  </div>
</nav>
        {selectedMenu.map((category) => (
          <section
            key={category.name}
            id={`category-${category.name}`}
            className="category"
          >
            <h2>{category.name}</h2>
<div className="products">
  {category.items.map((item) => {
    const cartItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    const quantity = cartItem?.quantity || 0;

    return (
      <article
        className="item"
        key={item.id}
      >
        <div className="item-media">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
          ) : (
            <div className="item-placeholder" />
          )}

          {item.badge && (
            <span className="item-badge">
              {item.badge}
            </span>
          )}
        </div>

        <div className="item-content">
          <div className="item-main">
            <h3>{item.name}</h3>

            {item.description && (
              <p>{item.description}</p>
            )}
          </div>

          <div className="item-bottom">
            <strong className="item-price">
              {item.price.toLocaleString()}{" "}
              {selectedRestaurant.currency}
            </strong>

            {selectedRestaurant.orderEnabled &&
            orderingOpen ? (
              item.available === false ? (
                <button
                  type="button"
                  className="item-add"
                  disabled
                >
                  غير متوفر
                </button>
              ) : item.orderEnabled === false ? (
                <button
                  type="button"
                  className="item-add"
                  disabled
                >
                  الطلب متوقف
                </button>
              ) : quantity === 0 ? (
                <button
                  type="button"
                  className="item-add"
                  onClick={() => addToCart(item)}
                >
                  أضف للسلة
                </button>
              ) : (
                <div className="stepper">
                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    aria-label={`زيادة ${item.name}`}
                  >
                    +
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    aria-label={`تقليل ${item.name}`}
                  >
                    −
                  </button>
                </div>
              )
            ) : null}
          </div>
        </div>
      </article>
    );
  })}
</div>
          </section>
        ))}
      </main>
<footer className="restaurant-footer">
  <div className="footer-main">

    <a
      href="https://iraq-menu.pages.dev/"
      target="_blank"
      rel="noreferrer"
      className="footer-brand"
      aria-label="PLATO TECH"
    >
      <img
        src="https://platotech.pages.dev/assets/plato-mark.svg"
        alt=""
      />

      <span>
        Powered by <strong>PLATO TECH</strong>
      </span>
    </a>

    <div className="footer-socials">

      <a
        href="https://wa.me/9647729511166"
        target="_blank"
        rel="noreferrer"
        className="footer-social whatsapp"
        aria-label="PLATO TECH WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.86 11.86 0 0 0 5.73 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.83h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.9 9.9 0 1 1 8.38 4.62Zm5.43-7.42c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.28.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>

      <a
        href="https://www.instagram.com/platotech.iq/"
        target="_blank"
        rel="noreferrer"
        className="footer-social instagram"
        aria-label="PLATO TECH Instagram"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      </a>

    </div>

  </div>
</footer>

      {/* =========================
          CART
      ========================== */}

      {selectedRestaurant.orderEnabled &&   orderingOpen &&
 cart.length > 0 && (
        <div className="cart">
          <div className="cart-summary">
            <div className="cart-total-info">
              <span className="cart-title">
                🛒 السلة
              </span>

              <span className="cart-count">
                {itemCount} قطعة
              </span>

              <strong className="cart-total">
                {total.toLocaleString()} {selectedRestaurant.currency}
              </strong>
            </div>

            <button
              className="checkout-button"
              onClick={openCheckout}
            >
              إتمام الطلب
            </button>

            <button
              className="show-cart-button"
              onClick={() => {
                const cartItems =
                  document.querySelector(
                    ".cart-items"
                  );

                if (cartItems) {
                  cartItems.classList.toggle(
                    "show"
                  );
                }
              }}
            >
              عرض السلة
            </button>
          </div>

          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-info">
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}{" "}
                    {selectedRestaurant.currency}
                  </span>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================
          CHECKOUT
      ========================== */}

      {selectedRestaurant.orderEnabled &&showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout">
            <div className="checkout-header">
              <h2>إتمام الطلب</h2>

              <button
                className="close-checkout"
                onClick={closeCheckout}
              >
                ×
              </button>
              
            </div>

            {/* الاسم والهاتف */}

{orderType !== "داخل المطعم" && (
  <>
    <label>الاسم</label>

    <input
      type="text"
      placeholder="اكتب اسمك"
      value={customerName}
      onChange={(e) =>
        setCustomerName(e.target.value)
      }
    />

    <label>رقم الهاتف</label>

    <input
      type="tel"
      placeholder="07XXXXXXXXX"
      value={customerPhone}
      onChange={(e) =>
        setCustomerPhone(e.target.value)
      }
    />
  </>
)}
{/* اختيار الفرع */}

{selectedRestaurant.branchesEnabled && selectedRestaurant.branches?.length > 0 ? (
  <>
    {orderType !== "داخل المطعم" && (
      <>
        <label>اختر الفرع</label>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">
            اختر الفرع
          </option>

          {selectedRestaurant.branches.map((branch) => (
            <option
              key={branch.id}
              value={branch.id}
            >
              {branch.name}
            </option>
          ))}
        </select>
      </>
    )}
  </>
) : null}
            {/* نوع الطلب */}

            <label>نوع الطلب</label>

            <div className="order-types">
              <button
                type="button"
                className={
                  orderType ===
                  "داخل المطعم"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleOrderTypeChange(
                    "داخل المطعم"
                  )
                }
              >
                داخل المطعم
              </button>

              <button
                type="button"
                className={
                  orderType ===
                  "استلام من المطعم"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleOrderTypeChange(
                    "استلام من المطعم"
                  )
                }
              >
استلام من المطعم
              </button>

              <button
                type="button"
                className={
                  orderType === "توصيل"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleOrderTypeChange("توصيل")
                }
              >
                توصيل
              </button>
            </div>

            {/* رقم الطاولة */}

            {orderType ===
              "داخل المطعم" && (
              <>
                <label>
                  رقم الطاولة
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="مثلاً: 12"
                  value={tableNumber}
                  onChange={(e) =>
                    setTableNumber(
                      e.target.value
                    )
                  }
                />
              </>
            )}

            {/* عنوان التوصيل */}

            {orderType === "توصيل" && (
              <>
                <label>
                  عنوان التوصيل
                </label>

                <textarea
                  placeholder="يرجى كتابة العنوان بالتفصيل, مع اختيار الفرع الاقرب"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />
              </>
            )}

            {/* الملاحظات */}

            <label>ملاحظات</label>

            <textarea
              placeholder="مثلاً: بدون بصل، بدون صوص..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

            {/* ملخص الطلب */}

            <div className="checkout-order-summary">
              <h3>
                ملخص الطلب
              </h3>

              {cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <span>
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <strong>
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}{" "}
                    {selectedRestaurant.currency}
                  </strong>
                </div>
              ))}
            </div>

            {/* المجموع */}

            <div className="checkout-total">
              <span>المجموع</span>

              <strong>
                {total.toLocaleString()} {selectedRestaurant.currency}
              </strong>
            </div>

            {/* إرسال الطلب */}

            <button
              type="button"
              className="send-order-button"
              onClick={sendToWhatsApp}
            >
              إرسال الطلب إلى WhatsApp
            </button>
          </div>
        </div>
      )}
            {createdOrder && whatsappUrl && (
        <div className="order-success-overlay">
          <div className="order-success">
            <div className="order-success-icon">
              ✓
            </div>

            <h2>تم تجهيز طلبك</h2>

            <p>
              <span>رقم الطلب</span>
              <strong>{createdOrder.orderNumber}</strong>
            </p>

            <p>
              <span>المجموع</span>
              <strong>
                {createdOrder.subtotal.toLocaleString()}{" "}
                {createdOrder.currency}
              </strong>
            </p>

            <p>
              <span>نوع الطلب</span>
              <strong>{createdOrder.orderType}</strong>
            </p>

            <a
              href={whatsappUrl}
              className="success-whatsapp-button"
              target="_blank"
              rel="noreferrer"
            >
              الانتقال إلى WhatsApp
            </a>

            <button
              type="button"
              className="success-back-button"
              onClick={() => {
                setCreatedOrder(null);
                setWhatsappUrl("");
                 setCustomerName("");
    setCustomerPhone("");
    setTableNumber("");
    setAddress("");
    setNotes("");
    setSelectedBranch("");
    setOrderType("استلام من المطعم");
              }}
            >
              العودة إلى المنيو
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;