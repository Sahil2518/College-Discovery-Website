# College Discovery Platform MVP

A modern, fast, and robust platform for college discovery, comparison, and decision-making. Built with the full PERN-like stack (PostgreSQL, Express, Next.js, Node.js).

## System Improvements Over Existing Platforms (Shiksha, CollegeDunia)

1. **Zero Clutter UI**: No invasive popups, ad banners, or lead-gen forms blocking the experience. The interface uses modern glassmorphism and subtle gradients (designed to wow the user).
2. **Unified Data View**: Instead of scattering data across 10 different tabs, the most important information (fees, placements, cutoff, rating) is surfaced immediately in the College Details and Compare tools.
3. **Structured Comparison**: A dedicated comparison engine allowing side-by-side evaluation of up to 3 colleges across 12 granular metrics.
4. **Performance**: Uses React Query caching, debounced search, and server-side pagination to ensure instant filtering and rendering without N+1 query bottlenecks.
5. **Mobile-First Responsive Design**: Works seamlessly on mobile devices unlike older monolithic portal websites.

## Architecture & Data Model

The database is built on PostgreSQL with **Prisma ORM**, consisting of 12 highly optimized relational tables (Colleges, Courses, Exams, Placements, Reviews, Saved, Articles, Rankings) with proper indexing for rapid search and filtering.

The Backend uses **Express + TypeScript** with layered Clean Architecture (Routes → Controllers → Services → Repositories), ensuring high testability and separation of concerns.
The Frontend is built using **Next.js 14 App Router** + vanilla CSS, leveraging modern layout components and Server Side/Client Side separation where appropriate.

## Local Setup Instructions

### 1. Database
The system uses a Supabase PostgreSQL instance. Environment variables are pre-configured in `.env` and `.env.local` files using the provided connection string.

### 2. Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push --force-reset
npx ts-node src/prisma/seed.ts
npm run dev
```
The API will start at `http://localhost:4000`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
The App will start at `http://localhost:3000`

## Deployment

### Frontend (Vercel)
1. Import the `frontend` folder to Vercel.
2. Vercel will automatically detect Next.js.
3. Set Environment Variable: `NEXT_PUBLIC_API_URL` pointing to your deployed backend.

### Backend (Render / Railway)
1. Import the `backend` folder to Render/Railway.
2. Build command: `npm install && npx prisma generate && npm run build`
3. Start command: `npm start`
4. Set Environment Variables: `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `FRONTEND_URL`.

## Demo Account
You can log into the saved colleges dashboard using the demo user created during database seeding:
- **Email**: `rahul@example.com`
- **Password**: `password123`
