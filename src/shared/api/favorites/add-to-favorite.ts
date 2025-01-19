import { apiInstance } from "../api-instance";
import { BACKEND_URL } from '../../constants/backend-url';

export const AddToFavoriteApi = (guid: string) => 
    apiInstance().post(`${BACKEND_URL.FILE_SYSTEM_FAVORITES}/${guid}`);