import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthContainer from "../components/AuthContainer";
import LoadingButton from "../components/LoadingButton";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const loginStatus = useSelector((state) => state.auth.status.login);

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  // ✅ Redirect when user exists
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <AuthLayout>
      <AuthContainer>
      <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full px-5 md:px-8 lg:px-8">
        <Input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        ></Input>

        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
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
          disabled={loginStatus === "loading"}
          >{loginStatus === "loading" ? (<LoadingButton />) : "Login"}</Button>
      </form>

      <div className="w-full text-base lg:text-md flex flex-col items-center justify-center">
        <p className="mb-2"><Link className="text-white/80 hover:text-white" to="/forgot-password">Forgot Password</Link></p>
        <p className="text-white/80">
        Don't have an account? <Link className="text-white font-semibold cursor-pointer hover:underline" to="/register">Register</Link>
        </p>
      </div>
    </AuthContainer>
    </AuthLayout>
  );
};
export default Login;
