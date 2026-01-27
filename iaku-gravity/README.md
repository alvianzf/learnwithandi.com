
# IAKU-Gravity (Alumni Database)

A full-stack application for managing alumni data for Ikatan Alumni Kimia Unpad (IAKU). This application features a public search portal with privacy redaction, data statistics, and an admin dashboard for data management.

## Features

- **Public Search**: Real-time alumni search with privacy protection (redacted names and phone numbers).
- **Statistics**: Visual breakdown of alumni by sector and graduation year.
- **Admin Dashboard**:
  - **CSV Import**: Bulk import alumni data with fuzzy header matching.
  - **User Management**: Manage admin access, edit usernames, and promote/demote users.
  - **Individual Registration**: Manually register new alumni.
- **Security**:
  - **Authentication**: JWT-based session management (HttpOnly Cookies).
  - **Password Hashing**: Secure password storage using bcrypt.
  - **Role-Based Access**: Separation of Admin and User privileges.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Containerization**: Docker & Docker Compose

## Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) (v18+ recommended) for local development

## Setup & Installation

### 1. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and fill in your secure specific values. **Do not commit this file.**
   ```env
   DATABASE_URL="postgresql://postgres:postgres@db:5432/iaku_db" # Use @db:5432 for Docker, @localhost:5433 for local
   JWT_SECRET="<your_secure_random_string>"
   ADMIN_PASSWORD="<your_admin_password>"
   ```

### 2. Running with Docker (Recommended for Production/Preview)

This will start the database and the application. The app will be accessible on port 80.

```bash
docker-compose up -d --build
```

Access the application at: **http://localhost**

### 3. Running Locally (Development)

If you want to run the application code locally but the database in Docker:

1. Start the database only:
   ```bash
   docker-compose up -d db
   ```
   *Note: Ensure your `.env` uses `localhost:5433` (or mapped port) for `DATABASE_URL`.*

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run migrations and seed:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

Access the application at: **http://localhost:3000**

## Initial Setup (Admin User)

The application comes with a built-in setup/seed feature to ensure an admin user exists.

1. If you ran `npx prisma db seed`, the admin is already created with the password from your `.env`.
2. Alternatively, visit the setup route to safely ensure the admin exists:
   - Docker: `http://localhost/api/setup`
   - Local: `http://localhost:3000/api/setup`

**Default Credentials** (if unchanged in .env):
- **Username**: `admin`
- **Password**: *Check your .env file*

## Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components.
- `/lib`: Utility functions, Prisma client, and Auth helpers.
- `/prisma`: Database schema and seed scripts.
