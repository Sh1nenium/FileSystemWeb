import { getUserApi } from "@/shared/api";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { editUserEmailApi } from "@/shared/api/user/edit-user-email";
import { editUserInitialsApi } from "@/shared/api/user/edit-user-initials";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editUserPictureApi } from "@/shared/api/user/edit-user-picture";
import { toast } from "react-toastify";

export function useUserRepository() {
  const queryClient = useQueryClient();

  const query = useQuery(['user'], getUserApi)
  
  const editUserInitialsMutation = useMutation({
    mutationFn: (data: { name: string, surname: string }) => editUserInitialsApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  })

  const editUserEmailMutation = useMutation({
    mutationFn: (data: string) => editUserEmailApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  })

  const editUserPictureMutation = useMutation({
    mutationFn: (file: File) => editUserPictureApi(file),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']); 
    },
  });

  const editUserPicture = async (data: File) => {
    const result = await editUserPictureMutation.mutateAsync(data);

    toast.success("Картина была успшено изменена!");
    return IS_SUCCESS_STATUS(result.status);
  }

  const editUserInitials = async (data: { name: string, surname: string }) => {
    const result = await editUserInitialsMutation.mutateAsync(data);

    toast.success("Инициалы были успшено изменены!");
    return IS_SUCCESS_STATUS(result.status);
  }

  const editUserEmail = async (data: string) => {
    const result = await editUserEmailMutation.mutateAsync(data);

    toast.success("Почта была успешна изменены!");
    return IS_SUCCESS_STATUS(result.status);
  }

  return {
    user: query.data?.data,
    editUserPicture,
    editUserInitials,
    editUserEmail,
    ...query,
  }
}