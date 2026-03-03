import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/profile");
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="py-8 px-20 border border-gray-200 rounded shadow">
            <h2 className="text-3xl font-semibold mb-2">Hello There,</h2>
            <h4 className="text-xl">Please login to see your profile</h4>
            <button onClick={handleLogin} className="w-full shadow rounded-md text-base bg-cyan-500 hover:bg-cyan-600 text-cyan-50 mt-4 px-2 py-2 flex items-center justify-center cursor-pointer">Login</button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="w-full h-screen flex items-center justify-center">
          <div className="px-8 py-4 border border-gray-200 rounded shadow flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-400 mr-4"></div>
            <div>
              <h2 className="text-3xl font-medium text-gray-800">{user.full_name}</h2>
              <h2 className="text-md text-gray-600">{user.phone_number}</h2>
              <h2 className="text-md text-gray-600">{user.email}</h2>
              <h2 className="text-md text-gray-600">{user.gender}</h2>

              <button onClick={handleLogout} className="w-full shadow rounded-md text-base bg-rose-500 hover:bg-rose-600 text-rose-50 mt-4 px-2 py-2 flex items-center justify-center cursor-pointer">Logout</button>
            </div>
          </div>
        </div>
    </AppLayout>
  );
};

export default Profile;