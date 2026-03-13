import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthContainer from "../components/AuthContainer";
import LoadingButton from "../components/LoadingButton";
// import toast from "react-hot-toast";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const resetStatus = useSelector((state) => state.auth.status.reset);

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
      <AuthContainer>
      <h2 className="text-white text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-full px-5 md:px-8 lg:px-8">
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
        <Button type="submit" disabled={resetStatus === "loading"}>
          {resetStatus === "loading" ? (<LoadingButton />) : "Reset Password"}
        </Button>
      </form>
    </AuthContainer>
    </AuthLayout>
  );
};

export default ResetPassword;