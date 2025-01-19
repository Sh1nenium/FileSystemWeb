import { apiInstance } from "../api-instance";
import { BACKEND_URL } from '../../constants/backend-url';
import { Tag } from "@/entities/tags/model/types";

export const CreateTagApi = (data: Tag) => 
    apiInstance().post(`${BACKEND_URL.TAGS}`, {name: data.name, description: data.description});