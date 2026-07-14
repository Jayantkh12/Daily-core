# DAILYCORE — Production-Ready Frontend

## 📁 Project Structure

''
Dailycore-v2/
├── frontend/
│   ├── index.html                    # Homepage
│   ├── public/
│   │   └── images/                   # All product & site images
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css              # Global design system (shared by all pages)
│   │   │   ├── home.css              # Homepage-specific styles
│   │   │   ├── products.css          # All product listing pages
│   │   │   ├── cart.css              # Cart page
│   │   │   ├── contact.css           # Contact page
│   │   │   ├── login.css             # Login/Register page
│   │   │   ├── policy.css            # All policy pages
│   │   │   └── product-details.css   # Product detail page
│   │   ├── js/
│   │   │   ├── api.js                # API service layer (swap JSON -> real API)
│   │   │   ├── cart.js               # Cart logic with localStorage
│   │   │   ├── products.js           # Dynamic product renderer
│   │   │   └── main.js               # Shared utilities (navbar, animations)
│   │   └── data/
│   │       └── products.json         # All 32 products (replace with DB later)
│   └── pages/
│       ├── categories.html, face.html, family.html, heart.html
│       ├── bestseller.html, newin.html, sale.html
│       ├── cart.html, contact.html, login.html
│       ├── checkout.html, product-details.html
│       └── refund-policy.html, privacy-policy.html,
│           shipping-policy.html, terms-and-conditions.html
├── backend/                          # Commented-out Node/Express skeleton
│   ├── server.js
│   ├── config/db.js
│   ├── models/Product.js, User.js, Order.js
│   ├── controllers/productController.js, authController.js
│   ├── routes/productRoutes.js, authRoutes.js, orderRoutes.js
│   └── middleware/authMiddleware.js
├── admin/                            # Admin dashboard skeleton
│   ├── dashboard/index.html
│   ├── products/index.html
│   ├── orders/index.html
│   ├── customers/index.html
│   └── settings/index.html
├── package.json
├── .env.example
└── .gitignore
''

## 🚀 Getting Started (Frontend only)

Open rontend/index.html directly in a browser, OR serve with any static server:

''ash
npx serve frontend
''

## 🔌 Backend Integration

1. Copy .env.example to .env and fill in your MongoDB URI + JWT secret
2. Run 
pm install
3. Uncomment code in ackend/ files
4. Update rontend/assets/js/api.js — replace JSON fetch with etch(API_BASE_URL + '/products')
5. Run 
pm run dev

## 🗂️ Adding Products

**Without backend:** Edit rontend/assets/data/products.json

**With backend:** POST to /api/products using the Admin Panel
