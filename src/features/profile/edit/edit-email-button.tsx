import { Pencil } from "lucide-react";
import styles from './editButton.module.scss'
import { useModal } from "@/shared/utils/modal";
import clsx from "clsx";
import { UiModal } from "@/shared/ui/ui-modal";
import { EditEmailForm } from "../form";

export function EditEmailButton({ className }: { className?: string }) {
  const { isOpen, onClose, onOpen } = useModal();

  const handleClick = () => {
    onOpen()
  }

  return (
    <button className={clsx(className, styles['edit-button'])} onClick={handleClick}>
      <Pencil className={styles['icon']}/>
      <UiModal
        isOpen={isOpen.value}
        onClose={onClose}
        title="Изменить почту"
        renderContent={() => <EditEmailForm onClose={onClose}/>}
      />
    </button>
  )
}