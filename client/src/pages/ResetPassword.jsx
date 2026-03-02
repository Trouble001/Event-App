import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
// import toast from "react-hot-toast";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");

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
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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