<div align="center">

# 🧾 InvoiceFlow — Client

**Modern Invoice Details UI built with React 18 + TypeScript + Framer Motion**

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer&logoColor=white)

</div>

---

## ✨ Features

- 📋 **Invoice Details Page** — Header, line items table, totals, and payments section
- 💳 **Payment Recording** — Modal with validation (amount > 0, ≤ balance due)
- 📄 **PDF Download** — Server-generated professional invoice PDFs
- 📦 **Archive / Restore** — Soft-archive invoices with one click
- 🔐 **JWT Authentication** — Login & register with secure token management
- 💱 **Multi-Currency** — USD, EUR, GBP, INR with `Intl.NumberFormat`
- ⏰ **Overdue Detection** — Auto-highlights overdue invoices
- 🎨 **Glassmorphism UI** — Dark theme with smooth Framer Motion animations
- 📱 **Fully Responsive** — Mobile-first design with collapsible sidebar

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Backend server running ([assign-server](https://github.com/sunnythesunless/assign-server))

### Install & Run

```bash
git clone https://github.com/sunnythesunless/assign-client.git
cd assign-client
npm install
npm run dev
```

App starts at **http://localhost:5173**

### Demo Credentials
```
Email:    demo@invoice.app
Password: password123
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks & context |
| **TypeScript** | Type safety across all components |
| **Vite** | Lightning-fast dev server & build |
| **Framer Motion** | Page transitions, staggered lists, modal animations |
| **Axios** | API client with JWT interceptors |
| **React Router v6** | Client-side routing with nested layouts |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library (Feather Icons) |

---

## 📁 Project Structure

```
src/
├── api/                    # Axios instance + JWT interceptor
│   └── index.ts
├── components/             # Reusable UI components
│   ├── InvoiceHeader.tsx   # Invoice title, status, dates, actions
│   ├── LineItemsTable.tsx  # Line items with animated rows
│   ├── TotalsSection.tsx   # Subtotal → Tax → Total → Balance Due
│   ├── PaymentsSection.tsx # Payment list + Record Payment button
│   ├── PaymentModal.tsx    # Payment form with validation
│   └── Sidebar.tsx         # Invoice navigation + user info
├── context/
│   └── AuthContext.tsx     # Auth state, login/register/logout
├── hooks/
│   └── useInvoice.ts       # Data fetching + mutations
├── pages/
│   ├── AuthPage.tsx        # Login / Register with animations
│   ├── InvoiceDetailPage.tsx  # Main invoice view
│   ├── InvoiceLayout.tsx   # Layout with sidebar + outlet
│   └── WelcomePage.tsx     # Landing page
├── styles/
│   └── index.css           # Complete CSS design system
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   └── formatters.ts       # Currency, date, status formatters
├── App.tsx                 # Router + auth guard
└── main.tsx                # Entry point
```

---

## 🔗 Related

- **Backend API:** [assign-server](https://github.com/sunnythesunless/assign-server)

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/login` | Auth page with login/register toggle |
| `/invoices/:id` | Invoice details with all sections |

---

## 📜 License

MIT
