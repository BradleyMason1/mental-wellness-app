# 🧠 Mental Wellness App

A cross-platform mobile application designed to help users log their daily moods, gain weekly insights, and access curated mental health resources. Built by a 5-person team using Agile methodology and SDLC best practices.

---

## 🚀 Project Goals

- Empower users to track their emotional wellbeing.
- Promote mental health through accessible digital tools.
- Foster self-awareness via pattern recognition and summaries.

---

## 🧰 Technologies Used

- **Frontend**: React Native (Expo)
- **Backend**: Node.js or Firebase (Optional)
- **Database**: Firebase Firestore or mock SQL
- **Tools**: GitHub, Visual Studio Code, PowerShell/Terminal

---

## 👥 Team Members & Roles

| Name | Role | Responsibilities |
|------|------|------------------|
| Member 1 | Project Lead | DevOps, branching strategy, SDLC oversight |
| Member 2 | Frontend Dev | Screens, UI components |
| Member 3 | Frontend Dev | Mood tracking, weekly summary |
| Member 4 | Backend Dev | Data logic, mock APIs or Firebase integration |
| Member 5 | Documentation | Requirements, sprints, diagrams, README updates |

---

## 🗂️ Folder Structure

| Folder / File           | Purpose |
|-------------------------|---------|
| `frontend/`             | Mobile app source code |
| └── `assets/`           | Images, icons, background media |
| └── `components/`       | Reusable UI components (e.g. MoodSlider) |
| └── `screens/`          | Full screen views (e.g. LoginScreen, MoodLogScreen) |
| └── `utils/`            | Helper functions like formatting, validation |
| └── `App.js`            | Entry point of the React Native app |
| `backend/`              | Optional: mock API or Node server code |
| └── `server.js`         | Express or Firebase handler |
| `database/`             | Schema definitions, rules, mock data |
| └── `schema.sql`        | SQL or structured NoSQL schema |
| `docs/`                 | Agile docs, requirements, diagrams |
| └── `requirements.md`   | Functional + Non-functional specs (FR1–FR5, NFR1–NFR3) |
| `.gitignore`            | Prevents Git from tracking unwanted files |
| `README.md`             | This file: explains everything |

---

## 📦 Features

- ✅ Secure user registration and login (FR1)
- ✅ Email format and password length validation on login and registration screenss
- ✅ Daily mood logging with optional notes (FR2)
- ✅ Curated resource library with categories (FR3)
- ✅ Weekly mood summary graph/report (FR4)
- ✅ Customizable daily reminder notifications (FR5)

---

## 🧪 Agile + SDLC

- There is a tests folder made wiith .md files made for reporting of testing that was done for each section. THESE MESSAGES ARE TO BE MADE IN YOUR OWN BRANCH 

---

## 📌 Setup Instructions

1. Clone the repo:
   ```bash
git clone https://github.com/BradleyMason1/mental-wellness-app.git
cd mental-wellness-app

   git checkout feature/frX-your-assigned-branch  'For Example: git checkout feature/fr4-mood-summary'
   
   'After running this you should see: 
   Switched to branch feature/fr4-mood-summary'

   'This means you are in your working branch and anything you do such as git add ., or git commit -m "Your commit message", or git push will be pushed to your branch '


  git fetch --all (if anything is new it will let you know)

2. Install backend dependencies and start the server locally:
   ```bash
   cd backend
   npm install
   npm start
   ```

   User accounts will be stored in `database/db.json` so they persist between
   restarts. On login, the server returns a JSON Web Token that can be used with
   the protected `/profile` endpoint.

## 👥 Branch Assignments & Responsibilities

| Branch                       | Feature               | Responsible For                                                                         | Team Member      |
| ---------------------------- | --------------------- | --------------------------------------------------------------------------------------- | ---------------- |
| `feature/fr1-authentication` | Login + Registration  | UI forms (email, password), form validation, error messages, API hookup                 | *\[Bradley Mason]* |
| `feature/fr2-mood-logging`   | Daily Mood Tracker    | Mood selection UI (emoji/slider), note input box, save button, storage                  | *\[Insert Name]* |
| `feature/fr3-resources`      | Resource Center       | UI for listing articles/videos, filters/search bar, handling broken links               | *\[Insert Name]* |
| `feature/fr4-mood-summary`   | Weekly Mood Summary   | Graph/chart UI, "no data" states, mood trend visualizations                             | *\[Insert Name]* |
| `feature/fr5-reminders`      | Notification Settings | UI for time picker, toggle switches, saving reminder settings, triggering notifications | *\[Insert Name]* |


