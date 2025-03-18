# 🏎️ Async-Race

🏆 Score: 400/400

P.S. There are differences in the conditions for displaying the finish banner between the task requirements and the checklist.
The requirement states: "The banner is shown at the end of the race if there is a winner."
The checklist states: "After any car finishes."
The implemented solution is based on the requirement, meaning "The banner is shown at the end of the race if there is a winner." In my opinion, this is a more complex condition to implement.

🔗 [Async-Race deploy](https://async-race-n1ta.onrender.com)

## 💻 Local development

The deployed app interacts with the deployed server.  
However, if you want to run the application locally or any of its parts, you can do so by cloning the necessary repository and setting up your environment variables as dependencies.

### Client side

> Get the code

```bash
git clone https://github.com/chkvdm/async-race
cd async-race
```

> Install all package and requiremets.

```bash
npm install
```

> Start the app

```bash
npm run dev
```

### server side

> Get the code

```bash
git clone https://github.com/mikhama/async-race-api
cd async-race-api
```

> Install all package and requiremets.

```bash
npm install
```

> Start the app

```bash
npm run start
```

## 📄 Project Description

🏎 Car Race Management SPA

This repository contains a Single Page Application (SPA) for managing a car collection, controlling engine states, and tracking race statistics.

🟢 Features:

- Two main views: Garage (manage cars) & Winners (race results).
- Persistent UI state: Keeps user inputs and pagination intact.
- Garage functionalities: Create, edit, delete cars, start/stop races, and generate random cars.
- Race mechanics: Animated car races with start/stop controls and a winner banner.
- Winners table: Displays top racers with wins and best times.
- Adaptive design: Works smoothly on screens down to 500px.

## 📚 Technologies used

- **[React](https://react.dev/)** - The library for web and native user interfaces.
- **[Redux](https://redux.js.org/)** - A JS library for predictable and maintainable global state management.
- **[TypeScript](https://www.typescriptlang.org/)** - Is a strongly typed programming language that builds on JavaScript.
- **[Node.js](https://nodejs.org/en/)** - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- And other requirements which are in the package.json file.

## 📋 Checklist 400/400

### 🚀 UI Deployment

- [x] **Deployment Platform:** Successfully deploy the UI on one of the following
      platforms: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.

### ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** All commits follow the specified commit
      guidelines.
- [x] **Checklist included in README.md:** Project checklist included in README.md with
      implemented features marked.
- [x] **Score calculation:** Score calculated and placed at the top of README.md.
- [x] **UI Deployment link in README.md**: Link to deployed UI placed at the top of
      README.md.

### 🏗️ Basic Structure (80 points)

- [x] **Two Views (10 points):** Implement two primary views: "Garage" and "Winners".
- [x] **Garage View Content (30 points):** The "Garage" view displays required content.
- [x] **Winners View Content (10 points):** The "Winners" view displays required content.
- [x] **Persistent State (30 points):** View state remains consistent when navigating
      between views.

### 🏠 Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Users can create,
      update, and delete cars.
- [x] **Color Selection (10 points):** Color selection from an RGB palette implemented.
- [x] **Random Car Creation (20 points):** Button to create random cars implemented.
- [x] **Car Management Buttons (10 points):** Buttons for updating and deleting cars
      provided.
- [x] **Pagination (10 points):** Pagination for the "Garage" view implemented.
- [x] **EXTRA POINTS (20 points):**
  - [x] **Empty Garage** Empty garage handled with user-friendly message.
  - [x] **Empty Garage Page** Last car removal moves user to previous page.

### 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** Winners displayed in the "Winners view" table.
- [x] **Pagination for Winners (10 points):** Pagination for the "Winners" view
      implemented.
- [x] **Winners Table (15 points):** Winners table includes required columns and
      functionality.
- [x] **Sorting Functionality (10 points):** Table sorting by wins and best time
      implemented.

### 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** Start engine animation implemented
      correctly.
- [x] **Stop Engine Animation (20 points):** Stop engine animation implemented correctly.
- [x] **Responsive Animation (30 points):** Car animations are fluid and responsive on
      small screens.
- [x] **Start Race Button (10 points):** Start race button functionality implemented.
- [x] **Reset Race Button (15 points):** Reset race button functionality implemented.
- [x] **Winner Announcement (5 points):** Winner announcement message implemented.
- [x] **Button States (20 points):** Correct button states implemented during races.
- [x] **Actions during the race (50 points):** Control over actions during a running race
      implemented.

### 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** Prettier correctly set up with required scripts.
- [x] **ESLint Configuration (5 points):** ESLint configured with Airbnb style guide and
      required script.

## License

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](https://opensource.org/licenses/MIT)
