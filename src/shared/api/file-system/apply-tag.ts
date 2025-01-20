import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export function applyTagApi(data: { objectId: string, tagId: string }) {
  return apiInstance().post(`${BACKEND_URL.FILE_SYSTEM}/${data.objectId}/tags?tagId=${data.tagId}`);
}