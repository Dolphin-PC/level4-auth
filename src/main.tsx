import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
