import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const logoutApi = () => 
  apiInstance().post(BACKEND_URL.LOGOUT);