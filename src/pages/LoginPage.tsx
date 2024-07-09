import LoginForm from "@/components/organisms/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>로그인</h1>
      <LoginForm />
      <Link to="/register">
        <button type="button">회원가입하러 가기</button>
      </Link>
    </div>
  );
};

export default LoginPage;
