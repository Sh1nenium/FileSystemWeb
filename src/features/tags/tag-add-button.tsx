import { Plus } from 'lucide-react'; 
import styles from './tagAddButton.module.scss';

export function TagAddButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <button className={styles['add-tag-button']} onClick={onClick}>
      <Plus size={16} />
    </button>
  );
}