import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Button from "../components/Button";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import ProfileModal from "../layouts/ProfileModal";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleLogin = () => {
    navigate("/login");
  }

  const handleEdit = () => {
    navigate("/edit-profile");
  }

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/profile");
  };

  const handleChangePassword = () => {
    setOpenModal(true);
  };


  if (!user) {
    return (
      <AppLayout>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10/12 md:w-8/12 lg:w-5/12 mx-auto glass p-6">
            <h2 className="text-2xl text-white font-semibold mb-1">Hello There!</h2>
            <h4 className="text-lg text-white/60 mb-2">Please login to see your profile</h4>
            <Button onClick={handleLogin} className="mb-0">Login</Button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="w-full max-w-lg mx-auto glass flex flex-col items-center justify-center pt-6 relative">
        <button onClick={handleToggle} className="text-white right-4 top-4 absolute cursor-pointer bg-inherit rounded-full padding-2 mb-4">
          <EllipsisHorizontalIcon className="size-7" />
        </button>
        {isOpen && (
          <div className="glass w-40 p-2 h-auto text-white text-xs flex items-center justify-center absolute right-4 top-10 transition-all">
            <button className="cursor-pointer" onClick={handleChangePassword}>Change Password</button>
          </div>
        )}
        <div className="w-16 h-16 md:w-20 md:h-20 text-4xl text-white rounded-full bg-gray-400 flex items-center justify-center">{user.full_name[0]}</div>
        <h2 className="text-xl md:text-3xl font-medium text-white">{user.full_name}</h2>
        <p className="text-sm md:text-md text-white/80">{user.email}</p>
        <div className="w-full max-w-sm flex flex-row items-center justify-center mt-4">
          <Button
            className="py-1 px-0 bg-white/20 mr-2 text-sm"
            onClick={handleEdit}>Edit</Button>
          <Button
            className="py-1 px-0 text-sm"
            onClick={handleLogout}
            >Logout</Button>
        </div>
      </div>

      <ProfileModal
        isOpen={openModal}
        onClose={() => {setOpenModal(false), setIsOpen(false)}}
      />
    </AppLayout>
  );
};

export default Profile;