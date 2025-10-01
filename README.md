# 🍴 QuickBite

A full-stack food ordering application inspired by Swiggy, built with Spring Boot and Angular.

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17-red.svg)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Overview

QuickBite is a comprehensive food ordering platform that connects customers, restaurant owners, and administrators in a seamless ecosystem. The application provides role-based features for three types of users:

- **👤 Customers** - Browse restaurants, order food, track deliveries, and download invoices
- **🏪 Restaurant Owners** - Manage restaurants, menus, and customer orders
- **🛠️ Admins** - Approve restaurants and monitor platform analytics

## ✨ Features

### Customer Features
- 🔐 User registration and authentication
- 🍽️ Browse approved restaurants with detailed menus
- 🥗 Filter menu items (Veg/Non-Veg)
- 🛒 Shopping cart with quantity management
- 💳 Multiple payment options (Cash on Delivery / Demo Card)
- 📄 Automatic PDF invoice generation
- 📦 Real-time order tracking (`Placed → Preparing → Out for Delivery → Closed`)

### Owner Features
- 🏪 Restaurant registration with image upload
- 📝 Complete menu management (Add/Edit/Delete items)
- 🖼️ Image upload for menu items
- 📊 View and manage customer orders
- ✅ Update order status in real-time

### Admin Features
- ✔️ Approve or deny restaurant registrations
- 👥 View restaurant and owner details
- 📈 Analytics dashboard with insights
- 🎯 Platform management and monitoring

## 🛠️ Tech Stack

**Frontend**
- Angular (Standalone Components)
- Bootstrap 5
- jsPDF (Invoice Generation)
- TypeScript

**Backend**
- Spring Boot 3
- Spring Security (JWT Authentication)
- Spring Data JPA
- Maven

**Database**
- MySQL 8

**Storage**
- Local filesystem for image uploads

## 📁 Project Structure

```
quickbite/
├── backend/                          # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/quickbite/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── model/
│   │   │   │   ├── config/
│   │   │   │   └── security/
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   ├── uploads/                      # Image storage directory
│   └── pom.xml
│
├── frontend/                         # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── models/
│   │   ├── environments/
│   │   │   └── environment.ts
│   │   └── assets/
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)

### 1️⃣ Database Setup

Create a new MySQL database:

```sql
CREATE DATABASE quickbite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2️⃣ Backend Setup

Navigate to the backend directory and configure the database:

```bash
cd backend
```

Update `src/main/resources/application.yml` with your MySQL credentials:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/quickbite
    username: your_username
    password: your_password
```

Run the Spring Boot application:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

> 📁 Uploaded images will be stored in `./uploads/` and served at `http://localhost:8080/uploads/`

### 3️⃣ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Start the Angular development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

## 🔑 Authentication

QuickBite uses JWT-based authentication with role-based access control.

**Endpoints:**
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`

**Roles:**
- `CUSTOMER`
- `OWNER`
- `ADMIN`

JWT tokens are stored in LocalStorage and sent via `Authorization: Bearer <token>` header.

## 📡 API Endpoints

### Customer Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | List all approved restaurants |
| GET | `/api/restaurants/{id}/menu` | View restaurant menu |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/customer/{id}` | Get customer's orders |

### Owner Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/restaurants` | Register new restaurant |
| POST | `/api/restaurants/{id}/menu` | Add menu item |
| GET | `/api/orders/restaurant/{id}` | View restaurant orders |
| PUT | `/api/orders/{id}/status` | Update order status |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/pending-restaurants` | List pending approvals |
| POST | `/api/admin/restaurants/{id}/approve` | Approve restaurant |
| POST | `/api/admin/restaurants/{id}/deny` | Deny restaurant |

## 📸 Screenshots
1. <img width="1901" height="874" alt="qb1" src="https://github.com/user-attachments/assets/6c70209b-ceca-47d9-a509-751ffc17406a" />
2. <img width="1896" height="873" alt="qb2" src="https://github.com/user-attachments/assets/fce3d618-d057-47a9-aabf-35de2859623a" />
3. <img width="1887" height="873" alt="qb3" src="https://github.com/user-attachments/assets/0ab1c8ed-52c2-47c1-aea5-0827e8e1b845" />

## 🔄 Workflow

1. **Owner Registration** → Owner creates account and registers restaurant
2. **Admin Approval** → Admin reviews and approves/denies restaurant
3. **Menu Setup** → Owner adds menu items with images
4. **Customer Browse** → Customers explore approved restaurants
5. **Order Placement** → Customer adds items to cart and checks out
6. **Payment** → Choose COD or Demo Card payment
7. **Invoice Generation** → Automatic PDF invoice created
8. **Order Tracking** → Real-time status updates
9. **Delivery** → Owner updates status until order is closed

## 🐛 Troubleshooting

**Images not loading**
- Ensure frontend uses `environment.apiUrl + '/uploads/...'`
- Check backend uploads directory permissions

**Empty profile after login**
- Verify backend exposes `GET /api/users/{id}`
- Check JWT token is being sent correctly

**Rupee symbol garbled in PDF**
- Use `Rs` prefix or embed Unicode font in jsPDF configuration

**CORS errors**
- Verify backend CorsConfig allows `http://localhost:4200`
- Check browser console for specific CORS issues

**Database connection failed**
- Confirm MySQL service is running
- Verify credentials in `application.yml`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Author

- Your Name - [@ashishak117](https://github.com/ashishak117)

---

⭐ Star this repository if you find it helpful!
