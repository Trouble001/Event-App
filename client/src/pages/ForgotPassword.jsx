import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
// import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import LoadingButton from "../components/LoadingButton";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const forgotStatus = useSelector((state) => state.auth.status.forgot);


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
      <form onSubmit={handleSubmit} className="w-full px-5 md:px-8 lg:px-8">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          disabled={forgotStatus === "loading"}
        >{forgotStatus === "loading" ? (<LoadingButton />) : "Send Reset Link"}</Button>
        <div className="w-full flex items-center justify-center text-white/80 hover:text-white text-md"><Link to="/login">Cancel</Link></div>
      </form>
    </AuthContainer>
    </AuthLayout>
  );
};

export default ForgotPassword;