import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ResiterPage from "./pages/ResiterPage";
import AuthPage from "./pages/AuthPage";
import { RecoilRoot } from "recoil";
import PrivateRoute from "./components/templates/PrivateRoute";
import TestAuthPage from "./pages/TestAuthPage";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route element={<PrivateRoute isAuth={false} />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<ResiterPage />} />
          </Route>
          <Route element={<PrivateRoute isAuth={true} />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/test-auth" element={<TestAuthPage />} />
          </Route>
        </Routes>

        <small>
          <p>API(mixed-content)오류가 발생할 땐,</p>
          chrome://settings/content/siteDetails?site={window.location.href}
          <p>
            <strong>안전하지 않은 콘텐츠 - 허용</strong>으로 변경바랍니다.
          </p>
        </small>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
