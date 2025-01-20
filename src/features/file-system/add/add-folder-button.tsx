import { UiButton } from "@/shared/ui";
import { Plus } from "lucide-react";
import styles from './addButton.module.scss'
import { UiModal } from "@/shared/ui/ui-modal";
import { useModal } from "@/shared/utils/modal";
import { useLocation } from "react-router-dom";
import { AddFolderForm } from "../form/add-folder-form";

export function AddFolderButton() {
  const { isOpen, onClose, onOpen } = useModal();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleClick = () => {
    onOpen();
  }

  return (
    <UiButton className={styles['add-button']} onClick={handleClick}>
       <Plus size={16} className={styles['icon']}/>
      <span>Добавить папку</span>
      <UiModal
        isOpen={isOpen.value}
        onClose={onClose}
        title="Добавить файл"
        renderContent={() => <AddFolderForm parentFolderId={id ?? ''} onClose={onClose}/>}
      />
    </UiButton>
  );
}