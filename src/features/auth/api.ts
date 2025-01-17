import api from "@/common/axios";

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

interface RegisterReq extends LoginReq {}

export const fetchRegister = async ({
  id,
  password,
}: RegisterReq): Promise<void> => {
  await api.post("/register", { id, password });
};

interface ConfirmAuthRes {
  message: string;
}
export const fetchConfirmAuth = async (
  token: string
): Promise<ConfirmAuthRes> => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
