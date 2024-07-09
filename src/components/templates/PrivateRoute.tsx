import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect, useRef } from "react";
import useAuth from "../../features/auth/useAuth";

interface Props {
  /** true:인증, false:인증불필요 */
  isAuth: boolean;
}

const PrivateRoute = ({ isAuth }: Props) => {
  const {
    token,
    tokenExpire,
    handleLogout,
    handleConfirmAuth,
    handleTokenExpire,
  } = useAuth();

  const expiredTimerRef = useRef<number | null>(null);

  useEffect(() => {
    //* 토큰 만료 테스트용
    const startExpiredTimer = () => {
      expiredTimerRef.current = setTimeout(() => {
        alert("토큰 정보가 만료되었습니다. 다시 로그인해주세요.");
        handleLogout();
      }, 3000);
    };

    const stopExpiredTimer = () => {
      if (expiredTimerRef.current) clearTimeout(expiredTimerRef.current);
    };

    if (!tokenExpire) return;

    tokenExpire.isExpire ? startExpiredTimer() : stopExpiredTimer();

    return () => {
      stopExpiredTimer();
    };
  }, [tokenExpire]);

  const AuthOutlet = (): ReactNode => {
    if (!tokenExpire) return null;
    return (
      <>
        <Outlet />
        <hr />
        <h3>토큰 정보</h3>
        <p>만료시간 : {String(new Date(tokenExpire.tokenExpireTime))}</p>
        <p>만료여부 : {String(tokenExpire.isExpire)}</p>
        {tokenExpire.isExpire && (
          <p>
            토큰이 만료되었습니다.
            <br /> (3초 후, 재로그인 alert가 표시됩니다.)
          </p>
        )}
        <button onClick={handleConfirmAuth}>사용자 인증확인</button>
        <button onClick={handleTokenExpire}>토큰 만료시키기</button>
        <button onClick={handleLogout}>로그아웃</button>
      </>
    );
  };

  // const Back = (): ReactNode => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     navigate(-1);
  //   }, []);
  //   return <></>;
  // };

  //* 인증 필요 페이지
  if (isAuth) {
    return token ? <AuthOutlet /> : <Navigate to="/" />;
  }

  //* 인증 불필요 페이지
  return token ? <Navigate to="/auth" /> : <Outlet />;
};

export default PrivateRoute;
