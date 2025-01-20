import { Trash } from 'lucide-react';
import styles from './deleteTagButton.module.scss';
import { useTagsRepository } from '@/entities/tags';

export function DeleteTagButton({
  id,
} : {
  id: string;
}) {
  const { deleteTag } = useTagsRepository();

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await deleteTag(id);
  }

  return (
    <button
      className={styles['delete-button']}
      onClick={handle}
    >
      <Trash size={16} />
    </button>
  )
}