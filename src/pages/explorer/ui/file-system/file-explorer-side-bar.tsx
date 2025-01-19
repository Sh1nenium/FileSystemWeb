import clsx from "clsx"
import styles from './fileExplorerSideBar.module.scss'
import { UiDivider } from "@/shared/ui/ui-divider"
import { useFavoritesRepository } from "@/entities/explorer-object/model/favorite.repository"
import { File, Folder, Star, X } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FileExplorerSideBar({
  className,
} : {
  className?: string
}) {
  const navigate = useNavigate();
  const { favorites, deleteFromFavorite } = useFavoritesRepository();

  const [filter, setFilter] = useState<"File" | "Folder" | "All">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredFavorites = favorites?.filter((item) => {
      if (filter === "All") 
        return true; 

      return item.type === filter; 
  });

  filteredFavorites?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name); 
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleRemoveFavorite = (id: string) => {
    deleteFromFavorite(id);
  };

  const hadnleClick = (id: string) => {
    navigate('?id=' + id);
  }

  return (
    <aside className={clsx(className, styles['file-explorer-side-bar'])}>
      <div className={styles['title']}>
        <span className={styles['star-icon']}>
          <Star size={16} fill="#ffd700" color="#ffd700" />
        </span>
        <span>Избранное</span>
      </div>
      <UiDivider orientation="horizontal" />

      <div className={styles['filter-buttons']}>
        <button
          className={filter === "All" ? styles['active'] : ''}
          onClick={() => setFilter("All")}
        >
          Все
        </button>
        <button
          className={filter === "File" ? styles['active'] : ''}
          onClick={() => setFilter("File")}
        >
          Файлы
        </button>
        <button
          className={filter === "Folder" ? styles['active'] : ''}
          onClick={() => setFilter("Folder")}
        >
          Папки
        </button>
      </div>


      <div className={styles['sort-buttons']}>
        <button
          className={sortOrder === "asc" ? styles['active'] : ''}
          onClick={() => setSortOrder("asc")}
        >
          По возрастанию (А-Я)
        </button>
        <button
          className={sortOrder === "desc" ? styles['active'] : ''}
          onClick={() => setSortOrder("desc")}
        >
          По убыванию (Я-А)
        </button>
      </div>

      {filteredFavorites?.length === 0 ? (
        <p className={styles['empty-message']}>Список избранного пуст</p>
      ) : (
        <div className={styles['favorites-list']}>
          {filteredFavorites?.map((item) => (
            <div key={item.id} className={styles['favorite-item']} onClick={() => hadnleClick(item.id)}>
              <span className={styles['type']}>
                {item.type === 'File' ? <File size={16} /> : <Folder size={16} />}
              </span>
              <span className={styles['name']}>{item.name}</span>
              <button
                className={styles['remove-button']}
                onClick={() => handleRemoveFavorite(item.id)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}