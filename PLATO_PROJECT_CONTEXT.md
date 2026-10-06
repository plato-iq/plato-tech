# PLATO TECH — React/Vite Restaurant Menu
## PROJECT CONTINUITY CHECKPOINT

> **الغرض من هذا الملف:** نقل سياق المشروع بالكامل إلى محادثة جديدة مع ChatGPT بدون الحاجة لإعادة شرح المشروع من الصفر.
>
> **مهم جدًا:** يوجد مشروع Python/static سابق في محادثات قديمة، لكنه **ملغى من سياق هذا المشروع**. لا تستخدمه كمرجع بصري أو تقني أو UX أو Architecture، ولا تدمج أي شيء منه مع مشروع React/Vite الحالي.

---

# 1. فكرة المشروع وهدفه

المشروع هو بناء منتج تجاري تحت علامة:

**PLATO TECH**

المنتج الأساسي هو إنشاء وبيع **مواقع منيو رقمية للمطاعم والكافيهات في العراق**.

الفكرة ليست مجرد صفحة منيو، وإنما موقع Restaurant Menu حديث يمكن للمطعم استخدامه عبر رابط وQR Code، مع إمكانية تفعيل الطلبات حسب احتياج المطعم.

## الخدمات المستهدفة

### Service 1
منيو إلكتروني للمطعم:

- عرض الأصناف.
- التصنيفات.
- الأسعار.
- الصور.
- معلومات المطعم.
- الموقع.
- التواصل.
- QR Code للوصول إلى المنيو.

### Service 2
منيو إلكتروني مع نظام طلب:

- إضافة المنتجات للسلة.
- تحديد نوع الطلب.
- إدخال بيانات العميل عند الحاجة.
- إنشاء رقم طلب.
- إنشاء رسالة طلب منظمة.
- إرسال الطلب إلى WhatsApp الخاص بالمطعم.

## نموذج العمل

- البيع للمطاعم والكافيهات كخدمة.
- التركيز على **بيع المشروع/الخدمة دفعة واحدة** وليس بناء Business Model قائم على اشتراك شهري.
- المستخدم يريد أن تكون التكاليف التقنية المستمرة على جانبه قريبة من الصفر قدر الإمكان.
- المشروع يجب أن يكون قابلًا لإضافة مطاعم متعددة باستخدام نفس الـReact application.

---

# 2. التقنية المستخدمة

## التقنية الأساسية

المشروع الحالي هو:

- React
- Vite
- JavaScript / JSX
- CSS

وليس Python/static.

## البيئة السابقة

المشروع يعمل محليًا على Windows.

تم التعامل سابقًا مع مشكلة PowerShell:

```text
npm.ps1 cannot be loaded because running scripts is disabled
```

وتم حلها.

الإصدارات التي تم تأكيدها سابقًا:

```text
npm 11.19.0
Node v24.21.0
```

## التشغيل

المشروع React/Vite يتم تشغيله باستخدام:

```bash
npm run dev
```

ثم الوصول إلى localhost من المتصفح.

تم سابقًا حل مشكلة كانت تمنع الهاتف من الوصول إلى localhost، وبعد الإصلاح أصبح الوصول من الهاتف يعمل.

---

# 3. هيكل المشروع الحالي

الهيكل الأساسي الحالي:

```text
plato-menu
├─ dist
├─ node_modules
├─ public
├─ src
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
├─ PLATO_PROJECT_CONTEXT.md
├─ README.md
└─ vite.config.js
```

داخل `src`:

```text
src
├─ assets
├─ App.css
├─ App.jsx
├─ dataService.js
├─ index.css
├─ main.jsx
├─ menuData.js
├─ orderService.js
└─ restaurants.js
```

---

# 4. وظيفة الملفات المهمة

## `src/App.jsx`

هذا هو الملف الرئيسي للتطبيق.

مسؤول عن:

- routing الحالي حسب restaurant slug.
- صفحة PLATO TECH الرئيسية.
- صفحة المطعم.
- عرض الـHero.
- عرض التصنيفات.
- عرض المنتجات.
- السلة.
- Checkout.
- اختيار نوع الطلب.
- بيانات العميل.
- رقم الطاولة للـDine-in.
- الفرع عند وجوده.
- إرسال الطلب إلى WhatsApp.
- استدعاء `createOrder`.
- إدارة حالات React الأساسية.

---

## `src/App.css`

ملف CSS الرئيسي.

يحتوي على:

- Theme variables.
- Restaurant mode.
- PLATO Home styling.
- Hero.
- Category navigation.
- Category sections.
- Product cards.
- Cart.
- Checkout.
- Order success.
- Branch UI.
- Responsive/mobile styles.
- Accessibility focus states.

**مهم:** تم تعديل هذا الملف عدة مرات خلال جلسة التصميم الأخيرة، لذلك يجب عدم استبداله بملف قديم كامل من الذاكرة.

---

## `src/dataService.js`

مسؤول عن جلب/إرجاع بيانات المطعم والمنيو والإعدادات.

في النسخة الحالية يستخدم التطبيق:

```jsx
getRestaurantMenu
getRestaurantSettings
```

من هذا الملف.

---

## `src/orderService.js`

مسؤول عن منطق الطلب.

منه يتم استيراد:

```jsx
createOrder
isOrderingOpen
```

ويستخدم التطبيق:

```jsx
const orderingOpen = isOrderingOpen(selectedRestaurant);
```

ثم عند إرسال الطلب:

```jsx
createOrder(...)
```

---

## `src/restaurants.js`

يحتوي بيانات/إعدادات المطاعم الموجودة في المشروع.

---

## `src/menuData.js`

يحتوي بيانات المنيو/الأصناف المستخدمة في المشروع أو مصدرًا منها.

---

## `src/main.jsx`

نقطة تشغيل React الأساسية.

---

## `src/index.css`

Global/base CSS بالإضافة إلى ما هو موجود في `App.css`.

---

## `vite.config.js`

إعداد Vite.

---

# 5. Routing الحالي

الـrouting الحالي ليس React Router.

يتم استخراج الـslug من:

```jsx
const restaurantSlug =
  window.location.pathname
    .split("/")
    .filter(Boolean)[0] || "burger-house";
```

وبالتالي:

```text
/
```

يعرض PLATO Home.

بينما مثلًا:

```text
/burger-house
```

يستخدم:

```text
burger-house
```

كـrestaurant slug.

---

# 6. PLATO Home

عند فتح:

```text
/
```

يعرض التطبيق صفحة PLATO TECH الرئيسية.

يوجد Component باسم:

```jsx
PlatoHome()
```

وهو حاليًا موجود داخل `App.jsx`.

## PLATO Home يتضمن

- PLATO TECH branding.
- شعار PLATO.
- animated SVG network lines/nodes/packets.
- النص:

```text
YOUR PARTNER FOR TECH SOLUTION
```

- النص العربي:

```text
حلول تقنية مصممة لتطوير أعمالك
```

- أزرار WhatsApp / Instagram / Facebook.
- status:

```text
DIGITAL SOLUTIONS
```

- footer:

```text
© 2026 PLATO
```

## Body modes

التطبيق يضيف classes على body حسب الصفحة:

```text
plato-mode
restaurant-mode
```

صفحة PLATO Home لا يجب أن تتأثر بتعديلات Restaurant UI.

---

# 7. Restaurant Mode

عند الدخول إلى restaurant slug:

```text
/burger-house
```

أو أي slug موجود في البيانات:

يتم تحميل:

```jsx
selectedRestaurant
selectedMenu
```

والـtheme:

```jsx
const restaurantTheme = selectedRestaurant?.theme || {
  primary: "#ff5a36",
  dark: "#171717",
};
```

ثم يستخدم لون المطعم الأساسي كـaccent.

---

# 8. بيانات المطعم

الـrestaurant object يحتوي على معلومات من هذا النوع:

```text
slug
name
nameEn
description
phone
location
city
hours
instagram
logo
logoImage
heroImage
currency
theme
orderEnabled
orderTypes
```

قد تختلف البيانات الفعلية لكل مطعم.

---

# 9. Theme الحالي

المشروع يدعم لون المطعم كـdynamic accent.

في `App.css` يوجد:

```css
:root {
  --primary: var(--restaurant-primary, #ff5a36);

  --primary-dark: color-mix(
    in srgb,
    var(--primary) 82%,
    #000 18%
  );

  --primary-soft: color-mix(
    in srgb,
    var(--primary) 10%,
    #fff 90%
  );

  --primary-light: color-mix(
    in srgb,
    var(--primary) 7%,
    #fff 93%
  );

  --dark: #111111;
  --dark-soft: #1c1c1c;

  --text: #181818;
  --text-soft: #6f6f6f;

  --background: #f3f2ef;
  --white: #ffffff;

  --border: rgba(18, 18, 18, 0.075);

  --shadow-sm:
    0 2px 10px rgba(0, 0, 0, 0.035);

  --shadow-md:
    0 8px 24px rgba(0, 0, 0, 0.055);

  --shadow-lg:
    0 18px 50px rgba(0, 0, 0, 0.10);

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 22px;

  --transition:
    220ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

---

# 10. Restaurant body styling

يوجد:

```css
body.restaurant-mode
```

والتطبيق يستخدم خلفية فاتحة للمطعم.

من القواعد الحالية المهمة:

```css
body.restaurant-mode {
  margin: 0;
  background: #f7f7f8;
  color: #202020;
  direction: rtl;
  overflow-x: hidden;
}
```

و:

```css
body.restaurant-mode #root {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
}
```

و:

```css
body.restaurant-mode .app {
  min-height: 100vh;
  padding-bottom: 130px;
  background: #f7f7f8;
  color: #202020;
}
```

---

# 11. Restaurant Hero

تم تعديل JSX الخاص بالـHero ليصبح بهذا الهيكل العام:

```jsx
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
```

## Hero decisions

- Hero image is optional.
- Restaurant logo can be image or fallback text.
- English name is optional.
- City/hours are optional.
- WhatsApp/location/Instagram buttons appear only when data exists.
- Desktop Hero كان مقبولًا ومستقرًا.
- تم التركيز مؤخرًا على mobile Hero.

---

# 12. Mobile Hero — آخر نسخة مستقرة

داخل:

```css
@media (max-width: 600px)
```

تم عمل Premium mobile Hero.

القيم الأساسية الحالية:

```css
body.restaurant-mode .hero {
  min-height: 400px;
  align-items: flex-end;
  background-position: center center;
  isolation: isolate;
  box-shadow:
    0 14px 38px rgba(0, 0, 0, 0.16);
}
```

يوجد overlay:

```css
body.restaurant-mode .hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;

  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.04) 0%,
      rgba(0, 0, 0, 0.16) 38%,
      rgba(0, 0, 0, 0.72) 72%,
      rgba(0, 0, 0, 0.94) 100%
    );

  pointer-events: none;
}
```

Hero content:

```css
body.restaurant-mode .hero-in {
  position: relative;
  z-index: 2;

  width: 100%;

  padding:
    0 18px 34px;

  text-align: center;
}
```

Logo:

```css
body.restaurant-mode .logo {
  width: 112px;
  height: 112px;

  margin:
    0 auto 18px;

  border:
    3px solid
    rgba(255, 255, 255, 0.82);

  border-radius: 50%;

  background:
    rgba(10, 10, 10, 0.52);

  box-shadow:
    0 12px 34px rgba(0, 0, 0, 0.34),
    0 0 0 7px rgba(255, 255, 255, 0.06);

  font-size: 20px;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

Title:

```css
body.restaurant-mode .hero h1 {
  margin: 0;

  font-size:
    clamp(28px, 8vw, 36px);

  line-height: 1.15;
  font-weight: 900;

  letter-spacing: -0.6px;

  color: #ffffff;

  text-shadow:
    0 4px 20px rgba(0, 0, 0, 0.46);
}
```

English name:

```css
body.restaurant-mode .hero .name-en {
  margin-top: 5px;

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 0.7px;

  color:
    rgba(255, 255, 255, 0.66);
}
```

Description:

```css
body.restaurant-mode .hero p {
  max-width: 340px;

  margin:
    14px auto 11px;

  font-size: 14px;
  font-weight: 500;

  line-height: 1.75;

  color:
    rgba(255, 255, 255, 0.82);
}
```

Meta:

```css
body.restaurant-mode .hero .meta {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 17px;

  gap: 5px;

  font-size: 11px;
  font-weight: 600;

  color:
    rgba(255, 255, 255, 0.66);
}
```

---

# 13. Hero Actions — آخر نسخة مستقرة

داخل mobile media:

```css
body.restaurant-mode .actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 8px;

  width: 100%;
}
```

الأزرار:

```css
body.restaurant-mode .actions a,
body.restaurant-mode .actions button {
  min-height: 40px;

  padding:
    0 17px;

  border:
    1px solid rgba(255, 255, 255, 0.20);

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.94);

  color: #151515;

  font-family: inherit;
  font-size: 13px;
  font-weight: 700;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.18);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}
```

Hover/active موجودان أيضًا.

**هذه النسخة تم اعتبارها مستقرة.**

---

# 14. Category Navigation

تم تعديل JSX إلى:

```jsx
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
```

## Mobile category nav

آخر نسخة مستقرة:

```css
body.restaurant-mode .cats {
  position: sticky;
  top: 0;
  z-index: 100;

  width: 100vw;

  margin-right:
    calc(50% - 50vw);

  margin-left:
    calc(50% - 50vw);

  margin-bottom: 20px;

  background:
    rgba(255, 255, 255, 0.90);

  border-bottom:
    1px solid rgba(0, 0, 0, 0.055);

  border-radius: 0;

  box-shadow:
    0 5px 18px rgba(0, 0, 0, 0.045);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-sizing: border-box;
}
```

والـbuttons أصبحت pills صغيرة:

```css
body.restaurant-mode .cats-in button {
  flex:
    0 0 auto;

  min-height: 37px;

  padding:
    0 15px;

  border:
    1px solid rgba(20, 20, 20, 0.065);

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.96);

  color: #555555;

  font-family: inherit;

  font-size: 12px;
  font-weight: 700;

  white-space: nowrap;
}
```

الـhorizontal scrolling يعمل بالـtouch.

**Category Navigation مستقرة حاليًا.**

---

# 15. Category Sections

تمت إضافة/ضبط section styling.

الـcategory:

```css
body.restaurant-mode .category {
  position: relative;
  scroll-margin-top: 95px;
  margin-bottom: 46px;
  padding: 4px 0 10px;
}
```

ويوجد background section ممتد بعرض الصفحة:

```css
body.restaurant-mode .category::after {
  content: "";
  position: absolute;
  top: -18px;
  bottom: -18px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.72),
      rgba(255, 255, 255, 0.96)
    );

  border-top:
    1px solid rgba(20, 20, 20, 0.035);

  border-bottom:
    1px solid rgba(20, 20, 20, 0.035);

  z-index: -1;
  pointer-events: none;
}
```

العنوان desktop:

```css
body.restaurant-mode .category h2 {
  position: relative;
  margin: 0 0 17px;
  padding-right: 14px;

  color: #171717;

  font-size: 23px;
  line-height: 1.35;
  font-weight: 800;

  letter-spacing: -0.2px;
}
```

ويظهر accent bar بجانب العنوان.

## Mobile

آخر نسخة مستقرة:

```css
body.restaurant-mode .category {
  margin-bottom: 38px;
  padding: 2px 0 8px;
}

body.restaurant-mode .category::after {
  top: -14px;
  bottom: -14px;
}

body.restaurant-mode .category h2 {
  margin:
    0 0 14px;

  padding-right: 13px;

  color: #171717;

  font-size: 19px;
  line-height: 1.4;
  font-weight: 800;

  letter-spacing: -0.2px;
}
```

Accent:

```css
body.restaurant-mode .category h2::before {
  width: 4px;
  height: 21px;

  border-radius: 99px;

  background:
    linear-gradient(
      180deg,
      var(--primary),
      color-mix(
        in srgb,
        var(--primary) 55%,
        #ffffff
      )
    );
}
```

---

# 16. Product Cards

## JSX الحالي

تم تحويل المنتج إلى:

```jsx
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
```

## Product behavior

- item image.
- badge.
- name.
- description.
- price.
- add-to-cart.
- unavailable state.
- ordering stopped state.
- quantity stepper.

## Important

تم تجربة نسخة "Premium Polish" أكثر جرأة للمنتجات، لكنها **لم تكن جيدة** حسب تقييم المستخدم، لذلك تم عمل rollback إلى النسخة السابقة المقبولة.

آخر نسخة مستقرة للـmobile product card هي:

```css
body.restaurant-mode .item {
  min-height: 125px;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  grid-template-columns: 125px minmax(0, 1fr);
}
```

الصورة:

```css
body.restaurant-mode .item-media {
  height: 125px;
}

body.restaurant-mode .item-media img {
  width: 100%;
  height: 125px;
  object-fit: cover;
  object-position: center;
  margin: 0;

  -webkit-mask-image:
    linear-gradient(
      to left,
      #000 0%,
      #000 55%,
      rgba(0,0,0,0.85) 72%,
      rgba(0,0,0,0.45) 88%,
      transparent 100%
    );

  mask-image:
    linear-gradient(
      to left,
      #000 0%,
      #000 55%,
      rgba(0,0,0,0.85) 72%,
      rgba(0,0,0,0.45) 88%,
      transparent 100%
    );

  transform: none;

  filter:
    saturate(1.06)
    contrast(1.04);

  transition:
    filter 300ms ease;
}
```

المحتوى:

```css
body.restaurant-mode .item-content {
  padding: 13px 14px;
}

body.restaurant-mode .item-main h3 {
  font-size: 15px;
  font-weight: 800;
  color: #171717;
}

body.restaurant-mode .item-main p {
  font-size: 12px;
  margin-bottom: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}
```

السعر:

```css
body.restaurant-mode .item-price {
  font-size: 16px;
  font-weight: 1000;
  color: var(--primary);
}
```

زر الإضافة:

```css
body.restaurant-mode .item-add {
  min-height: 36px;
  padding: 0 13px;
  border-radius: 11px;

  background: var(--primary);
  color: #ffffff;

  font-size: 12px;
  font-weight: 800;

  box-shadow:
    0 5px 14px
    color-mix(
      in srgb,
      var(--primary) 18%,
      transparent
    );
}
```

Stepper:

```css
body.restaurant-mode .stepper button {
  width: 29px;
  height: 29px;
}

body.restaurant-mode .stepper span {
  min-width: 24px;
}
```

**لا تغيّر Product Cards حاليًا إلا إذا كان هناك سبب واضح.**

---

# 17. Cart

Cart موجودة وتعمل.

تم تحسين mobile positioning سابقًا.

آخر نسخة مستقرة تتضمن:

```css
body.restaurant-mode .cart {
  position: fixed;
  left: 50%;
  bottom: 8px;
  z-index: 200;

  width: calc(100% - 16px);
  max-width: 520px;

  padding: 10px 12px 12px;

  transform: translateX(-50%);

  border: 1px solid rgba(0, 0, 0, 0.055);
  border-radius: 18px;

  background:
    rgba(255, 255, 255, 0.94);

  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.14),
    0 3px 12px rgba(0, 0, 0, 0.06);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-sizing: border-box;
}
```

والـcart total:

```css
body.restaurant-mode .cart-title {
  font-size: 14px;
}

body.restaurant-mode .cart-total {
  font-size: 16px;
}
```

Checkout button:

```css
body.restaurant-mode .checkout-button {
  min-height: 48px;
  padding: 12px;
  font-size: 15px;
}
```

---

# 18. Checkout

Checkout logic موجود ويعمل.

في React state:

```jsx
showCheckout
```

و:

```jsx
customerName
customerPhone
orderType
tableNumber
address
notes
```

أنواع الطلب:

```text
استلام من المطعم
توصيل
داخل المطعم
```

## قواعد validation

### Dine-in

لا يحتاج اسم/رقم هاتف، لكنه يحتاج:

```text
tableNumber
```

### Pickup

يحتاج:

```text
customerName
customerPhone
```

### Delivery

يحتاج:

```text
customerName
customerPhone
address
```

---

# 19. Mobile Checkout

آخر CSS mobile تم تحسينه.

يتضمن:

```css
body.restaurant-mode .checkout-overlay {
  padding: 10px;
  background:
    rgba(8, 8, 8, 0.48);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

والـcheckout:

```css
body.restaurant-mode .checkout {
  width: 100%;
  max-width: 520px;
  max-height: 94vh;

  padding: 20px 18px;

  border:
    1px solid rgba(0, 0, 0, 0.055);

  border-radius: 20px;

  background: #ffffff;

  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.20);

  box-sizing: border-box;
  overflow-y: auto;
}
```

والـinputs تم تحسينها.

**مهم:** الـCheckout JSX والمنطق لم يتم تغييرهما في مرحلة الـvisual polish الأخيرة. التعديلات كانت CSS فقط.

---

# 20. Order System

`orderService.js` يحتوي:

```jsx
createOrder
isOrderingOpen
```

عند إرسال الطلب:

```jsx
createOrder({
  restaurant,
  customerName,
  customerPhone,
  orderType,
  tableNumber,
  address,
  notes,
  cart
})
```

يتم إنشاء order.

الطلب يحتوي على order number.

تم استخدام:

```jsx
order.orderNumber
```

في رسالة WhatsApp.

---

# 21. WhatsApp Ordering

بعد إنشاء الطلب:

- يتم تجهيز رسالة عربية منظمة.
- يتم أخذ رقم المطعم من بيانات المطعم.
- يتم إنشاء WhatsApp URL.
- يتم وضع الرابط في:

```jsx
whatsappUrl
```

الصيغة الأساسية:

```text
https://wa.me/<phone>?text=<encoded message>
```

ثم يتم فتح WhatsApp.

---

# 22. Order flow الحالي

المسار العام:

```text
Product
↓
أضف للسلة
↓
Cart
↓
إتمام الطلب
↓
Checkout
↓
اختيار نوع الطلب
↓
إدخال البيانات المطلوبة
↓
createOrder()
↓
إنشاء order number
↓
إنشاء WhatsApp message
↓
فتح WhatsApp
```

## ملاحظة

كان هناك سابقًا نقاش حول وجود زر منفصل لإرسال WhatsApp.

القرار الحالي هو أن تجربة الطلب يجب أن تكون مباشرة وواضحة، وليس فيها duplicate actions غير ضرورية.

لكن يجب **عدم تغيير منطق الـCheckout حاليًا** أثناء الـvisual work إلا إذا طلب المستخدم ذلك صراحة.

---

# 23. Order types

القيم المنطقية المستخدمة:

```text
dine-in
pickup
delivery
```

وتظهر للمستخدم بالعربية:

```text
داخل المطعم
استلام من المطعم
توصيل
```

---

# 24. Ordering availability

هناك:

```jsx
isOrderingOpen(selectedRestaurant)
```

والـUI يعتمد على:

```jsx
orderingOpen
```

وبالتالي قد يتوقف ordering حسب إعدادات المطعم/وقت العمل.

كما أن المنتج نفسه يمكن أن يحتوي على:

```text
available === false
```

أو:

```text
orderEnabled === false
```

---

# 25. Cart state

السلة مبنية على:

```jsx
cart
```

ويتم البحث عن المنتج بواسطة:

```jsx
item.id
```

والكمية:

```jsx
quantity
```

هناك functions منطقية لـ:

```text
addToCart
increaseQuantity
decreaseQuantity
removeFromCart
```

ويتم حساب:

```text
itemCount
total
```

---

# 26. Branch support

المشروع يحتوي دعمًا للفروع.

يوجد state:

```jsx
selectedBranch
```

وفي اختيار نوع الطلب:

- Dine-in يمسح branch حسب المنطق الحالي.
- باقي أنواع الطلب قد تستخدم branch إذا كان المطعم يدعم ذلك.

**Branch functionality موجودة ويجب الحفاظ عليها.**

---

# 27. Timezone

هناك helper:

```jsx
getCurrentOrderingDay()
```

والـtimezone الافتراضي:

```text
Asia/Baghdad
```

هذا مرتبط بمنطق opening/order availability.

---

# 28. Mobile main width

تم تعديل:

```css
body.restaurant-mode .app main
```

إلى:

```css
body.restaurant-mode .app main {
  width:
    calc(100% - 24px);

  max-width: 850px;

  margin-right: auto;
  margin-left: auto;
}
```

هذا هو آخر ضبط للمسافات العامة للموبايل.

---

# 29. Responsive breakpoints

يوجد:

```css
@media (max-width: 600px)
```

للموبايل.

ويوجد:

```css
@media (max-width: 380px)
```

للشاشات الصغيرة جدًا.

حاليًا عند `380px`:

```css
body.restaurant-mode .quantity-controls {
  gap: 3px;
}

body.restaurant-mode .quantity-controls button {
  width: 29px;
  height: 29px;
}
```

والـorder types تتحول إلى عمود واحد:

```css
body.restaurant-mode .order-types {
  grid-template-columns: 1fr;
}
```

---

# 30. Accessibility

يوجد focus-visible styling:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline:
    3px solid
    color-mix(
      in srgb,
      var(--primary) 35%,
      transparent
    );

  outline-offset: 2px;
}
```

تم تعديل اللون ليعتمد على:

```text
--primary
```

بدل hardcoded orange.

---

# 31. المشاكل التي ظهرت وتم إصلاحها

## المشكلة 1 — npm PowerShell

ظهرت:

```text
npm.ps1 cannot be loaded because running scripts is disabled
```

تم حلها.

---

## المشكلة 2 — الهاتف لم يصل إلى localhost

في مرحلة سابقة كان الهاتف لا يستطيع الوصول إلى localhost.

تم حل المشكلة وأصبح الوصول يعمل.

---

## المشكلة 3 — مشاكل Cart positioning

كانت السلة سابقًا تتحرك/تنزلق لليسار أو لا تتمركز بشكل صحيح.

تم إصلاح ذلك باستخدام:

```css
left: 50%;
transform: translateX(-50%);
```

وأصبحت centered.

---

## المشكلة 4 — Checkout black box

ظهرت مشكلة في شكل Checkout/black box خلال محاولات سابقة.

تم إصلاحها في النسخة الحالية.

---

## المشكلة 5 — blank page أثناء تغيير checkout flow

في مرحلة سابقة أدى تعديل منطق إرسال الطلب إلى WhatsApp إلى blank page.

تم تجاوز هذه النسخة والرجوع إلى flow يعمل.

---

## المشكلة 6 — CSS `.buttons`

كان هناك CSS قديم:

```css
body.restaurant-mode .buttons
```

بينما JSX الحالي يستخدم:

```jsx
.actions
```

تم حذف `.buttons` القديم من mobile CSS.

---

## المشكلة 7 — حذف `.brand-name`

تمت محاولة حذف تعريف `.brand-name` المكرر.

نتج عن ذلك:

**تداخل العناصر.**

تم إرجاع البلوك كما كان.

### القرار

لا تحذف `.brand-name` أو تعيد هيكلته بدون مراجعة كاملة لتعريفاته.

---

## المشكلة 8 — Product Premium Polish

تمت تجربة نسخة أكثر Premium للـproduct cards.

المستخدم قال:

```text
مو تمام
```

لذلك تم عمل rollback إلى النسخة السابقة المقبولة.

### القرار

لا تعيد تجربة نفس الاتجاه.

---

# 32. المشاكل الحالية / غير المؤكدة

## 1. Full CSS audit

يوجد احتمال وجود CSS قديم/مكرر في `App.css`.

لكن لا ينبغي حذف التعريفات بشكل عشوائي.

مثال مهم:

```text
.brand-name
```

كان له أكثر من تعريف، وحذف أحدها تسبب بتداخل.

### الحالة

**يحتاج audit إذا أردنا تنظيف الملف، لكنه ليس blocker حاليًا.**

---

## 2. `font-weight: 1000`

هناك حاليًا:

```css
body.restaurant-mode .item-price {
  font-weight: 1000;
}
```

هذا موجود في آخر نسخة مستقرة للـproduct card.

لا تغيّره فقط من أجل "التنظيف" بدون سبب بصري واضح.

---

## 3. Desktop final polish

Desktop Hero وProduct Cards كانا مقبولين.

لكن لم يتم تنفيذ redesign شامل للـdesktop في المرحلة الأخيرة.

---

## 4. Checkout final UX

الـCheckout يعمل وتم تحسين CSS الخاص به.

لكن لم يتم بعد تنفيذ UX redesign شامل للـCheckout.

---

## 5. Cart final UX

السلة تعمل ومظهرها تحسن.

لكن لم يتم تنفيذ redesign شامل لمحتوى السلة نفسه.

---

# 33. الأشياء التي يجب عدم تغييرها

هذه قرارات مهمة:

## لا تغيّر

### 1. Project foundation

المشروع الحالي:

```text
React + Vite
```

ولا تعيد بناءه من الصفر.

---

### 2. Routing

لا تضف React Router فقط من أجل التغيير.

الـslug routing الحالي يعمل.

---

### 3. PLATO Home

لا تعبث بـ:

```jsx
PlatoHome()
```

أثناء تعديل Restaurant UI.

---

### 4. Order logic

لا تغير:

```text
createOrder
isOrderingOpen
```

أثناء visual polish.

---

### 5. WhatsApp flow

لا تعيد بناء order submission بدون طلب مباشر.

---

### 6. Branch support

لا تحذف أو تعطل branch functionality.

---

### 7. Product behavior

لا تغير:

```text
available
orderEnabled
orderingOpen
```

فقط من أجل التصميم.

---

### 8. Product cards

النسخة الحالية هي آخر نسخة مستقرة.

لا تعيد الـPremium Polish الذي تم رفضه.

---

### 9. `.brand-name`

لا تحذف تعريفاته أو تعيد ترتيبها بشكل عشوائي.

---

### 10. Mobile-first changes

أي تعديل جديد يجب أن يكون محدودًا وواضحًا، ويفضل أن يكون داخل:

```css
@media (max-width: 600px)
```

إذا كان الهدف mobile فقط.

---

# 34. طريقة العمل المفضلة

المستخدم يفضل:

- تعليمات عملية.
- كود جاهز للنسخ.
- تحديد المكان بدقة.
- إخبار المستخدم هل يستبدل block كامل أو يضيفه.
- لا يتم إرسال تغييرات كثيرة غير مترابطة.
- Batch واحد في كل مرة.
- المستخدم يطبق التعديل ثم يقول `done`.
- بعدها ننتقل للخطوة التالية.

## ممنوع

لا تقل:

```text
عدّل هذا الشيء تقريبًا
```

بل حدد:

```text
ابحث عن هذا البلوك
واستبدله كاملًا بهذا
```

إذا كان الاستبدال الكامل هو الخيار الآمن.

---

# 35. آخر حالة مستقرة

آخر حالة مستقرة هي بعد:

## Batch 1

تم تحسين:

- Mobile Hero actions.
- Category navigation.
- Product card mobile typography/buttons.

---

## Batch 2

تم تحسين:

- Category sections.
- Category heading spacing.
- Section background framing.

---

## Batch 3

تم تحسين:

- Mobile Cart positioning.
- Cart glass/background/shadow.

---

## Batch 4

تم تحسين:

- Mobile Checkout.
- Overlay.
- Checkout card.
- Inputs.
- Order type buttons.

---

## Batch 5

تم تعديل:

- General accent/background behavior.
- focus outline ليستخدم `--primary`.

---

## Batch 6

تم حذف:

```css
.buttons
```

القديم من mobile CSS.

---

## Batch 7

محاولة حذف `.brand-name` فشلت.

تم rollback وإرجاع `.brand-name`.

**لا يعتبر Batch 7 تغييرًا نهائيًا؛ الحالة الحالية هي النسخة المستقرة بعد rollback.**

---

## Batch 8

تمت تجربة Product Premium Polish.

فشل بصريًا حسب المستخدم.

تم rollback إلى Product Card version السابقة.

---

## Batch 9

تم تحسين Mobile Hero بالكامل:

- overlay.
- logo size.
- title hierarchy.
- description.
- meta.
- spacing.

نجح.

---

## Batch 10

تم تحسين Hero actions.

نجح.

---

## Batch 11

تم تحسين Category Navigation.

نجح.

---

## Batch 12

تم تحسين Category Headings.

نجح.

---

## Batch 13

تم ضبط main width/mobile spacing:

```css
width: calc(100% - 24px);
max-width: 850px;
margin-right: auto;
margin-left: auto;
```

نجح.

---

# 36. الحالة البصرية الحالية

المستخدم كان يريد أن يتحول التصميم من:

```text
شكل عادي / cheap-looking
```

إلى:

```text
Premium restaurant digital menu
```

تم التركيز حتى الآن على:

```text
Hero
↓
Category Navigation
↓
Category Sections
↓
Product Cards
↓
Cart
↓
Checkout
```

لكن **الـHero هو العنصر الذي تم إعطاؤه أكبر قدر من الـpolish حتى الآن**.

---

# 37. مشروع Python السابق — ممنوع استخدامه

هناك مشروع سابق كان static/Python ويحتوي على:

```text
build.py
serve.py
template/
restaurants/
```

هذا المشروع **لم يعد جزءًا من المشروع الحالي**.

لا تستخدمه:

- كمرجع بصري.
- كمرجع UX.
- كمرجع CSS.
- كمرجع Architecture.
- كمرجع Features.
- كمرجع code.
- أو لدمج أي جزء منه مع React.

**اعتبره مشروعًا منفصلًا ومنسيًا تمامًا بالنسبة لهذا العمل.**

---

# 38. Cloudflare Pages

Cloudflare Pages ذُكر ضمن سياق نشر المشروع/الفكرة، لكن تفاصيل إعداد deployment النهائية الحالية **غير مؤكدة من آخر حالة في هذه المحادثة**.

المذكور سابقًا هو نطاق/فكرة استخدام Cloudflare Pages بسبب الرغبة في:

- تكلفة استضافة قريبة من الصفر.
- إمكانية نشر المشروع.
- تشغيل عدة restaurant slugs.

لكن لا تفترض وجود إعداد deployment محدد لم يتم تأكيده في آخر نسخة.

---

# 39. Production architecture المقصودة

الفكرة الحالية:

```text
PLATO TECH React App
        │
        ├── /
        │    └── PLATO Home
        │
        ├── /restaurant-slug-1
        │    └── Restaurant Menu
        │
        ├── /restaurant-slug-2
        │    └── Restaurant Menu
        │
        └── /restaurant-slug-N
             └── Restaurant Menu
```

كل restaurant يعتمد على slug وبيانات منفصلة، بينما الـReact app واحد.

---

# 40. قواعد مهمة للمساعد الجديد

عند فتح محادثة جديدة، تعامل مع هذا الملف على أنه:

**Current Project Source of Truth**

إلا إذا المستخدم أرسل نسخة أحدث من ملف أو كود.

إذا أرسل المستخدم ملفًا كاملًا:

- اعتمد النسخة التي أرسلها.
- لا تستبدلها بذاكرة قديمة.
- فرّق بين current code وprevious code.
- لا تخترع functions أو variables غير موجودة.
- لا تفترض أن مشروع Python موجود أو يجب استخدامه.

إذا كان هناك تعارض بين هذا الملف والكود الذي يرسله المستخدم:

**الكود الحالي الذي يرسله المستخدم هو الأحدث.**

---

# 41. فلسفة التصميم الحالية

المطلوب ليس مجرد:

```text
CSS جميل
```

بل:

```text
Premium
Modern
Mobile-first
Restaurant-focused
Commercially sellable
Fast
Clear
Easy to order
```

مع الحفاظ على:

- وضوح الأسعار.
- وضوح CTA.
- سهولة تصفح التصنيفات.
- سرعة الوصول للمنتجات.
- سهولة السلة.
- سهولة الطلب.
- استخدام accent color الخاص بالمطعم.
- عدم تحويل الواجهة إلى تصميم مبالغ فيه.

---

# 42. عدم الإفراط في الـPolish

تم اكتشاف أن بعض التغييرات التي تبدو "Premium" على الورق تجعل التصميم أسوأ عمليًا.

مثال:

Product card redesign الأخير.

لذلك:

**لا تفترض أن المزيد من gradients / shadows / glassmorphism = Premium.**

Premium هنا يجب أن يأتي من:

- spacing.
- hierarchy.
- typography.
- restraint.
- consistency.
- imagery.
- interaction.
- proportions.

---

# 43. آخر تعديل كنا نعمل عليه

آخر تعديل مكتمل كان:

### Batch 13 — Mobile main spacing

تم تغيير:

```css
body.restaurant-mode .app main
```

إلى:

```css
body.restaurant-mode .app main {
  width:
    calc(100% - 24px);

  max-width: 850px;

  margin-right: auto;
  margin-left: auto;
}
```

والمستخدم قال:

```text
done
```

بعدها تم الاتفاق على عدم الاستمرار في إضافة CSS عشوائي.

---

# 44. ما كان مقررًا أن نعمل عليه بعد ذلك

بعد Batch 13 كان الاتجاه:

- عدم العبث بالـlayout أكثر.
- مراجعة التصميم ككل.
- عدم تغيير العناصر المستقرة بدون سبب.
- تحديد المنطقة التي تحتاج فعلًا إلى Premium polish.
- إذا كان هناك تعديل جديد، يكون محددًا جدًا.

لكن **لم يتم تنفيذ Batch 14 فعليًا**.

لذلك لا تعتبر أي Batch بعد Batch 13 منفذًا.

---

# 45. NEXT STEP

## NEXT STEP

ابدأ من:

**React/Vite project الحالي فقط.**

الحالة:

```text
Stable after Batch 13
```

آخر تعديل:

```css
body.restaurant-mode .app main {
  width: calc(100% - 24px);
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
}
```

### الخطوة التالية ليست كتابة CSS مباشرة.

أولًا يجب تقييم الواجهة الحالية وتحديد **عنصر واحد فقط** يحتاج تحسينًا.

الأولوية الحالية:

```text
1. Cart
2. Checkout
3. Desktop polish
4. Overall visual consistency
```

لكن لا تفترض أي واحد منها قبل معرفة ملاحظة المستخدم الحالية.

### قواعد الاستمرار

- لا تستخدم مشروع Python السابق.
- لا تدمج Python مع React.
- لا تعيد بناء المشروع.
- لا تغير architecture.
- لا تغير routing.
- لا تغير order logic.
- لا تغير WhatsApp logic.
- لا تغير PLATO Home.
- لا تحذف CSS لمجرد أنه يبدو مكررًا.
- لا تعيد تصميم Product Cards بنفس الاتجاه الذي تم رفضه.
- لا ترسل batch كبيرًا غير قابل للعزل.
- كل تعديل جديد يكون واضحًا: **أين + استبدال أم إضافة + الكود الكامل**.
- بعد كل batch ينتظر المساعد نتيجة المستخدم قبل الانتقال للذي بعده.

**الحالة الحالية: المشروع يعمل، والـmobile visual pass الأساسي مستقر حتى Batch 13.**