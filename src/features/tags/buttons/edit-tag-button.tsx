import { Pencil } from 'lucide-react';
import styles from './styles/editTagButton.module.scss';
import { useModal } from '@/shared/utils/modal';

export function EditTagButton({
  id,
  renderModal
} : {
  id: string;
  renderModal?: (id: string, isOpen: boolean, onClose: () => void) => React.ReactNode
}) {
  const { isOpen, onClose, onOpen } = useModal();

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    onOpen();
  }

  return (
    <button
      className={styles['edit-button']}
      onClick={handle}
    >
      <Pencil size={16} />
      {renderModal?.(id, isOpen.value, onClose)}
    </button>
  )
}