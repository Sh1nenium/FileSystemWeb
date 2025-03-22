import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const editObjectApi = (
  id: string,
  data: { 
    name: string; 
    description?: string; 
    parentFolderId?: string | null; 
    type: "File" | "Folder"; 
  }
) => {
  const payload = {
    name: data.name,
    description: data.description ?? '',
    parentFolderId: data.parentFolderId && data.parentFolderId !== '' 
      ? data.parentFolderId 
      : null,
    type: data.type
  };

  return apiInstance().put(`${BACKEND_URL.FILE_SYSTEM}/${id}`, payload);
};