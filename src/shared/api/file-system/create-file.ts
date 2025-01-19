import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const createFileApi = (data: { form: File, parentFolderId: string, description: string }) => {
  const formData = new FormData();
  formData.append('form', data.form);

  return apiInstance()
    .post(`${BACKEND_URL.FILE_SYSTEM_FILES}?parentFolderId=${data.parentFolderId ?? ''}&description=${data.description}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
}
  