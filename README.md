# LEAVEASE: Employee Leave Management System

## 🚀 Overview

**LEAVEASE** is a modern, responsive, and secure application designed to simplify the entire employee leave management process. It aims to reduce administrative overhead for HR and managers while providing employees with an easy-to-use platform for requesting and tracking their time off.

## ✨ Key Features

* **Role-Based Access:** Separate interfaces for Employees, Managers, and HR/Admins.
* **Leave Request Submission:** Employees can easily request various types of leave (e.g., vacation, sick, personal).
* **Approval Workflow:** Managers receive instant notifications and can approve or reject leave requests.
* **Leave Balance Tracking:** Automated tracking and calculation of available, used, and pending leave days.
* **Calendar View:** A centralized calendar showing approved time off for better team planning.
* **Reporting & Analytics:** HR/Admins can generate reports on leave patterns and utilization.

---

## 🛠️ Tech Stack

This project leverages the power of the T3 Stack/full-stack JavaScript ecosystem for a robust and type-safe application.

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js** (React) | Full-stack framework for rendering and routing. |
| **Language** | **TypeScript** | Ensures type safety across the application. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **Database ORM** | **Prisma** | Database toolkit for efficient and type-safe data access. |
| **Authentication** | **NextAuth.js** (Inferred) | Handles secure authentication and session management. |

---

## 💻 Getting Started

Follow these steps to set up and run the LEAVEASE application locally.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18+)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
* A running database instance (e.g., PostgreSQL, MySQL, SQLite).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Amandf/LEAVEASE.git](https://github.com/Amandf/LEAVEASE.git)
    cd LEAVEASE
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and configure your environment.

    ```
    # Database URL
    # Example: postgresql://user:password@host:port/database_name
    DATABASE_URL="YOUR_DATABASE_CONNECTION_STRING" 

    # NextAuth (Authentication) Configuration
    NEXTAUTH_SECRET="A_LONG_AND_RANDOM_SECRET_STRING_FOR_AUTH"
    NEXTAUTH_URL="http://localhost:3000"
    ```
    *Replace the placeholder values with your specific configuration.*

4.  **Database Setup (Prisma):**

    a. **Apply Migrations:** Run the migration command to create the database schema defined in `prisma/schema.prisma`.
    ```bash
    npx prisma migrate dev --name init
    ```

    b. **Generate Prisma Client:** Ensure the Prisma Client is generated to interact with the database.
    ```bash
    npx prisma generate
    ```

### 🏃 Running the Application

Start the development server:

```bash
npm run dev
# or
# yarn dev
