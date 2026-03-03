import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
// import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

    // ✅ Redirect when user exists
    useEffect(() => {
      if (user) {
        navigate("/profile");
      }
    }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword({email}))

    if (result.meta.requestStatus === "fulfilled") {
      setEmail("");
    }
  };

  return (
    <AuthLayout>
      <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 shadow-md rounded-md bg-gray-50 py-8 flex items-center justify-center flex-col">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full px-8">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          disabled={loading}
        >{loading ? "Sending..." : "Send Reset Link"}</Button>
      </form>
    </div>
    </AuthLayout>
  );
};

export default ForgotPassword;