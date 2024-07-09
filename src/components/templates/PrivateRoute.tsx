import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/useAuth.redux";
import { logout } from "../../features/auth/auth.slice";
import { useDispatch } from "react-redux";
import { ReactNode, useEffect } from "react";

interface Props {
  /** true:인증, false:인증불필요 */
  isNeedAuth: boolean;
}

const PrivateRoute = ({ isNeedAuth }: Props) => {
  const { token, handleConfirmAuth, handleTokenExpire } = useAuth();
  const isAuth = (token.data.token && token.data.isExpired == false) || false;

  const dispatch = useDispatch();

  const AuthOutlet = (): ReactNode => {
    return (
      <>
        <p>만료시간 : {new Date(token.data.expiredAt!).toTimeString()}</p>
        <p>만료여부 : {token.data.isExpired ? "만료" : "유효"}</p>
        <button onClick={() => handleConfirmAuth()}>토큰확인</button>
        <button onClick={() => handleTokenExpire()}>토큰만료</button>
        <button onClick={() => dispatch(logout())}>로그아웃</button>
        <Outlet />
      </>
    );
  };

  const BackNavigate = (): ReactNode => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(-1);
    }, []);

    return <></>;
  };

  //* 인증 필요 페이지
  if (isNeedAuth) {
    return isAuth ? <AuthOutlet /> : <Navigate to="/" />;
  }

  //* 인증 불필요 페이지
  //FIXME 이전 페이지로 이동하는 코드 작성 필요
  return isAuth ? <BackNavigate /> : <Outlet />;
};

export default PrivateRoute;
