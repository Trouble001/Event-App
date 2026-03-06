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
      <div className="w-full flex flex-col items-center justify-start">
        <div className="w-full flex items-center flex-row">
          <div className="w-20 h-20 rounded-full bg-gray-400 mr-2"></div>
          <div>
            <h2 className="text-xl font-medium text-gray-800">{user.full_name}</h2>
            <p className="text-md text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-start mt-4">
          <button onClick={handleEdit} className="rounded-xl bg-gray-600 hover:bg-gray-500 text-gray-50 text-sm px-3 py-1.5 flex items-center justify-center cursor-pointer mr-4">Edit Profile</button>
          <button onClick={handleLogout} className="rounded-xl bg-rose-500 hover:bg-rose-600 text-rose-50 text-sm px-3 py-1.5 flex items-center justify-center cursor-pointer">Logout</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;



        // <div>
          
        //   <h2 className="text-md text-gray-600">{user.phone_number}</h2>
        //   <h2 className="text-md text-gray-600">{user.email}</h2>
        //   <h2 className="text-md text-gray-600">{user.gender}</h2>

        //   
        // </div>