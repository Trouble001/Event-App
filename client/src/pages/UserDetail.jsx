import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  fetchUser,
  updateUser,
} from "../features/admin/adminSlice";

import AppLayout from "../layouts/AppLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import LoadingButton from "../components/LoadingButton";
import AccessDenied from "../components/AccessDenied";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { selectedUser, status } = useSelector((state) => state.admin);

  const userStatus = status.user;
  const updateStatus = status.update;
  const deleteStatus = status.delete;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    is_active: false,
    is_staff: false,
    is_superuser: false,
  });

  /* ================= ACCESS CONTROL ================= */
  if (!user?.is_staff && !user?.is_superuser) {
    return <AccessDenied />;
  }

  /* ================= FETCH USER ================= */
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  /* ================= SET FORM DATA ================= */
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name || "",
        email: selectedUser.email || "",
        phone_number: selectedUser.phone_number || "",
        gender: selectedUser.gender || "",
        is_active: selectedUser.is_active || false,
        is_staff: selectedUser.is_staff || false,
        is_superuser: selectedUser.is_superuser || false,
      });
    }
  }, [selectedUser]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= UPDATE USER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateUser({ id: selectedUser.id, data: formData })
      ).unwrap();

      navigate("/dashboard/users"); // ✅ better UX

    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  /* ================= DELETE USER ================= */
  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
      navigate("/dashboard/users"); // ✅ redirect after delete
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  /* ================= LOADING STATE ================= */
  if (userStatus === "loading") {
    return (
      <AppLayout>
        <div className="text-white text-center mt-10">Loading...</div>
      </AppLayout>
    );
  }

  /* ================= SAFETY ================= */
  if (!selectedUser) {
    return null; // prevents flicker after delete
  }

  /* ================= UI ================= */
  return (
    <AppLayout>
      <div className="w-full h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md glass p-6"
        >
          <h2 className="text-2xl text-white mb-4 text-center">
            Update User
          </h2>

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
            className="w-full glass text-white outline-none mb-4 px-4 py-2"
          >
            <option className="text-black" value="">
              Select Gender
            </option>
            <option className="text-black" value="male">
              Male
            </option>
            <option className="text-black" value="female">
              Female
            </option>
            <option className="text-black" value="other">
              Other
            </option>
          </select>

          <div className="flex flex-col gap-2 text-white mb-4 px-4">
            <label className="flex justify-between">
              <span>Is Active</span>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
            </label>

            <label className="flex justify-between">
              <span>Is Staff</span>
              <input
                type="checkbox"
                name="is_staff"
                checked={formData.is_staff}
                onChange={handleChange}
              />
            </label>

            <label className="flex justify-between">
              <span>Is Admin</span>
              <input
                type="checkbox"
                name="is_superuser"
                checked={formData.is_superuser}
                onChange={handleChange}
              />
            </label>
          </div>

          <Button type="submit" disabled={updateStatus === "loading"}>
            {updateStatus === "loading" ? (
              <LoadingButton />
            ) : (
              "Update"
            )}
          </Button>

          <Button
            type="button"
            disabled={updateStatus === "loading"}
            className="bg-rose-500 mt-2"
            onClick={() => handleDelete(selectedUser.id)}
          >
            {deleteStatus === "loading" ? (
              <LoadingButton />
            ) : (
              "Delete User"
            )}
          </Button>

          <div className="text-center mt-3 text-white/80 hover:text-white">
            <Link to="/dashboard/users">Cancel</Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default UserDetail;