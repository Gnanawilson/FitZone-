# Fit Zone+ — Premium AI Fitness Tracker & SaaS Platform

FitPulse AI is a production-ready AI Fitness Tracker web application built with Next.js 15 (App Router), React 19, TypeScript, Prisma ORM, Tailwind CSS, Framer Motion, Recharts, and Google Gemini AI.

---

## 🚀 Main Features

1. **Authentication**: Email/Password Login, Google OAuth, Password Reset, Route Protection Middleware.
2. **Dashboard**: Strava/Heavy inspired welcome card, daily calorie burn, active workout streak, water intake tracker, and motivational quote widget.
3. **AI Workout Planner**: Generates structured 7-day workout plans based on age, gender, height, weight, goal, location, experience, days/week, and equipment. Download PDF / Printable view supported.
4. **AI Diet & Macro Calculator**: BMR (Mifflin-St Jeor) & TDEE calculation, protein/carb/fat/fiber splits, and AI meal recommendations (Breakfast, Lunch, Dinner, Snacks).
5. **BMI Calculator**: Score calculator, healthy weight range, target suggestions, color indicators, and historical records.
6. **Progress Tracker**: Interactive weight, body fat %, sleep hours, water liters, and mood logs with Recharts visualization.
7. **24/7 AI Fitness Coach**: Real-time AI chat assistant providing exercise explanation, nutrition advice, and recovery guidance.
8. **Exercise Library**: Searchable and filterable database categorized by muscle group, equipment, and difficulty with step-by-step instruction modals.
9. **Live Workout Logger**: Active workout timer, set/rep counter, calories burned estimator, and session log history.
10. **Nutrition Tracker**: Food item logger with meal breakdown and target calorie/protein progress.
11. **Gamification**: XP points system, level progression, unlockable achievement badges, daily challenges, and global leaderboard rankings.
12. **Analytics**: Trend graphs for weight, calories, workout volume, and goal progress.
13. **Admin Dashboard**: User management table, system health telemetry, analytics widgets, and global announcement broadcaster.
14. **Settings**: User profile, metric/imperial unit toggles, dark/light theme, and notification preferences.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Validation**: React Hook Form + Zod
- **Database & ORM**: PostgreSQL / Supabase / Neon + Prisma ORM
- **AI Model**: Google Gemini API (`@google/genai`)

---

## 📂 Project Structure

```
ai-fitness-tracker/
├── app/
│   ├── (auth)/ (login, register, forgot-password)
│   ├── (dashboard)/ (dashboard, workout-planner, diet-calculator, bmi-calculator, etc.)
│   ├── api/ (AI API routes, Auth, Exercises, Nutrition, Admin)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/ (Button, Input, Card, Modal, Badge, Progress, Toast, Tabs, Select, Skeleton)
│   ├── layout/ (Navbar, Sidebar, Footer, ThemeToggle)
│   ├── dashboard/ (WelcomeCard, StatsOverview, ActivityFeed, WaterTracker, StreakCard)
│   ├── ai/ (PlanGenerator, DietCalculatorForm, CoachChat)
│   ├── workout/ (WorkoutTimer, ExerciseCard)
│   ├── progress/ (MetricsForm, ProgressCharts)
│   ├── gamification/ (BadgeGrid, Leaderboard)
│   └── admin/ (UserManagementTable, AnalyticsWidget)
├── hooks/ (useAuth, useWorkoutStore, useProgressStore, useTheme)
├── lib/ (prisma.ts, ai.ts, utils.ts, constants.ts)
├── services/ (workoutService.ts, dietService.ts, progressService.ts, aiService.ts, gamificationService.ts)
├── types/ (user.ts, workout.ts, diet.ts, progress.ts, gamification.ts)
├── utils/ (bmi.ts, macros.ts, formatting.ts)
├── prisma/ (schema.prisma)
├── middleware.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/aifitnesstracker?schema=public"

# Auth
NEXTAUTH_SECRET="your-secret-key-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"

# AI Integration
GEMINI_API_KEY="your-gemini-api-key"
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

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. Import your GitHub repository into [Vercel](https://vercel.com).
3. Configure the environment variables (`DATABASE_URL`, `GEMINI_API_KEY`, `NEXTAUTH_SECRET`).
4. Set Build Command: `npx prisma generate && next build`.
5. Click **Deploy**.

---

## 📜 Git Commit Message Standards

```
feat(auth): Added Clerk & NextAuth Authentication
feat(ai): Added AI Workout Planner & PDF Exporter
feat(diet): Added AI Macro & Diet Calculator
feat(progress): Added Recharts Dashboard & Analytics
feat(gamification): Added XP, Leveling, Badges & Leaderboard
```
