import { X } from 'lucide-react'; // Иконка для удаления
import clsx from 'clsx';
import styles from './tagItem.module.scss';

export function TagItem({
  name,
  onRemove,
  className,
}: {
  name: string;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx(styles['tag-item'], className)}>
      <span className={styles['name']}>{name}</span>
      {onRemove && (
        <button className={styles['remove-button']} onClick={onRemove}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}