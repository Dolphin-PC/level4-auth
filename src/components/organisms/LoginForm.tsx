import { fetchLogin } from "@/features/auth/api";
import useAuth from "@/features/auth/useAuth";
import { FormEvent } from "react";

const LoginForm = () => {
  const auth = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // FormData
    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id");
    const password = formData.get("password");

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
  );
};

export default LoginForm;
