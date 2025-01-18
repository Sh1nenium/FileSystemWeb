import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

type Request = {
  name: string;
  surname: string;
}

export const editUserInitialsApi = (data: Request) => 
  apiInstance().patch(BACKEND_URL.USER_INITIALS, data);