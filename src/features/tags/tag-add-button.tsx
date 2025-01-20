import { Tag } from 'lucide-react'; 
import styles from './tagAddButton.module.scss';
import { useModal } from '@/shared/utils/modal';

export function TagAddButton({
  id,
  renderModal
}: {
  id: string;
  renderModal?: (id: string, isOpen: boolean, onClose: () => void) => React.ReactNode
}) {
  const { isOpen, onClose, onOpen } = useModal();

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    onOpen();
  }

  return (
    <button className={styles['add-tag-button']} onClick={handle}>
      <Tag size={24} />
      {renderModal?.(id, isOpen.value, onClose)}
    </button>
  );
}