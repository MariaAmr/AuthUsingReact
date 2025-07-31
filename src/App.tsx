import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { Dashboard } from "./dashboard/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./forgot-password-page/forgot-password-page";
import NotFoundPage from "./error/error";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
