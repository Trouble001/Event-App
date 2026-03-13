import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthContainer from "../components/AuthContainer";
import LoadingButton from "../components/LoadingButton";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
    const registerStatus = useSelector((state) => state.auth.status.register);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    gender: "",
    password: "",
    confirm_password: "",
  });

    // ✅ Redirect when user exists
    useEffect(() => {
      if (user) {
        navigate("/profile");
      }
    }, [user, navigate]);


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
      <AuthContainer>
      <h2 className="text-white text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="w-full px-5 md:px-8 lg:px-8">
        <Input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
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
          className='w-full rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/40 appearance-none mb-4 px-4 py-2 flex items-center'
          
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

        <Button
          type="submit"
          disabled={registerStatus === "loading"}>
          {registerStatus === "loading" ? (<LoadingButton />) : "Register"}
        </Button>
      </form>

      <div className="w-full text-base lg:text-md flex items-center justify-center">
        <p className="text-white/80 mr-1">Already have an account?</p>
        <Link className="text-white font-semibold cursor-pointer hover:underline" to="/login">Login</Link>
      </div>
    </AuthContainer>
    </AuthLayout>
  );
};


export default Register;