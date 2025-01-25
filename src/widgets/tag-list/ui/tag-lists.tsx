import { useFileSystemRepository } from "@/entities/explorer-object";
import { TagItemPanel, useTagsRepository } from "@/entities/tags"
import { DeleteTagButton } from "@/features/tags/buttons/delete-tag-button";
import { EditTagButton } from "@/features/tags/buttons/edit-tag-button";
import { EditTagForm } from "@/features/tags/forms/edit-tag-form";
import { UiModal } from "@/shared/ui/ui-modal";
import styles from './tagLists.module.scss'
import _ from "lodash"
import { useState } from "react";

interface TagListsProps {
  objectId: string;
  className?: string;
}

export function TagLists({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {
  const { applyTag, objects, removeTag } = useFileSystemRepository();
  const { tags } = useTagsRepository();

  const objectTags = objects?.find(item => item.id === objectId)?.tags || [];
  const objectTagIds = objectTags.map(tag => tag.id);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleClick = async (isActive: boolean, tagId: string) => {
    try {
      setLoadingId(tagId);
      if (isActive) {
        await removeTag({ objectId, tagId });
      } else {
        await applyTag({ objectId, tagId });
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className={className}>
      {_.map(tags, (tag) => {
        const isActive = _.includes(objectTagIds, tag.id);
        return <TagItemPanel 
          className={styles['tag-item-panel']}
          onClick={() => handleClick(isActive, tag.id)}
          key={tag.id} 
          tag={tag} 
          isActive={isActive}
          renderEditbutton={() => 
            <EditTagButton 
              id={tag.id} 
              renderModal={(id, isOpen, onClose) => (
                <UiModal
                  isOpen={isOpen}
                  onClose={onClose}
                  title={() => "Редактировать тэг"}
                  renderContent={() => <EditTagForm id={id} onClose={onClose} tag={tag}/>}
                />
              )}/>}
          renderDeleteButton={() => <DeleteTagButton id={tag.id} />}
        />
      })}
    </div>
  )
}