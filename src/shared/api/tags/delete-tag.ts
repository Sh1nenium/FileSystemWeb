import { apiInstance } from "../api-instance";
import { BACKEND_URL } from '../../constants/backend-url';


export const DeleteTagApi = (guid: string) => 
    apiInstance().delete(`${BACKEND_URL.TAGS}/${guid}`);