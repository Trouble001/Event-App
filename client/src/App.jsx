import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./features/auth/authSlice";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ToastListener from "./components/ToastListener";
import Tab from "./components/Tab";
import Loader from "./layouts/Loader";

function App() {
  const dispatch = useDispatch();
  const { loading, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastListener />
      {loading && <Loader />}
      {!authChecked && <Loader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Tab />
    </BrowserRouter>
  );
}

export default App;