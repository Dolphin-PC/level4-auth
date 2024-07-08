import React from "react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../features/auth/atom";

const AuthPage = () => {
  const setTokenState = useSetRecoilState(tokenState);

  const handleLogout = () => {
    setTokenState("");
  };

  return (
    <div>
      <h1>AuthPage</h1>

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default AuthPage;
