
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetAllFavoritesApi } from "@/shared/api/favorites/get-all-favorites";
import { AddToFavoriteApi } from "@/shared/api/favorites/add-to-favorite";
import { DeleteFromFavoriteApi } from "@/shared/api/favorites/delete-from-favorite";
import { toast } from "react-toastify";

export function useFavoritesRepository() {
  const queryClient = useQueryClient();

  const query = useQuery(['favorited'], GetAllFavoritesApi);
  
  const addToFavoriteMutation = useMutation({
     mutationFn: (data: string) => AddToFavoriteApi(data),
        onSuccess: () => {
          queryClient.invalidateQueries(['favorited']);
        }
  });
  const deleteFromFavoriteMutation = useMutation({
     mutationFn: (data: string) => DeleteFromFavoriteApi(data),
        onSuccess: () => {
          queryClient.invalidateQueries(['favorited']);
        }
  });


  const addToFavorite = async (guid: string) => {
    const result = await addToFavoriteMutation.mutateAsync(guid);

    toast.success("Объект успешно добавлен в избранное!");
    return IS_SUCCESS_STATUS(result.status);
  }

  const deleteFromFavorite = async (guid: string) => {
    const result = await deleteFromFavoriteMutation.mutateAsync(guid);

    toast.success("Объект успешно удален из избранного!");
    return IS_SUCCESS_STATUS(result.status);
  }

  return {
    favorites: query.data,
    addToFavorite,
    deleteFromFavorite,
    ...query,
  }
}