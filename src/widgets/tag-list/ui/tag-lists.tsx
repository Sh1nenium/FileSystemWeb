import { useFileSystemRepository } from "@/entities/explorer-object";
import { TagItemPanel, useTagsRepository } from "@/entities/tags"
import { removeTagApi } from "@/shared/api/file-system/remove-tag";
import _ from "lodash"

export function TagLists({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {
  const { applyTag, objects } = useFileSystemRepository();
  const { tags } = useTagsRepository();

  const objectTagIds = _.map(objects?.find((item) => item.id === objectId)?.tags, (tag) => tag.id);

  const handleClick = async (isActive: boolean) => {
    if (isActive) {
      await removeTagApi({
        objectId,
        tagId: objectId
      })
    }

    await applyTag({
      objectId,
      tagId: objectId
    });
  }

  return (
    <div className={className}>
      {_.map(tags, (tag) => {
        const isActive = _.includes(objectTagIds, tag.id);
        return <TagItemPanel onClick={() => handleClick(isActive)} key={tag.id} tag={tag} isActive={isActive}/>
      })}
    </div>
  )
}