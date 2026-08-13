import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Gate from "./pages/Gate";
import DepartmentWelcome from "./pages/DepartmentWelcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import "./App.css";

// Wraps login/register so a successful login routes through the welcome screen once
const LoginWithWelcome = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/welcome" replace />;
  return <Login />;
};

const RegisterWithWelcome = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/welcome" replace />;
  return <Register />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/welcome" element={<DepartmentWelcome />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginWithWelcome />} />
      <Route path="/register" element={<RegisterWithWelcome />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route
        path="/create-event"
        element={
          <ProtectedRoute roles={["faculty", "admin"]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events"
        element={
          <ProtectedRoute roles={["student"]}>
            <MyEvents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  const [gateOpen, setGateOpen] = useState(false);

  if (!gateOpen) {
    return <Gate onOpen={() => setGateOpen(true)} />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
