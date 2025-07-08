import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
