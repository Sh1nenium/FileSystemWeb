import { BACKEND_URL } from "@/shared/constants/backend-url";
import { apiInstance } from "../api-instance";

export const editUserPictureApi = (file: File) => {
    const formData = new FormData();
    formData.append('picture', file); 
  
    return apiInstance().patch(BACKEND_URL.USER_PICTURE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
  };