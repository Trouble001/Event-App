import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
// import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";


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
      <AuthContainer>
      <h2 className="text-white text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full px-4 md:px-8 lg:px-8">
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
    </AuthContainer>
    </AuthLayout>
  );
};

export default ForgotPassword;