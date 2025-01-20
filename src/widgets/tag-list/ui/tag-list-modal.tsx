import { UiModal } from "@/shared/ui/ui-modal"
import { TagLists } from "./tag-lists"
import styles from './tagListModal.module.scss'
import { AddTagForm } from "@/features/tags/forms/add-tag-form";
import { TagAddButton } from "@/features/tags/buttons/tag-add-button";

export function TagListModal({
  objectId: objectId,
  isOpen,
  onClose
} : {
  objectId: string;
  isOpen: boolean,
  onClose: () => void
}) {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title={() => <div className={styles['title']}>
        <span>Применить тэг</span>
        <TagAddButton id={objectId} 
          renderModal={(_id, isOpen, onClose) => (
            <UiModal
              isOpen={isOpen}
              onClose={onClose}
              title={() => "Добавить тэг"}
              renderContent={() => <AddTagForm onClose={onClose}/>}
            />
          )}
        />
      </div>}
      renderContent={() => <TagLists className={styles['tag-lists']} objectId={objectId} />}
    />
  )
}