import { File, Info } from "lucide-react";
import styles from './infoObjectButton.module.scss';
import { useModal } from "@/shared/utils/modal";

export function InfoObjectButton({
  id,
  renderModal
}: {
  id: string
  renderModal?: (id: string, isOpen: boolean, onClose: () => void) => React.ReactNode
}) {

    const { isOpen, onClose, onOpen } = useModal();
    const handle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpen();
      }
    

  return (
    <button
      className={styles['info-object-button']}
      onClick={handle}
    >
      <Info size={24} />
      {renderModal?.(id, isOpen.value, onClose)}
    </button>
  );
}