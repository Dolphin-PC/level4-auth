import { atom } from "recoil";

export const tokenState = atom<string | null>({
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

export interface TokenExpire {
  /** 토큰 만료 시간 */
  tokenExpireTime: number;
  /** 토큰 만료 여부 */
  isExpire: boolean;
}
export const tokenExpireState = atom<TokenExpire | null>({
  key: "tokenExpireState",
  default: {
    tokenExpireTime: 0,
    isExpire: false,
  },
  effects: [
    ({ setSelf, onSet }) => {
      setSelf(JSON.parse(localStorage.getItem("tokenExpire") || "{}"));
      onSet((newExpire) => {
        if (newExpire) {
          localStorage.setItem("tokenExpire", JSON.stringify(newExpire));
        } else {
          localStorage.removeItem("tokenExpire");
        }
      });
    },
  ],
});
