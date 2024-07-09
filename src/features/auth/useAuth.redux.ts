import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchConfirmAuth } from "./auth.api";
import { setTokenExpire } from "./auth.slice";

const useAuth = () => {
  const token = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();

  /** 토큰 정보 확인 */
  const handleConfirmAuth = () => {
    // fetchConfirmAuth(token + "1") // 토큰 위조 테스트
    fetchConfirmAuth(token.data.token)
      .then((res) => {
        alert(res.message);
        dispatch(setTokenExpire(false));
      })
      .catch(() => {
        dispatch(setTokenExpire(true));
      });
  };

  /** 토큰 만료(테스트용) */
  const handleTokenExpire = () => {
    dispatch(setTokenExpire(true));
  };

  return {
    token,
    handleConfirmAuth,
    handleTokenExpire,
  };
};

export default useAuth;
