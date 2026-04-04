import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { createUser, deleteUser, fetchUsers, updateUser } from "../features/admin/adminSlice";
import LoadingButton from "../components/LoadingButton";


const UserModal = ({ isOpen, onClose, isEdit = false, initialData = null }) => {
  const { status } = useSelector((state) => state.admin);

  const createStatus = status.create;
  const updateStatus = status.update;
  const deleteStatus = status.delete;
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    is_active: true,
    is_staff: false,
    is_superuser: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const resetForm = () => {
    setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        gender: "",
        password: "",
        is_active: true,
        is_staff: false,
        is_superuser: false,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
      if (isEdit && initialData) {
        setFormData({
          full_name: initialData.full_name || "",
          email: initialData.email || "",
          phone_number: initialData.phone_number || "",
          gender: initialData.gender || "",
          is_active: initialData.is_active || false,
          is_staff: initialData.is_staff || false,
          is_superuser: initialData.is_superuser || false,
        });
      } else {
        resetForm()
      }
    }, [isEdit, initialData]);


  if (!isOpen) return null;

//   Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   console.log(formData);
   
  try {
    if (isEdit) {
      const updatedData = {...formData};
      delete updatedData.password;
      await dispatch(updateUser({ id: initialData.id, data: updatedData })).unwrap()
    } else {
      await dispatch(createUser(formData)).unwrap();
    }
    resetForm();
    onClose();
    dispatch(fetchUsers()).unwrap();
    } catch (error) {
        console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
      resetForm();
      onClose();
      dispatch(fetchUsers()).unwrap();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };


  return (
    <div className="w-auto h-full absolute bg-black/40 md:pl-23 inset-0 mx-auto top-0 flex items-center justify-center z-40">
      <div className="glass w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-white">{isEdit ? 'Update' : 'Create'} User</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phone_number"
            placeholder="Phone number"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none mb-4 px-4 py-2 flex items-center'
        >
          <option className="text-black" value="">Select Gender</option>
          <option className="text-black" value="male">Male</option>
          <option className="text-black" value="female">Female</option>
          <option className="text-black" value="other">Other</option>
        </select>
          {!isEdit && (
            <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            rightIcon={
            showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )
          }
            onRightIconClick={() => setShowPassword(!showPassword)}
          />
          )}

          <div className="flex flex-col gap-2 text-white mb-4 px-4">
          <label className="flex items-center justify-between text-white">
            <span>Is Active</span>
            <input
              type="checkbox"
              name="is_active"
              onChange={handleChange}
              checked={formData.is_active}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Staff</span>
            <input
              type="checkbox"
              name="is_staff"
              onChange={handleChange}
              checked={formData.is_staff}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Admin</span>
            <input
              type="checkbox"
              name="is_superuser"
              onChange={handleChange}
              checked={formData.is_superuser}
              className="accent-cyan-400"
            />
          </label>
        </div>
          
        
          <div className="flex flex-row items-center justify-between mb-0">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white/30 mb-0 mr-2"
            >
              Cancel
            </Button>
            <Button
            disabled={ createStatus === "loading" || updateStatus === "loading" }
            className="mb-0" type="submit"
            >
              {createStatus === "loading" || updateStatus === "loading" ? (
              <LoadingButton />
            ) : isEdit ? ("Update") : ("Create")}
            </Button>
          </div>
          {isEdit && initialData ? (
            <Button
            type="button"
            disabled={updateStatus === "loading"}
            className="bg-rose-600 hover:bg-rose-500 mt-2"
            onClick={() => handleDelete(initialData.id)}
          >
            {deleteStatus === "loading" ? (
              <LoadingButton />
            ) : (
              "Delete User"
            )}
          </Button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default UserModal;