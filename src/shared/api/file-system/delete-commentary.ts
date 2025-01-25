import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export function deleteCommentaryApi(commentaryId: string) {
  return apiInstance().delete(`${BACKEND_URL.FILE_SYSTEM}/commentaries/${commentaryId}`);
}