import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import toast from "react-hot-toast";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Redirect when user exists
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      resetPassword({
        uid,
        token,
        new_password: password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <AuthLayout>
      <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 shadow-md rounded-md bg-gray-50 py-8 flex items-center justify-center flex-col">
      <h2 className="text-2xl mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-full px-8">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
    </AuthLayout>
  );
};

export default ResetPassword;