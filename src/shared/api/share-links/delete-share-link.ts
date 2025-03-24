import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const deleteShareLinkApi = async (id: string) => {
    return apiInstance().delete(`${BACKEND_URL.SHARE_LINKS}/${id}`);
  };