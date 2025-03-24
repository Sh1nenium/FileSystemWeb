import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const resolveShareLinkApi = async (id: string) => {
    return apiInstance().post(`${BACKEND_URL.SHARE_LINKS}/${id}/resolve`);
  };