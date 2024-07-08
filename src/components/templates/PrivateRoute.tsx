import { useRecoilValue } from "recoil";
import { tokenState } from "../../features/auth/atom";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  /** true:인증, false:인증불필요 */
  isAuth: boolean;
}

const PrivateRoute = ({ isAuth }: Props) => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);

  //! useEffect사용시, 정상작동됨
  //* 인증이 필요없는 페이지에 접근했을 때, 토큰이 있다면 이전 페이지로 이동
  // useEffect(() => {
  //   if (!isAuth && token) {
  //     navigate(-1);
  //   }
  // }, [token]);
  console.log({ token });
  if (!isAuth && token) {
    navigate(-1);
  }

  //* 인증이 필요한 페이지에 접근했을 때, 토큰이 없다면 '/'로 이동
  // useEffect안에서 작성하지 않은 이유는, 렌더링이 되기 전에 Navigate를 하기 위함
  if (isAuth && !token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
