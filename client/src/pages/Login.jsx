import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector(
    (state) => state.auth
  );

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
      <div className="w-full md:w-10/12 lg:w-6/12 xl:w-5/12 rounded-md bg-gray-50 py-8 flex items-center justify-center flex-col outline outline-gray-200">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full px-4 md:px-8 lg:px-8">
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
          disabled={loading}
          >{loading ? "Logging in..." : "Login"}</Button>
      </form>

      <div className="w-full text-gray-600 text-base lg:text-md flex flex-col items-center justify-center">
        <p className="mb-2"><Link className="text-cyan-600" to="/forgot-password">Forgot Password</Link></p>
        <p>
        Don't have an account? <Link className="text-cyan-600" to="/register">Register</Link>
        </p>
      </div>
    </div>
    </AuthLayout>
  );
};
export default Login;