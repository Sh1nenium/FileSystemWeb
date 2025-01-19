import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const editObjectApi = (id: string, data: { name: string, description: string, parentFolderId: string, type: "File" | "Folder" }) => 
  apiInstance().put(`${BACKEND_URL.FILE_SYSTEM}/${id}`, data);