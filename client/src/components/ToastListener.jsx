import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearError, clearSuccess } from "../features/auth/authSlice";
import { clearAdminError, clearAdminSuccess } from "../features/admin/adminSlice";
import { clearSlideError, clearSlideSuccess } from "../features/slide/slideSlice";



const ToastListener = () => {
  const { error, successMessage } = useSelector((state) => state.auth);
  const { adminError, adminSuccess } = useSelector((state) => state.admin);
  const { slideError, slideSuccess } = useSelector((state) => state.slide);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (adminError) {
      toast.error(adminError);
      dispatch(clearAdminError());
    }

    if (slideError) {
      toast.error(slideError);
      dispatch(clearSlideError());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccess());
    }

    if (adminSuccess) {
      toast.success(adminSuccess);
      dispatch(clearAdminSuccess());
    }

    if (slideSuccess) {
      toast.success(slideSuccess);
      dispatch(clearSlideSuccess());
    }
  }, [error, adminError, slideError, successMessage, adminSuccess, slideSuccess, dispatch]);

  return null;
};

export default ToastListener;