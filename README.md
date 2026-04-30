# iEducation Mobile App

A beautiful mobile-first web application for **iEducation** – an online learning platform for Bangladeshi students preparing for Admission, HSC, SSC, Class 8 and lower classes. Built with **Next.js 14**, **TailwindCSS** and **lucide-react**.

The UI is designed as a phone-style interface that fills the screen on real mobile devices and is shown inside a phone frame on larger screens, so it feels exactly like a native app.

## ✨ Features

### Home
- Welcome header with notifications
- Auto-rotating offers carousel (ongoing offers)
- Stats grid: Active students, Live courses, Success rate, Video lectures
- Subject selector: Admission, HSC, SSC, Class 8, Class 1-7
- Course tabs: **All / FBC 26 / 2nd Time / Special**
- Popular courses (horizontal scroll)
- Our Published Books preview
- Chance to Learn Free section
- Best Teachers preview
- Daily learning streak banner

### Courses
- Quick filter chips (All, FBC 26, 2nd Time, Special)
- Subject-level filter (Admission, HSC, SSC, Class 8, Class 1-7)
- Detailed list view with rating, students, duration, price

### Books
- Featured book hero card
- Browse by category
- Full grid of published books
- Bestsellers list view

### Free
- Free Lecture Sheets (with PDF download buttons)
- Free Video Classes
- Weekly Quiz with leaderboard CTA
- Meet our experienced teachers

### Profile
- Profile card with avatar, level, streak, XP
- Account info: Profile, Email, Phone
- Edit Profile (modal form)
- Preferences: Notifications, Dark mode, Language, Payment
- Support: Privacy Policy, Change Password, Help
- **Logout** with confirmation dialog
- **Delete Account** with type-to-confirm protection

### Bottom navigation
Five tabs: Home, Courses, Books, Free, Profile.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Resize the window or use device toolbar in DevTools to preview the mobile experience.

## 🧱 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TailwindCSS 3**
- **lucide-react** (icons)

## 📁 Project Structure

```
app/
  layout.jsx        # Root layout, fonts, metadata
  page.jsx          # Server entry that renders <MobileApp />
  globals.css       # Tailwind + custom utilities
components/
  MobileApp.jsx     # Phone shell + bottom nav + screen routing
  data.js           # Mock data (offers, courses, books, teachers, user)
  screens/
    HomeScreen.jsx
    CoursesScreen.jsx
    BooksScreen.jsx
    ProfileScreen.jsx
  ui/
    Header.jsx
    SectionTitle.jsx
    CourseCard.jsx
    BookCard.jsx
    TeacherCard.jsx
```

## 📝 Notes

- All data is mocked in `components/data.js`. Replace with a real API when ready.
- The app uses gradient backgrounds + emojis instead of images so it loads instantly with no external assets.
- Bengali numerals are used in the stats grid; replace if you prefer English numerals.

## 📦 Build for production

```bash
npm run build
npm start
```
# i-edu-app-demo
