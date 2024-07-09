import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";
import BackNavigate from "@/components/atoms/BackNavigate";
import AuthOutlet from "@/components/organisms/AuthOutlet";

interface Props {
  /** true:인증, false:인증불필요 */
  isAuth: boolean;
}

const PrivateRoute = ({ isAuth }: Props) => {
  const { token } = useAuth();

  //* 인증 필요 페이지
  if (isAuth) {
    return token ? <AuthOutlet /> : <Navigate to="/" />;
  }

  //* 인증 불필요 페이지
  return token ? <BackNavigate /> : <Outlet />;
};

export default PrivateRoute;
