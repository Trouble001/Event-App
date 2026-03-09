import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearError, clearSuccess } from "../features/auth/authSlice";
import { clearAdminError, clearAdminSuccess } from "../features/admin/adminSlice";


const ToastListener = () => {
  const { error, successMessage } = useSelector((state) => state.auth);
  const { adminError, adminSuccess } = useSelector((state) => state.admin)
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (adminError) {
      toast.error(adminError);
      dispatch(clearAdminError);
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccess());
    }

    if (adminSuccess) {
      toast.success(adminSuccess);
      dispatch(clearAdminSuccess());
    }
  }, [error, adminError, successMessage, adminSuccess, dispatch]);

  return null;
};

export default ToastListener;