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
        <div className="plato-logo">PLATO</div>

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
<div className="brand-name">
  <span>PLATO TECH - DIGITAL SOLUTIONS</span>
   <a
    href="https://wa.me/9647729511166"
    target="_blank"
    rel="noreferrer"
    className="plato-contact-button"
  >
    تواصل معنا
  </a>
</div>
      {/* =========================
          HEADER / COVER
      ========================== */}

<header className="hero"
style={{
    backgroundImage: `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.35) 45%,
        rgb(0, 0, 0) 100%
      ),
      url("${selectedRestaurant.heroImage}")
    `,
  }} >
  <div className="hero-overlay">

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

    <h1>{selectedRestaurant.name}</h1>

    <p>{selectedRestaurant.description}</p>

    <div className="buttons">

      <a
        href={`https://wa.me/${selectedRestaurant.phone}`}
        target="_blank"
        rel="noreferrer"
      >
        تواصل معنا
      </a>

      <div className="location-button-wrapper">

        <button
          type="button"
          onClick={() => {
            window.open(
              selectedRestaurant.location,
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          موقع المطعم
        </button>

      </div>

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
        <div className="categories">
          {selectedMenu.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                const element =
                  document.getElementById(
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

        {selectedMenu.map((category) => (
          <section
            key={category.name}
            id={`category-${category.name}`}
            className="category"
          >
            <h2>{category.name}</h2>

            <div className="products">
              {category.items.map((item) => (
                <div
                  className="product"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="product-info">
                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <div className="product-bottom">
                      <strong>
                        {item.price.toLocaleString()} {selectedRestaurant.currency}
                      </strong>

{selectedRestaurant.orderEnabled &&  orderingOpen && (
  <>
    {!item.available ? (
      <button type="button" disabled>
        غير متوفر
      </button>
    ) : item.orderEnabled === false ? (
      <button type="button" disabled>
        الطلب متوقف
      </button>
    ) : (
      <button
        type="button"
        onClick={() => addToCart(item)}
      >
        أضف للسلة
      </button>
    )}
  </>
)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

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