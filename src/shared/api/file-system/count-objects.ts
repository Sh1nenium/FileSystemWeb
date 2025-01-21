import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";
import { CountObjects } from "@/entities/explorer-object/model/types";

export function CountObjectsApi() {
  return apiInstance().get<CountObjects>(`${BACKEND_URL.FILE_SYSTEM}/count`);
}