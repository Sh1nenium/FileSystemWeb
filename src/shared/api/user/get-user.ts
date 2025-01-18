import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

type Response = {
  name: string
  surname: string
  email: string
  picture: string
}

export const getUserApi = () => 
  apiInstance().get<Response>(BACKEND_URL.USER);