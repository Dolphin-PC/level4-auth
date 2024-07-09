import { useRecoilState } from "recoil";
import { tokenExpireState, tokenState } from "./atom";
import { fetchConfirmAuth } from "./api";
import { useEffect, useRef } from "react";

const useAuth = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [tokenExpire, setTokenExpire] = useRecoilState(tokenExpireState);
  const expiredTimerRef = useRef<number | null>(null);

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
