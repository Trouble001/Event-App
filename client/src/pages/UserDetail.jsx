import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../features/admin/adminSlice";
import AppLayout from "../layouts/AppLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";

const UserDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((state) => state.admin);
    const userStatus = useSelector((state) => state.admin.status.user);


  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchUser(id)).unwrap();
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser?.full_name || "",
        email: selectedUser?.email || "",
        phone_number:  selectedUser?.phone_number || "",
        gender: selectedUser?.gender || "",
      });
    }
  }, [selectedUser]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  return (
    <AppLayout>
      <div className="w-full h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-6/12 glass p-6">
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