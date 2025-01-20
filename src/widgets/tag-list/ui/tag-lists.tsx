import { useFileSystemRepository } from "@/entities/explorer-object";
import { TagItemPanel, useTagsRepository } from "@/entities/tags"
import { DeleteTagButton } from "@/features/tags/delete-tag-button";
import { EditTagButton } from "@/features/tags/edit-tag-button";
import { EditTagForm } from "@/features/tags/edit-tag-form";
import { UiModal } from "@/shared/ui/ui-modal";
import styles from './tagLists.module.scss'
import _ from "lodash"

export function TagLists({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {
  const { applyTag, objects, removeTag } = useFileSystemRepository();
  const { tags } = useTagsRepository();

  const objectTagIds = _.map(objects?.find((item) => item.id === objectId)?.tags, (tag) => tag.id);

  const handleClick = async (isActive: boolean, tagId: string) => {
    if (isActive) {
      await removeTag({
        objectId,
        tagId
      })

      return;
    }

    await applyTag({
      objectId,
      tagId,
    });
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