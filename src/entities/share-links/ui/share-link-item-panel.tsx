import { ShareLink } from "@/entities/explorer-object/model/types";
import { useState } from "react";
import styles from "./shareLinkItemPanel.module.scss"
import { ShareRights } from "@/entities/explorer-object/model/types";
import {  Edit, EditIcon, EyeIcon, LockIcon, Trash2, TrashIcon } from "lucide-react";


interface ShareLinkItemPanelProps {
  shareLink: ShareLink;
  onDelete: (id: string) => void;
  className?: string;
  loadingId?: string | null;
}

export function ShareLinkItemPanel({
  shareLink,
  onDelete,
  className,
  loadingId
}: ShareLinkItemPanelProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const isProcessing = loadingId === shareLink.id;
    const fullLink = `http://localhost:5173/link/resolve?id=${shareLink.id}`;
  
    const handleCopy = () => {
      navigator.clipboard.writeText(fullLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  };

  
    return (
      <div 
        className={`${styles['share-link-item']} ${className}`}
        data-processing={isProcessing}
      >
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <button
              onClick={handleCopy}
              className={styles.linkButton}
              title="Copy to clipboard"
              disabled={isProcessing}
            >
              <span className={styles.linkText}>
                {fullLink}
              </span>
            </button>
          </div>
          
          <div className={styles.metaInfo}>
            <span className={styles.days}>
              Время до истечения: {shareLink.daysToExpire} дней
            </span>
          </div>
          
            <div className={styles.rightsContainer}>
                {shareLink.rights & ShareRights.Read ? (
                    <span className={`${styles.rightBadge} ${styles.read}`}>
                    <EyeIcon className={styles.rightIcon} /> Чтение
                    </span>
                ) : null}

                {shareLink.rights & ShareRights.Write ? (
                    <span className={`${styles.rightBadge} ${styles.write}`}>
                    <EditIcon className={styles.rightIcon} /> Запись
                    </span>
                ) : null}

                {shareLink.rights & ShareRights.Delete ? (
                    <span className={`${styles.rightBadge} ${styles.delete}`}>
                    <TrashIcon className={styles.rightIcon} /> Удаление
                    </span>
                ) : null}

                {shareLink.rights === ShareRights.None && (
                    <span className={`${styles.rightBadge} ${styles.none}`}>
                    <LockIcon className={styles.rightIcon} /> Нет прав
                    </span>
                )}
            </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.deleteButton}
            onClick={() => onDelete(shareLink.id)}
            disabled={isProcessing}
          >
            <Trash2 size={16}></Trash2>
          </button>
          <button 
            className={styles.editButton}
            disabled={isProcessing}
          >
            <Edit size={16}></Edit>
          </button>
        </div>
      </div>
    );
  }
  
  function serializeShareRights(rights: ShareRights): string {
    if (rights === ShareRights.None) {
      return "Нет прав"; // Возвращаем понятное сообщение, если прав нет
    }
  
    const rightsArray: string[] = [];
    if (rights & ShareRights.Read) rightsArray.push("Чтение");
    if (rights & ShareRights.Write) rightsArray.push("Запись");
    if (rights & ShareRights.Delete) rightsArray.push("Удаление");
  
    return rightsArray.join(", "); // Возвращаем права через запятую
  }
  function deserializeShareRights(rightsString: string): ShareRights {
    let rights = ShareRights.None;
    const rightsArray = rightsString.split(", ");
    if (rightsArray.includes("Чтение")) rights |= ShareRights.Read;
    if (rightsArray.includes("Запись")) rights |= ShareRights.Write;
    if (rightsArray.includes("Удаление")) rights |= ShareRights.Delete;
    return rights;
  }