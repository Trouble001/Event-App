import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) return <h2>Authenticating...</h2>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;