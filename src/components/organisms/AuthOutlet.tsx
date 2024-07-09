import useAuth from "@/features/auth/useAuth";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const AuthOutlet = (): ReactNode => {
  const { tokenExpire, handleLogout, handleConfirmAuth, handleTokenExpire } =
    useAuth();
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

export default AuthOutlet;
