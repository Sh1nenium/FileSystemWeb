import { Plus } from "lucide-react";
import { UiButton } from "@/shared/ui";
import styles from './addButton.module.scss'
import { UiModal } from "@/shared/ui/ui-modal";
import { useModal } from "@/shared/utils/modal";
import { useLocation } from "react-router-dom";
import { AddFileForm } from "../form/add-file-form";

export function AddFileButton() {
  const { isOpen, onClose, onOpen } = useModal();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleClick = () => {
    onOpen()
  }

  return (
    <UiButton className={styles['add-button']} onClick={handleClick}>
      <Plus size={16} />
      <span>Добавить файл</span>
      <UiModal
        isOpen={isOpen.value}
        onClose={onClose}
        title={() => "Добавить файл"}
        renderContent={() => <AddFileForm parentFolderId={id ?? ''} onClose={onClose}/>}
      />
    </UiButton>
  );
}