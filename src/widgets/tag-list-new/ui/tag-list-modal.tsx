import { UiModal } from "@/shared/ui/ui-modal"

import styles from "./tagListModal.module.scss"

import { AddShareLinkButton } from '../../../features/share-link/add-share-link-button';
import { AddShareLinkForm } from "@/features/share-link/forms/share-link-form";
import { TagListNew } from "./tag-list";
import { AddNewTagButton } from "@/features/tags/buttons/add-new-tag-button";
import { AddTagForm } from "@/features/tags/forms/add-tag-form";

export function TagListModalNew({
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
          className={styles['modal']}
          onClose={onClose}
          title={() => (
            <div className={styles['title']}>
              <span>Метки</span>
              <AddNewTagButton
                id={""}
                renderModal={(id, isOpen, onClose) => (
                                <UiModal
                                  isOpen={isOpen}
                                  onClose={onClose}
                                  title={() => "Создать метку"}
                                  renderContent={() => <AddTagForm onClose={onClose} />}
                                />
                            )}
              />
            </div>
          )}
          renderContent={() => (
            <TagListNew 
              className={styles['tag-list']} 
              objectId={objectId} 
            />
          )}
        />
      );
}