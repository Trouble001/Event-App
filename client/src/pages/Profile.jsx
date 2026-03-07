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
        <div className="w-full h-full flex">
          <div className="">
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
      <div className="w-full flex items-center justify-center">
        <div className="w-11/12 mx-auto">
          
          <div className="w-full flex items-center justify-start">
            <div className="w-20 h-20 md:w-30 md:h-30 rounded-full bg-gray-400 mr-4"></div>
            <div className="w-6/12">
              <h2 className="text-xl md:text-3xl font-medium text-gray-900">{user.full_name}</h2>
              <p className="text-sm md:text-md text-gray-400">{user.email}</p>
              <div className="w-full flex flex-row items-center justify-center mt-4">
                <button onClick={handleEdit} className="w-full rounded-full bg-gray-600 hover:bg-gray-500 text-gray-50 ms:text-sm text-xs md:py-2 py-1 px-4 flex flex-row items-center justify-center cursor-pointer mr-4">Edit Profile</button>
                <button onClick={handleLogout} className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-rose-50 ms:text-sm text-xs md:py-2 py-1 px-4 flex flex-row items-center justify-center cursor-pointer">Logout</button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;