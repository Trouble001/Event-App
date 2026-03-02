import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    gender: "",
    password: "",
    confirm_password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 10) {
        setFormData({
          ...formData,
          phone_number: onlyNumbers,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLocalError("");

    // Validate 10 digits
    // if (formData.phone_number.length !== 10) {
    //   toast.error("Phone number must be exactly 10 digits.");
    //   return;
    // }

    // Validate Indian mobile format (6-9 start)
    // if (!/^[6-9]\d{9}$/.test(formData.phone_number)) {
    //   toast.error("Enter a valid Indian mobile number.");
    //   return;
    // }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 shadow-md rounded-md bg-gray-50 py-8 flex items-center justify-center flex-col">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="w-full px-8">
        <Input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="phone_number"
          placeholder="Enter 10 digit mobile number"
          value={formData.phone_number}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className='w-full outline text-base outline-gray-200 rounded-md bg-gray-50 mb-4 px-2 py-2 flex items-center justify-center'
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          type={showPassword ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          rightIcon={
            showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )
          }
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      <p className="text-gray-700">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </AuthLayout>
  );
};


export default Register;