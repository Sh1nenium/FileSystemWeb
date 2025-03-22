import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const createFolderApi = (data: { name: string; parentFolderId?: string | null }) => 
  apiInstance().post(`${BACKEND_URL.FILE_SYSTEM_FOLDERS}`, {
    name: data.name,
    parentFolderId: data.parentFolderId || null,
  });