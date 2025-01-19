import { TagAddButton } from './tag-add-button';
import { TagItem } from './tag-item'; 
import styles from './tagList.module.scss';

export function TagList({
    tags,
    onRemoveTag,
    onAddTag,
  }: {
    tags: { id: string; name: string }[];
    onRemoveTag?: (tagId: string) => void;
    onAddTag?: () => void; 
  }) {
    return (
      <div className={styles['tag-list']}>
        {tags.map((tag) => (
          <TagItem
            key={tag.id}
            name={tag.name}
            onRemove={onRemoveTag ? () => onRemoveTag(tag.id) : undefined}
          />
        ))}
        {onAddTag && <TagAddButton onClick={onAddTag} />} 
      </div>
    );
  }