import { useModal } from "@/shared/utils/modal";
import styles from "./addShareLinkButton.module.scss"
import { PlusIcon } from "lucide-react";

export function AddShareLinkButton({
    renderModal,
    id
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
        <button
        className={styles['addButton']}
        
        aria-label="Добавить новую ссылку"
        > 
        <PlusIcon className={styles['addIcon']} 
        onClick={handle}/>
        {renderModal?.(id, isOpen.value, onClose)}
      </button>
    );
  }