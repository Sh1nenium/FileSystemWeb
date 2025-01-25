import { UiModal } from "@/shared/ui/ui-modal"
import { ShareLinkList } from "./share-link-list";
import styles from "./shareLinkListModal.module.scss"
import { PlusIcon } from "lucide-react";
import { AddShareLinkButton } from '../../../features/share-link/add-share-link-button';
import { AddShareLinkForm } from "@/features/share-link/forms/share-link-form";

export function ShareLinkModal({
  objectId: objectId,
  isOpen,
  onClose
} : {
  objectId: string;
  isOpen: boolean,
  onClose: () => void
}) {
    const handleAddLink = () => {
        console.log('Добавление новой ссылки для объекта:', objectId);
      };

      return (
        <UiModal
          isOpen={isOpen}
          className={styles['modal']}
          onClose={onClose}
          title={() => (
            <div className={styles['title']}>
              <span>Ссылки доступа</span>
              <AddShareLinkButton
                id={""}
                renderModal={(id, isOpen, onClose) => (
                                <UiModal
                                  isOpen={isOpen}
                                  onClose={onClose}
                                  title={() => "Добавить ссылку"}
                                  renderContent={() => <AddShareLinkForm parentFolderId={id} onClose={onClose} />}
                                />
                              )}
              />
            </div>
          )}
          renderContent={() => (
            <ShareLinkList 
              className={styles['share-link-list']} 
              objectId={objectId} 
            />
          )}
        />
      );
}