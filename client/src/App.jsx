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
import Spinner from "./layouts/Spinner";
import EditProfile from "./pages/EditProfile";
import Dasboard from "./pages/Dasboard";
import UserDetail from "./pages/UserDetail";
import SlideGroups from "./pages/SlideGroups";
import Slides from "./pages/Slides";
import Users from "./pages/Users";
import SlidesDetail from "./pages/SlidesDetails";
import Setting from "./pages/Setting";

function App() {
  const dispatch = useDispatch();
  const { authChecked } = useSelector((state) => state.auth);
  // const { adminLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastListener />
      {/* {loading && <Loader />}
      {adminLoading && <Loader />} */}
      {!authChecked && <Spinner />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/slide-groups/slides/:slug" element={<SlidesDetail />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="dashboard/slide-groups" element={<SlideGroups />} />
        <Route path="/slides/:slug" element={<Slides />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
      <Tab />
    </BrowserRouter>
  );
}

export default App;
