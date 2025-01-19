import { apiInstance } from "../api-instance";
import { BACKEND_URL } from '../../constants/backend-url';

export const DeleteFromFavoriteApi = (guid: string) => 
    apiInstance().delete(`${BACKEND_URL.FILE_SYSTEM_FAVORITES}/${guid}`);