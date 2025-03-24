import { useModal } from "@/shared/utils/modal";
import { PlusIcon } from "lucide-react";
import styles  from "./styles/addNewTagButton.module.scss"

export function AddNewTagButton({
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
            aria-label="Добавить новый тег"
        > 
        <PlusIcon className={styles['addIcon']} 
        onClick={handle}/>
        {renderModal?.(id, isOpen.value, onClose)}
      </button>
    );
  }