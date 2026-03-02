import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Profile</h1>

      <p><strong>Name:</strong> {user.full_name}</p>
      <p><strong>Phone:</strong> {user.phone_number}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;