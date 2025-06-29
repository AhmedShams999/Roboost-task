# 🛍️ Frontend Angular E-commerce Application

This repository contains a simple e-commerce application built with Angular. It showcases modern Angular development practices, including:

- State management with **Signals**
- Asynchronous operations using **RxJS Observables**
- Data transformation with **Pipes**
- Route protection using **Guards**
- Robust **multilingual support**

The app strictly follows the provided Figma design and integrates with the [DummyJSON API](https://dummyjson.com/) for product, authentication, cart, and user data.

---

## 📚 Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Key Angular Concepts Implemented](#key-angular-concepts-implemented)
- [Multilingual Support](#multilingual-support)
- [API Integration](#api-integration)
- [Authentication & Data Management](#authentication--data-management)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Assumptions Made](#assumptions-made)
- [Unit Tests](#unit-tests)
- [Development Progress](#development-progress)

---

## ✨ Features

### 👤 User Management

- **Login Page:** Email/password authentication, form validation, "Remember me", error handling, redirection.
- **Registration Page:** User signup with validation and redirection.

### 🛒 Product Browsing

- **Home Page:** Navigation, featured products, categories, footer, authentication status.
- **Product List Page:** Grid view, filters (category, price, rating), pagination/infinite scroll, search, sort.
- **Product Details Page:** Gallery, description, availability, related products, "Add to Cart".

### 🛍️ Shopping Cart

- **Cart Page:** Adjust quantity, remove items, calculate total, checkout/continue shopping links.

### 🌐 Multilingual Support

- English (en-US) & Arabic (ar) with proper RTL layout for Arabic.

---

## 🧰 Technical Stack

- **Framework:** Angular (latest stable)
- **Language:** TypeScript
- **Reactive Programming:** RxJS
- **State Management:** Angular Signals
- **Forms:** Reactive Forms
- **Styling:** CSS
- **API:** [DummyJSON](https://dummyjson.com/)

---

## 🔑 Key Angular Concepts Implemented

- **Signals:** Reactive state management with derived signals.
- **Observables:** Async handling with RxJS; uses `map`, `filter`, `switchMap`, etc.
- **Pipes:** Custom and built-in pipes (e.g., currency, filtering).
- **Guards:** `AuthGuard` using `CanActivate` and `CanDeactivate`.
- **Services:** Modular services for data/auth/cart handling via `HttpClient`.
- **Reactive Forms:** Robust forms with `FormGroup`, `FormControl`, validators.
- **Component Architecture:** Clear hierarchy with `@Input`, `@Output`, and services.

---

## 🌍 Multilingual Support

- **Locale-specific Builds:** Served from `/ar/` and `/en-US/`.
- **Language Switcher:** Reloads localized version.
- **RTL Layout:** Arabic UI adapts layout accordingly.
- **Translations:** Managed using Angular i18n (`.xlf`).
- **User Preference:** Language stored in `localStorage`.

---

## 🔗 API Integration

All data operations are integrated with [DummyJSON API](https://dummyjson.com/docs/):

- **Products API:** `/products`
- **Auth API:** `/auth`
- **Carts API:** `/carts`
- **Users API:** `/users`

**Features:**

- Robust error handling.
- Caching for performance.
- Strong typing with TypeScript interfaces.

---

## 🔐 Authentication & Data Management

- **Auth Service:** Login, registration, logout.
- **Route Guards:** Protect sensitive routes like Cart/Checkout.
- **Auth State:** Managed using Signals.
- **Token Expiry:** Simulated with timeout.
- **Persistence:** Stored in `localStorage`.
- **Data Flow:** Efficient use of Signals + Observables.

---

## ⚙️ Setup Instructions

### 📦 Prerequisites

- [Node.js (LTS)](https://nodejs.org/)
- npm or Yarn
- Angular CLI:

```bash
npm install -g @angular/cli
````

### 📁 Clone the Repository

```bash
git clone <your-repository-url>
cd Roboost-Task
```

### 📥 Install Dependencies

```bash
npm install
# or
# yarn install
```

---

## 🚀 Running the Application

### 🔧 Development Mode

#### English (en-US):

```bash
ng serve --configuration=development --localize=en-US
```

> Access at: `http://localhost:4200/en-US/`

#### Arabic (ar):

```bash
ng serve --configuration=development --localize=ar
```

> Access at: `http://localhost:4200/ar/`

---

## 📦 Building for Production

```bash
ng build --configuration=production --localize
```

> Output: `dist/roboost-task/browser/`
> Includes: `en-US/`, `ar/` folders

---

## 🌐 Serving Production Build Locally

Install `http-server` if not already:

```bash
npm install -g http-server
```

Then serve the app:

```bash
http-server dist/roboost-task/browser/ --cache -1
```

> Access:
>
> * English: `http://localhost:8080/en-US/`
> * Arabic: `http://localhost:8080/ar/`

---

## ✅ Assumptions Made

* DummyJSON APIs are accessible.
* Figma design assets are available or replaced with placeholders.
* Modern browser support is assumed.

---

## 🧪 Unit Tests

Unit tests implemented for one component and one service.

Run tests:

```bash
ng test
```

---

## 📈 Development Progress

Consistent commits are maintained for clear progress tracking and implementation history.

---

> Made with ❤️ using Angular

```

---

Let me know if you want to include **badges**, a **live demo link**, or screenshots to enhance this [README](f).
```
