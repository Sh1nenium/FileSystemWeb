import clsx from "clsx";
import styles from './fileExplorerSideBar.module.scss';
import { UiDivider } from "@/shared/ui/ui-divider";
import { useFavoritesRepository } from "@/entities/explorer-object/model/favorite.repository";
import { File, Folder, Star, X, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from '@headlessui/react';

export function FileExplorerSideBar({
  className,
}: {
  className?: string;
}) {
  const navigate = useNavigate();
  const { favorites, deleteFromFavorite } = useFavoritesRepository();

  const [filter, setFilter] = useState<"File" | "Folder" | "All">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredFavorites = favorites?.filter((item) => {
    if (filter === "All") return true;
    return item.type === filter;
  });

  filteredFavorites?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleRemoveFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    deleteFromFavorite(id);
  };

  const handleClick = (id: string) => {
    navigate('?id=' + id);
  };

  return (
    <aside className={clsx(className, styles['file-explorer-side-bar'])}>
      <div className={styles['title']}>
        <span className={styles['star-icon']}>
          <Star size={28} fill="#ffd700" color="#ffd700" />
        </span>
        <span>Избранное</span>
      </div>
      <UiDivider orientation="horizontal" />

      <div className={styles['controls']}>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className={clsx(styles['popover-button'], { [styles['active']]: open })}>
                <Filter size={18} />
                Фильтры
              </Popover.Button>
              <Popover.Panel className={styles['popover-content']}>
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
              </Popover.Panel>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className={clsx(styles['popover-button'], { [styles['active']]: open })}>
                {sortOrder === "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                Сортировка
              </Popover.Button>
              <Popover.Panel className={styles['popover-content']}>
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
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>

      {filteredFavorites?.length === 0 ? (
        <p className={styles['empty-message']}>Список избранного пуст</p>
      ) : (
        <div className={styles['favorites-list']}>
          {filteredFavorites?.map((item) => (
            <div key={item.id} className={styles['favorite-item']} onClick={() => handleClick(item.id)}>
              <span className={styles['type']}>
                {item.type === 'File' ? <File size={18} /> : <Folder size={18} />}
              </span>
              <span className={styles['name']}>{item.name}</span>
              <button
                className={styles['remove-button']}
                onClick={(e) => handleRemoveFavorite(item.id, e)}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}