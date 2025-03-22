import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const createFileApi = (data: { form: File; parentFolderId?: string | null; description?: string }) => {
  const formData = new FormData();

  formData.append('form', data.form);

  if (data.parentFolderId) {
    formData.append('parentFolderId', data.parentFolderId);
  }

  if (data.description) { 
    formData.append('description', data.description);
  }

  return apiInstance().post(`${BACKEND_URL.FILE_SYSTEM_FILES}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};