import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const downloadObjectApi = (id: string) =>
  apiInstance().get(`${BACKEND_URL.FILE_SYSTEM}/${id}/download`, { responseType: "blob" });