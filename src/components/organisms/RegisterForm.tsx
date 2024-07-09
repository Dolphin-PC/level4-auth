import { fetchRegister } from "@/features/auth/api";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id");
    const password = formData.get("password");

    if (!id || !password) return alert("아이디와 비밀번호를 입력해주세요.");

    // 회원가입 API 호출
    fetchRegister({ id: id.toString(), password: password.toString() }).then(
      () => {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      }
    );
  };
  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="id" placeholder="아이디" />
      <input type="password" name="password" placeholder="비밀번호" />

      <button>회원가입</button>
    </form>
  );
};

export default RegisterForm;
