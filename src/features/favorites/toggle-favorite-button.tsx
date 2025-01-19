import { Star } from "lucide-react";
import styles from './toggleFavoriteButton.module.scss'
import { useFavoritesRepository, useFileSystemRepository } from "@/entities/explorer-object";

export function ToggleFavoriteButton({
  isFavorite,
  id,
} : {
  isFavorite?: boolean;
  id: string;
}) {
  const { addToFavorite, deleteFromFavorite } = useFavoritesRepository();
  const { query } = useFileSystemRepository();

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      await deleteFromFavorite(id);
      query.refetch();
      return;
    }

    await addToFavorite(id);
    query.refetch();
  }

  return (
    <button
      className={styles['favorite-button']}
      onClick={handle}
    >
      <Star size={16} fill={isFavorite ? '#ffd700' : 'none'} />
    </button>
  )
}