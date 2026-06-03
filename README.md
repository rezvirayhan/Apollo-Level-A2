# DevPulse – Internal Tech Issue & Feature Tracker

**DevPulse** is a robust, collaborative platform designed for software development teams to efficiently report bugs, suggest new features, and coordinate workflow resolutions. Built strictly with Node.js, TypeScript, Express, and PostgreSQL using raw SQL queries to ensure maximum control and performance.

*   **Live Application URL:** [https://assesment-2-ten.vercel.app/](https://assesment-2-ten.vercel.app/)
*   **GitHub Repository:** [https://github.com/rezvirayhan/Apollo-Level-A2](https://github.com/rezvirayhan/Apollo-Level-A2)

---

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Two distinct roles (`contributor` and `maintainer`) with granular workflow permissions.
*   **Secure Authentication:** JWT-based authentication system utilizing `bcrypt` for secure password hashing (8-12 salt rounds).
*   **Issue Management Workflow:** Create, read, and dynamically update issue states (`open`, `in_progress`, `resolved`).
*   **Safe Contributor Protections:** Contributors can only modify their own reported issues and only while the issue status remains `open`.
*   **Raw SQL Integrity:** Implements native database pooling and strict application-level data validations without reliance on heavy ORMs or SQL JOINs.
*   **Dynamic Searching & Filtering:** Comprehensive query string support for sorting (`newest`, `oldest`) and filtering by issue `type` or `status`.

---

## 🛠️ Tech Stack

*   **Runtime Environment:** Node.js (LTS v24.x or higher)
*   **Language:** TypeScript (Strict configurations, zero `any` usage)
*   **Backend Framework:** Express.js (Modular router architecture)
*   **Database:** PostgreSQL (Native `pg` driver with dynamic `pool.query()`)
*   **Security & Encryption:** `bcrypt`, `jsonwebtoken`
*   **Utility & Formatting:** `http-status-codes`

---

## 🗄️ Database Schema Summary

The database utilizes two main structural tables, managed completely using Raw SQL and application-level business logic constraints:

### 1. `users` Table
| Field | Data Type | Constraints & Requirements |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key, Auto-incrementing |
| `name` | VARCHAR | Required, Full display name |
| `email` | VARCHAR | Required, Unique, Valid login address |
| `password` | VARCHAR | Required, Securely hashed string (Never exposed) |
| `role` | VARCHAR | Defaults to `contributor`. Must be `contributor` or `maintainer` |
| `created_at` | TIMESTAMP | Automatically generated on insert |
| `updated_at` | TIMESTAMP | Automatically refreshed on update |

### 2. `issues` Table
| Field | Data Type | Constraints & Requirements |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key, Auto-incrementing |
| `title` | VARCHAR(150) | Required, Max 150 characters |
| `description` | TEXT | Required, Min 20 characters |
| `type` | VARCHAR | Must be either `bug` or `feature_request` |
| `status` | VARCHAR | Defaults to `open`. Options: `open`, `in_progress`, `resolved` |
| `reporter_id` | INT | References `users.id` (Validated in application logic) |
| `created_at` | TIMESTAMP | Automatically generated on insert |
| `updated_at` | TIMESTAMP | Automatically refreshed on update |

---

