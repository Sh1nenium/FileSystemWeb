import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const editUserEmailApi = (data: string) => 
  apiInstance().patch(BACKEND_URL.USER_EMAIL, { email: data });