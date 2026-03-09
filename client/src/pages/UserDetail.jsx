import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../features/admin/adminSlice";
import AppLayout from "../layouts/AppLayout";

const UserDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.admin);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({id, data: formData}));
  };

  return (
    <AppLayout>
      <h2 className="text-2xl font-bold mb-4">
        Update User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
        />

        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Update User
        </button>

      </form>

    </AppLayout>
  );
};

export default UserDetail;