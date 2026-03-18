import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Button from "../components/Button";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="w-full glass flex flex-col items-center justify-center py-4">
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
    </AppLayout>
  );
};

export default Profile;