import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { fetchLogin } from "../features/auth/api";
import useAuth from "../features/auth/useAuth";

const LoginPage = () => {
  const auth = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // FormData
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id"); // '아이디' 입력 필드의 name 속성이 'username'이라고 가정
    const password = formData.get("password"); // '비밀번호' 입력 필드의 name 속성이 'password'라고 가정

    if (!id || !password) return alert("아이디와 비밀번호를 입력해주세요.");

    fetchLogin({ id: id.toString(), password: password.toString() }).then(
      (res) => {
        if (res && res.token) {
          auth.handleLogin(res.token);
        }
      }
    );
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="id" placeholder="아이디" defaultValue="test" />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          defaultValue="test"
        />

        <button>로그인</button>
      </form>
      <Link to="/register">
        <button type="button">회원가입하러 가기</button>
      </Link>
    </div>
  );
};

export default LoginPage;
