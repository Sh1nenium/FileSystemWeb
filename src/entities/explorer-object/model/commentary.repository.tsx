import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { addCommentaryApi } from "@/shared/api/file-system/add-commentary";
import { deleteCommentaryApi } from "@/shared/api/file-system/delete-commentary";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export function useCommentaryRepository() {
        const queryClient = useQueryClient();

        const createCommentaryOnObject = useMutation({
            mutationFn: (data: { content: string, objectId: string}) => addCommentaryApi(data.content, data.objectId),
                onSuccess: () => {
                    toast.success("Комментарий был отправлен!");
                    queryClient.invalidateQueries(['files']);
                }
        });

        const deleteCommentaryMutation = useMutation({
            mutationFn: (id: string) => deleteCommentaryApi(id),
                onSuccess: () => {
                    toast.success("Комментарий был удален!");
                    queryClient.invalidateQueries(['files']);
                }
        });

        const createCommentary = async (content: string, objectId: string) => {
          const result = await createCommentaryOnObject.mutateAsync({content, objectId});
          console.log(content);
          console.log(objectId);
          
          return IS_SUCCESS_STATUS(result.status);
        }

        const deleteCommentary = async (commentaryId: string) => {
            const result = await deleteCommentaryMutation.mutateAsync(commentaryId);
            return IS_SUCCESS_STATUS(result.status);
        }

    
      
    return {
        createCommentary,
        deleteCommentary
    }
}