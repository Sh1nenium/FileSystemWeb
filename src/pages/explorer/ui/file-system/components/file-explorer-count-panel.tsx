import clsx from "clsx";
import styles from "./fileExplorerCountPanel.module.scss"
import { useFileSystemRepository } from "@/entities/explorer-object";

export function FileExplorerCountPanel({
    className,
  }: {
    className?: string;
  }) {

    const { count } = useFileSystemRepository();

    return (
      <div className={clsx(className, styles['count-panel'])}>
        <div className={styles['count-item']}>
          <span className={styles['count-label']}>Общий размер:</span>
          <span className={styles['count-value']}>{formatSize(count?.countBytesTotal ?? 0)}</span>
        </div>
        <div className={styles['count-item']}>
          <span className={styles['count-label']}>Количество объектов:</span>
          <span className={styles['count-value']}>{count?.countQuantityTotal ?? 0}</span>
        </div>
      </div>
    );
  }

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} Б`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} КБ`;
    return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
  };