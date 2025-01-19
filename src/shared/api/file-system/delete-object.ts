import { apiInstance } from "../api-instance";
import { BACKEND_URL } from "@/shared/constants/backend-url";

export const DeleteObjectContent = (guid: string) => 
    apiInstance().delete(`${BACKEND_URL.FILE_SYSTEM}/${guid}`);