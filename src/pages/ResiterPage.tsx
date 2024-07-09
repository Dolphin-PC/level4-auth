import RegisterForm from "@/components/organisms/RegisterForm";
import { Link } from "react-router-dom";

const ResiterPage = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <RegisterForm />
      <Link to="/">
        <button type="button">로그인하러 가기</button>
      </Link>
    </div>
  );
};

export default ResiterPage;
