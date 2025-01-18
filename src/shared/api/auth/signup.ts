import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

type Request = {
  login: string,
  password: string,
  email: string
}

export const signupApi = (data: Request) => 
  apiInstance().post(BACKEND_URL.REGISTRATION, data);