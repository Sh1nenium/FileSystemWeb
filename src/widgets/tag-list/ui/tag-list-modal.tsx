import { UiModal } from "@/shared/ui/ui-modal"
import { TagLists } from "./tag-lists"
import styles from './tagListModal.module.scss'

export function TagListModal({
  id,
  isOpen,
  onClose
} : {
  id: string;
  isOpen: boolean,
  onClose: () => void
}) {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить тэги"
      renderContent={() => <TagLists className={styles['tag-lists']} objectId={id} />}
    />
  )
}