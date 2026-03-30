import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../features/admin/adminSlice";
import AppLayout from "../layouts/AppLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import AccessDenied from "../components/AccessDenied";

const UserDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state) => state.admin);
  const userStatus = useSelector((state) => state.admin.status.user);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    is_active: false,
    is_staff: false,
    is_superuser: false,
  });

  useEffect(() => {
    dispatch(fetchUser(id)).unwrap();
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser?.full_name || "",
        email: selectedUser?.email || "",
        phone_number: selectedUser?.phone_number || "",
        gender: selectedUser?.gender || "",
        is_active: selectedUser?.is_active || false,
        is_staff: selectedUser?.is_staff || false,
        is_superuser: selectedUser?.is_superuser || false,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({id: selectedUser.id, data: formData})).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

if (!user?.is_staff && !user?.is_superuser) return <AccessDenied />;

  return (
    <AppLayout>
      <div className="w-full h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md glass p-6">
        <h2 className="text-2xl text-white mb-4 text-center">Update User</h2>
        <Input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"  
        />
        <Input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none mb-4 px-4 py-2 flex items-center"
        >
          <option className="text-black" value="">Select Gender</option>
          <option className="text-black" value="male">Male</option>
          <option className="text-black" value="female">Female</option>
          <option className="text-black" value="other">Other</option>
        </select>

        <div className="flex flex-col gap-2 text-white mb-4 px-4">
          <label className="flex items-center justify-between text-white">
            <span>Is Active</span>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Staff</span>
            <input
              type="checkbox"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleChange}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Admin</span>
            <input
              type="checkbox"
              name="is_superuser"
              checked={formData.is_superuser}
              onChange={handleChange}
              className="accent-cyan-400"
            />
          </label>
        </div>

        <Button
          type="submit"
          disabled={userStatus === "loading"}
          >{userStatus === "loading" ? (<LoadingButton />) : "Update"}
          </Button>
          <div className="w-full flex items-center justify-center text-white/80 hover:text-white text-md mt-0"><Link to="/dashboard/users">Cancel</Link></div>
      </form>
    </div>
    </AppLayout>
  );
};

export default UserDetail;
