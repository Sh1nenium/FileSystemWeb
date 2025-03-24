import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

import { FileRights, ShareLink } from "./types";
import { createShareLinkApi } from "@/shared/api/share-links/create-share-link";
import { deleteShareLinkApi } from "@/shared/api/share-links/delete-share-link";
import { getFileShareLinksApi } from "@/shared/api/share-links/get-file-share-links";

export function useShareLinkRepository(fileId?: string) {
    const queryClient = useQueryClient();
    
    const query = useQuery(
        ['share-links', fileId],
        () => getFileShareLinksApi(fileId ?? "")
      );

    const addShareLinkMutation = useMutation({
        mutationFn: (data: { daysToExpire: number, rights: FileRights }) => createShareLinkApi(fileId ?? "", data),
            onSuccess: () => {
                toast.success("Ссылка была успешна создана!");
                queryClient.invalidateQueries(['share-links']);
            }
    });

    const addShareLink = async (data: { daysToExpire: number, rights: FileRights }) => {
        const result = await addShareLinkMutation.mutateAsync(data);
        return IS_SUCCESS_STATUS(result.status);
    }

    const deleteShareLinkMutation = useMutation({
        mutationFn: (shareLinkId: string) => deleteShareLinkApi(shareLinkId),
            onSuccess: () => {
                toast.success("Ссылка была успешна удалена!");
                queryClient.invalidateQueries(['share-links']);
            }
    })

    const deleteShareLink = async (shareLinkId: string) => {
        const result = await deleteShareLinkMutation.mutateAsync(shareLinkId);
        return IS_SUCCESS_STATUS(result.status);
    }

    return {
        data: query.data,

        addShareLink,
        deleteShareLink,
    }
}