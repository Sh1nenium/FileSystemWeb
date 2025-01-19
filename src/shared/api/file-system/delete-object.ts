import { apiInstance } from "../api-instance";
import { BACKEND_URL } from "@/shared/constants/backend-url";

export const DeleteObjectApi = (guid: string) => 
    apiInstance().delete(`${BACKEND_URL.FILE_SYSTEM}/${guid}`);