import { Edit, Trash2 } from "lucide-react";
import styles from "./tagItemPanelNew.module.scss";
import { Tag } from "../model/types";

interface TagItemPanelPropsNew {
  tag: Tag;
  renderDelete: (id: string) => void;
  renderEdit: (id: string) => void;
  className?: string;
  loadingId?: string | null;
}

export function TagItemPanelNew({
  tag,
  renderDelete,
  renderEdit,
  className = "",
  loadingId,
}: TagItemPanelPropsNew) {
  const isProcessing = loadingId === tag.id;

  return (
    <div className={`${styles["tag-item"]} ${className}`} data-processing={isProcessing}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{tag.name}</span>
          <span className={styles.description}>{tag.description}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={() => renderDelete(tag.id)}
          disabled={isProcessing}
          title="Удалить тег"
        >
          <Trash2 size={16} />
        </button>
        <button
          className={styles.editButton}
          onClick={() => renderEdit(tag.id)}
          disabled={isProcessing}
          title="Редактировать тег"
        >
          <Edit size={16} />
        </button>
      </div>
    </div>
  );
}
