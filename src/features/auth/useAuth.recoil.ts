import { useRecoilState } from "recoil";
import { tokenExpireState, tokenState } from "./auth.atom";
import { fetchConfirmAuth } from "./auth.api";

const useAuth = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [tokenExpire, setTokenExpire] = useRecoilState(tokenExpireState);

  /** 로그인처리 - token 및 만료정보 저장 */
  const handleLogin = (token: string) => {
    setToken(token);

    const now = new Date().getTime();
    setTokenExpire({
      tokenExpireTime: now + 60 * 60 * 1000, // 1시간
      isExpire: false,
    });
  };

  /** 로그아웃 처리 */
  const handleLogout = () => {
    setToken(null);
    setTokenExpire(null);
  };

  /** 토큰 정보 확인 */
  const handleConfirmAuth = () => {
    if (!token || !tokenExpire) return alert("로그인이 필요합니다.");

    // fetchConfirmAuth(token + "1") // 토큰 위조 테스트
    fetchConfirmAuth(token)
      .then((res) => {
        alert(res.message);
        setTokenExpire({
          tokenExpireTime: tokenExpire.tokenExpireTime,
          isExpire: false,
        });
      })
      .catch(() => {
        setTokenExpire({
          tokenExpireTime: tokenExpire.tokenExpireTime,
          isExpire: true,
        });
      });
  };

  /** 토큰 만료(테스트용) */
  const handleTokenExpire = () => {
    if (!tokenExpire) return alert("로그인이 필요합니다.");

    setTokenExpire({
      tokenExpireTime: tokenExpire.tokenExpireTime,
      isExpire: true,
    });
  };

  return {
    token,
    tokenExpire,
    handleLogin,
    handleLogout,
    handleConfirmAuth,
    handleTokenExpire,
  };
};

export default useAuth;
