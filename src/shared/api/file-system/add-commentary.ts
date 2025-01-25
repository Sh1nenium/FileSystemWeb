import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export function addCommentaryApi(objectId: string, content: string) {
  return apiInstance().post(`${BACKEND_URL.FILE_SYSTEM}/${objectId}/commentaries?content=${content}`);
}