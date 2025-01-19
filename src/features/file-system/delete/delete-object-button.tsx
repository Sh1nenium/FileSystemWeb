import { Trash } from "lucide-react";
import styles from './deleteObjectButton.module.scss';
import { useFileSystemRepository } from "@/entities/explorer-object";

export function DeleteObjectButton({
  id
}: {
  id: string
}) {
  const { deleteObject } = useFileSystemRepository();

  const handle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await deleteObject(id);
  }

  return (
    <button
      className={styles['delete-button']}
      onClick={handle}
    >
      <Trash size={16} />
    </button>
  );
}