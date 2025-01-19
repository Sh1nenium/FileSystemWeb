import { File, Folder, Star, Trash } from 'lucide-react'; // Иконки для файла, папки, избранного и удаления
import styles from './fileSystemItem.module.scss';
import { FileModel, FileSystemObject, FolderModel } from '@/entities/explorer-object';
import { TagList } from '../tags/tag-list';

export function FileSystemItem({
  item,
  onClick,
  onRemoveTag,
  onAddTag,
  onToggleFavorite,
  onDelete,
}: {
  item: FileSystemObject;
  onClick?: () => void;
  onRemoveTag?: (tagId: string) => void;
  onAddTag?: () => void;
  onToggleFavorite?: (itemId: string) => void; // Функция для добавления/удаления из избранного
  onDelete?: (itemId: string) => void; // Функция для удаления элемента
}) {
  const isFolder = item.type === 'Folder';

  return (
    <div className={styles['item']} onClick={onClick}>
      <div className={styles['icon']}>
        {isFolder ? <Folder size={20} /> : <File size={20} />}
      </div>
      <div className={styles['details']}>
        <div className={styles['header']}>
          <span className={styles['name']}>
            {item.name}
            {item.isFavorite && <Star size={16} className={styles['favorite-icon']} />}
          </span>
          {!isFolder && (
            <span className={styles['description']}>
              {(item as FileModel).description}
            </span>
          )}
        </div>
        <div className={styles['info']}>
          {isFolder && (
            <span className={styles['content-count']}>
              {(item as FolderModel).objectCount ?? 0} элементов
            </span>
          )}
          <span className={styles['size']}>
            {!isFolder && formatSize(item.sizeInBytes)}
          </span>
          <span className={styles['created']}>{formatDate(item.createdAt)}</span>
        </div>
        <TagList tags={item.Tags} onRemoveTag={onRemoveTag} onAddTag={onAddTag} />
      </div>
      <div className={styles['actions']}>
        <button
          className={styles['favorite-button']}
          onClick={(e) => {
            e.stopPropagation(); 
            onToggleFavorite?.(item.id);
          }}
        >
          <Star size={16} fill={item.isFavorite ? '#ffd700' : 'none'} />
        </button>
        <button
          className={styles['delete-button']}
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete?.(item.id);
          }}
        >
          <Trash size={16} /> {}
        </button>
      </div>
    </div>
  );
}

// Вспомогательные функции для форматирования
const formatSize = (size: number) => {
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} КБ`;
  return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};