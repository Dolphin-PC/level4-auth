import { ReactNode, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const BackNavigate = (): ReactNode => {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 navigate(-1)을 호출
    if (hasNavigated.current) {
      navigate(-1);
    } else {
      // 첫 마운트 시에는 hasNavigated를 true로 설정하여, 다음부터 navigate(-1) 가능
      hasNavigated.current = true;
    }
  }, []);

  return <Navigate to="/auth" />;
};

export default BackNavigate;
