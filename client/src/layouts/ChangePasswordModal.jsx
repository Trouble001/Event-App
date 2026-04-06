import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logoutUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import ModalContainer from "../components/ModalContainer";
import LoadingButton from "../components/LoadingButton";


const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const passwordStatus = useSelector((state) => state.auth.status.password);

  const resetForm = () => {
    setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });
  };


  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   if (formData.new_password !== formData.confirm_password) {
    toast.error("New password and confirm password do not match.");
  }
  
  try {
    await dispatch(changePassword(formData)).unwrap();
    await dispatch(logoutUser()).unwrap();
    resetForm();
    onClose();
    } catch (error) {
        console.log("Error: ", error);
    }
};


  return (
    <ModalContainer>
      <h2 className="text-xl font-bold mb-4 text-white text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type={showPassword ? "text" : "password"}
            name="old_password"
            placeholder="Old Password"
            value={formData.old_password}
            onChange={handleChange}
            required
          />
          <Input
            type={showPassword ? "text" : "password"}
            name="new_password"
            placeholder="New Password"
            value={formData.new_password}
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
        
          <div className="flex flex-row items-center justify-between mb-0">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="mb-0 mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="mb-0"
              type="submit"
              disabled={passwordStatus === "loading"}
              >
              {passwordStatus === "loading" ? <LoadingButton /> : "Change Password"}
            </Button>
          </div>
        </form>
    </ModalContainer>
  );
};

export default ChangePasswordModal;