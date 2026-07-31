# Fit Zone+ — Athletic Fitness Tracker & Performance Platform

Fit Zone+ is a production-ready athletic fitness tracking web application built with Next.js 15 (App Router), React 19, TypeScript, Prisma ORM, Tailwind CSS, Framer Motion, Recharts, and a REST API Backend. Inspired by Strava's high-contrast athletic design system.

---

## 🚀 Main Features

1. **Authentication & User Management**: Email/Password Login, Google OAuth, Dynamic Username Sync, Password Reset, and Route Protection.
2. **Strava-Inspired Dashboard**: High-contrast dark carbon cards, active workout streak indicator, water intake log, and daily metric overview.
3. **Workout Routine Planner**: Generates structured 7-day workout routines based on age, height, weight, fitness goals, location, experience level, and available equipment. Printable schedule & PDF export supported.
4. **Diet & Macro Calculator**: BMR (Mifflin-St Jeor) & TDEE calculation, custom protein/carb/fat/fiber splits, and structured daily meal plans.
5. **BMI Calculator**: Body Mass Index score calculator, healthy weight targets, color indicators, and historical records.
6. **Progress Tracker**: Interactive body weight, body fat %, sleep hours, water liters, and mood logs with Recharts data visualization.
7. **Fitness Coach Assistant**: Interactive fitness assistant providing exercise guidance, nutrition advice, and recovery strategies.
8. **Exercise Library**: Searchable database categorized by muscle group, equipment, and difficulty with step-by-step instruction modals.
9. **Live Workout Logger**: Active workout stopwatch timer, set/rep tracker, calorie burn estimator, and session log history.
10. **Nutrition Tracker**: Meal logging with target calorie and macro progress indicators.
11. **Gamification & Leaderboard**: XP points system, level progression, unlockable achievement badges, daily athletic challenges, and global community leaderboard rankings.
12. **Analytics & Trends**: Trend graphs for weight, calories, workout volume, and fitness targets.
13. **Admin Telemetry**: User management table, system health telemetry, analytics widgets, and global announcement broadcaster.
14. **Settings & Shortcuts**: User profile, metric/imperial unit toggles, dark/light theme, notification preferences, and global `⌘K` / `Ctrl+K` Quick Command Launcher.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Charts & Visuals**: Recharts
- **Icons**: Lucide React
- **Validation**: React Hook Form + Zod
- **Database & ORM**: PostgreSQL / Supabase / Neon + Prisma ORM
- **Backend API**: Next.js App Router REST API Endpoints (`/api/auth`, `/api/workouts`, `/api/diet`, `/api/progress`, `/api/exercises`)

---

## 📂 Project Structure

```
ai-fitness-tracker/
├── app/
│   ├── (auth)/ (login, register, forgot-password)
│   ├── (dashboard)/ (dashboard, workout-planner, diet-calculator, bmi-calculator, etc.)
│   ├── api/ (Auth, Workouts, Diet, Progress, Exercises, Admin API routes)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/ (BrandLogo, Button, Input, Card, Modal, Badge, Progress, Toast, Tabs, Select, Skeleton)
│   ├── layout/ (Navbar, Sidebar, Footer, ThemeToggle)
│   ├── dashboard/ (WelcomeCard, StatsOverview, ActivityFeed, WaterTracker, StreakCard)
│   ├── ai/ (PlanGenerator, DietCalculatorForm, CoachChat)
│   ├── workout/ (WorkoutTimer, ExerciseCard)
│   ├── progress/ (MetricsForm, ProgressCharts)
│   ├── gamification/ (BadgeGrid, Leaderboard)
│   └── admin/ (UserManagementTable, AnalyticsWidget)
├── hooks/ (useAuth, useWorkoutStore, useProgressStore, useTheme)
├── lib/ (prisma.ts, ai.ts, utils.ts, constants.ts)
├── services/ (workoutService.ts, dietService.ts, progressService.ts, gamificationService.ts)
├── types/ (user.ts, workout.ts, diet.ts, progress.ts, gamification.ts)
├── utils/ (bmi.ts, macros.ts, formatting.ts)
├── prisma/ (schema.prisma)
├── middleware.ts
├── tailwind.config.ts
├── next.config.mjs
├── vercel.json
└── package.json
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fitzonetracker?schema=public"

# Auth
NEXTAUTH_SECRET="your-secret-key-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🏃 Running the Application Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Prisma ORM**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Start Development Server (Turbopack)**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub (`Gnanawilson/FitZone-`).
2. Import your GitHub repository into [Vercel](https://vercel.com).
3. Configure the environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`).
4. Set Build Command: `prisma generate && next build`.
5. Click **Deploy**.
