PetNest is a feature-rich, full-stack e-commerce platform designed to deliver a seamless shopping experience for customers and a powerful, secure control panel for administrators. Built from the ground up, this project demonstrates a modern, production-grade web architecture, showcasing a deep understanding of full-stack development principles.

### [**🚀 Live Demo**](https://pet-nest-site.vercel.app/)

---

## ✨ Core Features

PetNest is architected with two primary users in mind: the customer and the administrator.

### 🛒 The Customer Experience: Fast, Intuitive, and Seamless
The user-facing site is engineered for speed and ease of use, ensuring a delightful shopping journey.

- **Dynamic & Engaging UI:** The homepage features dynamic content like sliders and featured products, all of which are directly manageable from the admin panel.
- **Advanced Product Discovery:** A powerful shop page allows users to instantly search and filter products by category and price range, providing a smooth, app-like feel.
- **Effortless Checkout Process:**
    - **Guest Checkout:** Users can place orders without the friction of creating an account.
    - **Order Tracking:** Both registered and guest users can easily track the status of their orders.
- **Secure Authentication:** Easy and secure login via Google OAuth, managed by NextAuth.js.
- **Personalized User Accounts:** Logged-in users have access to their complete order history and can manage their personal information and shipping addresses.

### 🔐 The Admin Panel: The Central Nervous System
The admin panel is the heart of the application, providing complete control over the entire e-commerce operation.

- **Secure, Role-Based Access Control (RBAC):**
    - The entire `/admin` route is protected by **Next.js Middleware**, which verifies a user's JSON Web Token (JWT) and role (`admin` or `staff`) on every request. Unauthorized users are immediately redirected.
- **Real-Time Analytics Dashboard:** A comprehensive dashboard provides an at-a-glance overview of key business metrics like total sales and pending orders, fetched directly from the database.
- **Complete Store Management:**
    - **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products, including complex variations and stock management. Products can be activated or deactivated on the live site with a single click.
    - **Order Management:** A centralized view to manage all incoming orders and update their statuses (e.g., Pending, Accepted, Completed).
    - **User Role Management:** Admins can view all registered users and dynamically assign roles (`user`, `staff`, `admin`), granting or revoking access to the admin panel.
- **Headless CMS-like Functionality:**
    - **Cloud-Based Image Handling:** Integrated with **Cloudinary** for seamless image uploads, optimization, and fast delivery via a global CDN.
    - **Dynamic Site Configuration:** The "Shop Setup" section allows admins to update site-wide content—such as the announcement bar, homepage video, and footer details—without touching a single line of code. Changes are reflected on the live site instantly.

---

## 🛠️ Technology & Architecture

This project is built on a modern, high-performance tech stack designed for scalability and maintainability.

- **Frontend:** **Next.js 14 (App Router)** & **React 18** for a hybrid rendering approach, and **Tailwind CSS** for a utility-first design system.
- **Backend:** **Next.js API Routes** and **NextAuth.js** for handling business logic and JWT-based authentication.
- **Database:** **MongoDB** with **Mongoose** for flexible and robust data modeling.
- **Image Management:** **Cloudinary API**.
- **Deployment:** Hosted on **Vercel** for optimal performance and continuous deployment.

The architecture leverages **React Server Components** for fast initial page loads and data fetching, while **Client Components** provide rich, interactive user experiences. This hybrid model ensures the application is both performant and highly functional.

---

## 🔮 Future Enhancements
- [ ] Integration of a full payment gateway like Stripe.
- [ ] A rich text editor for creating dynamic content pages (e.g., "About Us").
- [ ] A product review and rating system.
