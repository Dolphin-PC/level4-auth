import api from "../../common/axios";

interface LoginReq {
  id: string;
  password: string;
}

interface LoginRes {
  token: string;
}

export const fetchLogin = async ({
  id,
  password,
}: LoginReq): Promise<LoginRes> => {
  const response = await api.post("/login", { id, password });
  return response.data;
};
