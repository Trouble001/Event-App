import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { createUser, fetchUsers } from "../features/admin/adminSlice";


const CreateUserModal = ({ isOpen, onClose }) => {
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
    await dispatch(createUser(formData)).unwrap();
    dispatch(fetchUsers()).unwrap();
    resetForm();
    onClose();
    } catch (error) {
        console.log("Error: ", error);
    }
};


  return (
    <div className="w-auto h-full absolute bg-black/40 md:pl-23 inset-0 bg-red/60 mx-auto top-0 flex items-center justify-center z-40">
      <div className="glass w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Add new user</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="text"
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phone_number"
            placeholder="Phone number"
            onChange={handleChange}
          />

          <select
            name="gender"
            onChange={handleChange}
            required
            className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none mb-4 px-4 py-2 flex items-center'
        >
          <option className="text-black" value="">Select Gender</option>
          <option className="text-black" value="male">Male</option>
          <option className="text-black" value="female">Female</option>
          <option className="text-black" value="female">Other</option>
        </select>
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

          <div className="flex flex-col gap-2 text-white mb-4 px-4">
          <label className="flex items-center justify-between text-white">
            <span>Is Active</span>
            <input
              type="checkbox"
              name="is_active"
              onChange={handleChange}
              defaultChecked
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Staff</span>
            <input
              type="checkbox"
              name="is_staff"
              onChange={handleChange}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-white">
            <span>Is Admin</span>
            <input
              type="checkbox"
              name="is_superuser"
              onChange={handleChange}
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
            <Button className="mb-0" type="submit">
                Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;