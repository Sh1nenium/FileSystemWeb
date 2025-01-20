import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import styles from './styles/uiModal.module.scss'
import clsx from "clsx";

export function UiModal({
  className,
  title,
  isOpen,
  onClose,
  renderContent
} : {
  className?: string;
  title?: () => React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  renderContent?: () => React.ReactNode
}) {
  return (
    <Dialog className={clsx(className, styles['ui-modal'])} open={isOpen} onClose={onClose}>
      <DialogPanel className={styles['content']}>
        <DialogTitle className={styles['title']}>
          <span>{title?.()}</span>
        </DialogTitle>
        {renderContent?.()}
      </DialogPanel>
    </Dialog>
  )
}