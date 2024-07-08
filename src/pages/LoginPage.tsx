import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { fetchLogin } from "../features/auth/api";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../features/auth/atom";

const LoginPage = () => {
  const setTokenState = useSetRecoilState(tokenState);

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
          setTokenState(res.token);
        }
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" name="id" placeholder="아이디" />
        <input type="password" name="password" placeholder="비밀번호" />

        <button type="button">
          <Link to="/register">회원가입</Link>
        </button>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
