import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

type Request = {
  login: string,
  password: string,
}

export const loginApi = (data: Request) => 
  apiInstance().post(BACKEND_URL.LOGIN, data);