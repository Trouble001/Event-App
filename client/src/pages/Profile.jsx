import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Button from "../components/Button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import ChangePasswordModal from "../layouts/ChangePasswordModal";
import EditProfileModal from "../layouts/EditProfileModal";
import LoadingButton from "../components/LoadingButton";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const logoutStatus = useSelector((state) => state.auth.status.logout);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Toggle menu
  const handleToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 🔹 Redirect to login
  const handleLogin = () => {
    navigate("/login");
  };

  // 🔹 Open Edit Modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType("edit");
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  // 🔹 Open Change Password Modal
  const handleChangePassword = () => {
    setIsDropdownOpen(false);
    setModalType("password");
  };

  // 🔹 Close any modal
  const handleCloseModal = () => {
    setModalType(null);
    setIsDropdownOpen(false);
  };

  // 🔹 If not logged in
  if (!user) {
    return (
      <AppLayout>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-lg mx-auto glass p-6">
            <h2 className="text-2xl text-white font-semibold mb-1">
              Hello There!
            </h2>
            <h4 className="text-lg text-white/60 mb-2">
              Please login to see your profile
            </h4>
            <Button onClick={handleLogin} variant="primary">
              Login
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full max-w-lg mx-auto glass flex flex-col items-center justify-center pt-6 relative">
        
        <button
          onClick={handleToggle}
          className="text-white absolute right-4 top-4 cursor-pointer bg-inherit rounded-full p-2"
        >
          <EllipsisHorizontalIcon className="size-7" />
        </button>

        {isDropdownOpen && (
          <div className="glass w-40 p-2 text-white text-sm flex flex-col items-start absolute right-4 top-12 rounded-md">
            <button
              className="cursor-pointer w-full text-center hover:opacity-80"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        )}

        <div className="w-16 h-16 md:w-20 md:h-20 text-4xl text-white rounded-full bg-gray-400 flex items-center justify-center">
          {user?.full_name?.[0] || "U"}
        </div>

        <h2 className="text-xl md:text-3xl font-medium text-white mt-2">
          {user?.full_name}
        </h2>
        <p className="text-sm md:text-md text-white/80">{user?.email}</p>

        <div className="w-full max-w-xs flex flex-row items-center justify-center mt-4">
          <Button
            className="mr-2 text-sm"
            variant="primary"
            onClick={() => handleEdit(user)}
          >
            Edit
          </Button>

          <Button
            className="text-sm"
            variant="danger"
            disabled={logoutStatus === "loading"}
            onClick={handleLogout}
          >
            {logoutStatus === "loading" ? <LoadingButton /> : "Logout"}
          </Button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={modalType === "password"}
        onClose={handleCloseModal}
      />

      <EditProfileModal
        initialData={selectedUser}
        isOpen={modalType === "edit"}
        onClose={handleCloseModal}
      />
    </AppLayout>
  );
};

export default Profile;