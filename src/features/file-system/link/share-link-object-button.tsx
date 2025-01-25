import { Link } from "lucide-react";
import styles from './shareLinkObjectButton.module.scss';
import { useModal } from "@/shared/utils/modal";

export function ShareLinkObjectButton({
  id,
  renderModal
}: {
  renderModal?: (id: string, isOpen: boolean, onClose: () => void) => React.ReactNode
  id: string
}) {
  
  const { isOpen, onClose, onOpen } = useModal();
  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    onOpen();
  }

  return (
    <button
      className={styles['share-link-button']}
      onClick={handle}
    >
     {renderModal?.(id, isOpen.value, onClose)}
      <Link size={24} />
    </button>
  );
}