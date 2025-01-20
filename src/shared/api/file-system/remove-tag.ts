import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const removeTagApi = (data: { objectId: string, tagId: string }) => 
  apiInstance().delete(`${BACKEND_URL.FILE_SYSTEM}/${data.objectId}/tags?tagId=${data.tagId}`);