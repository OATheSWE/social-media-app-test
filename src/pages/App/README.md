
# Social Media Web & Mobile App (Expo + Tailwind + DaisyUI)

This project is a **responsive** and **animated social media application** built with **Expo** and **Tailwind CSS**, designed to work as both a **web app** and a **mobile app** from the same codebase with minimal adjustments.

## 🛠️ Technologies Used

- **Expo** (React Native for Web & Mobile)
- **Tailwind CSS** (Utility-first styling)
- **DaisyUI** (Tailwind CSS component library)
- **Framer Motion** (For smooth animations)
- **Context API + LocalStorage** (For state and data persistence)
- **JSON Server** (Mock API backend)

## 🧰 Installation

1. **Install pnpm**  
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the Expo web app**
   ```bash
   pnpm run web
   ```

4. **Install JSON Server globally**
   ```bash
   npm install -g json-server
   ```

5. **Run the mock API**
   ```bash
   json-server --watch src/api/db.json --port 3001
   ```

> Make sure the JSON Server is running before using any feature that relies on data fetching.

## ✨ Features Implemented

- ✅ **Onboarding Screens**  
- ✅ **Authentication System** (Login/Signup) using **Local Storage** & **Context API**
- ✅ **Home Feed** with posts and updates  
- ✅ **Influencer Profile** & **User Profile** pages  
- ✅ **Real-time Filtering** of content  
- ✅ **Dark/Light Theme Toggle**  
  - Theme state saved in Local Storage
  - Applied via Tailwind's `darkMode: 'class'` strategy  
- ✅ **Responsive Design** for web and mobile  
- ✅ **Animations & Transitions** using **Framer Motion**  
- ✅ **Error Handling** for failed requests and invalid inputs

## 📱 Platform Agnostic

This project was developed using **Expo**, allowing the codebase to run as:
- A full-fledged **Web Application**
- A **Mobile App** (Android/iOS) via Expo go or custom builds

> With a few tweaks (like image optimization and platform-specific components), the app can be deployed on both **web** and **mobile platforms**.

## 📬 Contact
For questions, feedback, or contributions, feel free to reach out.
