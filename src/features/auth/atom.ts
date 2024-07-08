import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
  effects: [
    ({ setSelf, onSet }) => {
      setSelf(localStorage.getItem("token") || "");
      onSet((newToken) => {
        if (newToken) {
          localStorage.setItem("token", newToken);
        } else {
          localStorage.removeItem("token");
        }
      });
    },
  ],
});
