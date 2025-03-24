import styles from "./tagList.module.scss"
import _ from "lodash"
import { ShareLinkItemPanel } from "@/entities/share-links/ui/share-link-item-panel";
import { Tag, TagItemPanel, useTagsRepository } from "@/entities/tags";
import { TagItemPanelNew } from "@/entities/tags/ui/tag-item-panel-new";
import { useFileSystemRepository } from "@/entities/explorer-object";

export function TagListNew({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {

      const { applyTag, objects, removeTag } = useFileSystemRepository();
      const { tags } = useTagsRepository();
      const { deleteTag } = useTagsRepository();

      const objectTags = objects?.find(item => item.id === objectId)?.tags || [];
      const objectTagIds = objectTags.map(tag => tag.id);
    
  
  console.log(tags);

  const handleDelete = async (id: string) => {
    await deleteTag(id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit link:', id);
  };

  return (
    <div className={`${styles['tag-list']} ${className}`}>
      {_.map((tags), tag => (
        <TagItemPanelNew
          tag={tag}
          renderDelete={handleDelete}
          renderEdit={handleEdit}
        />
      ))}
    </div>
  );
}
