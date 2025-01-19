import { FileSystemObject } from '@/entities/explorer-object';
import { FileSystemItem } from './file-system-item';

import styles from "./fileSystemList.module.scss"

export function FileSystemList({
  items,
  onItemClick,
}: {
  items: FileSystemObject[];
  onItemClick?: (item: FileSystemObject) => void;
}) {
  return (
    <div className={styles['list']}>
      {items.map((item) => (
        <FileSystemItem
          key={item.id}
          item={item}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
}