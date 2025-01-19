import { Trash } from 'lucide-react';
import styles from './deleteTagButton.module.scss';
import { useModal } from '@/shared/utils/modal';

export function DeleteTagButton({
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
      className={styles['delete-button']}
      onClick={handle}
    >
      <Trash size={16} />
      {renderModal?.(id, isOpen.value, onClose)}
    </button>
  )
}