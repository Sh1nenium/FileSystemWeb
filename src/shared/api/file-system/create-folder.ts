import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const createFolderApi = (data: { name: string, parentFolderId: string}) => 
  apiInstance().post(`${BACKEND_URL.FILE_SYSTEM_FOLDERS}`, data);