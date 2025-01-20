import { UiModal } from "@/shared/ui/ui-modal";
import { useModal } from "@/shared/utils/modal";
import { Pencil } from "lucide-react";
import { EditObjectForm } from "../form/edit-object-form";
import styles from './editObjectButton.module.scss';

export function EditObjectButton({
  id,
  type,
  parentFolderId,
  name,
  description
} : {
  name: string,
  description: string,
  id: string,
  type: "File" | "Folder"
  parentFolderId?: string
}) {
  const { isOpen, onClose, onOpen } = useModal();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    onOpen();
  }

  return (
    <button onClick={handleClick} className={styles['edit-button']}>
      <Pencil size={24}/>
      <UiModal
        isOpen={isOpen.value}
        onClose={onClose}
        title={() => `Изменить ${type === 'File' ? 'файл' : 'папку'}`}
        renderContent={() => <EditObjectForm
          type={type} 
          parentFolderId={parentFolderId} 
          id={id} 
          onClose={onClose}
          description={description} name={name}/>}
      />
    </button>
  )
}