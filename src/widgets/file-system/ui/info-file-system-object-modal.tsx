import { UiModal } from "@/shared/ui/ui-modal";
import styles from "./infoFileSystemObjectModal.module.scss"
import { FileSystemObjectInfo } from "./info-file-system-object";
import { DownloadObjectButton } from "@/features/file-system/download/download-object";
import { X } from "lucide-react";

export function FileSystemObjectInfoModal({
    objectId,
    isOpen,
    onClose
  } : {
    objectId: string;
    isOpen: boolean,
    onClose: () => void
  }) {
    return (
        <UiModal
        
          isOpen={isOpen}
          title={() => 
          <div className={styles['header']}>  
            <button className={styles['close-button']} onClick={onClose}>
              <X size={24} strokeWidth={2} />
            </button>
        </div> }
          onClose={onClose}
          renderContent={() => <FileSystemObjectInfo className="" objectId={objectId} onClose={onClose} />}
        />
      )
  }