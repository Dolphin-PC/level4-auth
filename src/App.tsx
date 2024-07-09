import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ResiterPage from "./pages/ResiterPage";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/templates/PrivateRoute";
import TestAuthPage from "./pages/TestAuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isNeedAuth={false} />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<ResiterPage />} />
        </Route>
        <Route element={<PrivateRoute isNeedAuth={true} />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/test-auth" element={<TestAuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
