import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ResiterPage from "./pages/ResiterPage";
import AuthPage from "./pages/AuthPage";
import { RecoilRoot } from "recoil";
import PrivateRoute from "./components/templates/PrivateRoute";
import TestAuthPage from "./pages/TestAuthPage";
import BottomDescription from "./components/atoms/BottomDescription";

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
      </RecoilRoot>

      <BottomDescription />
    </BrowserRouter>
  );
}

export default App;
