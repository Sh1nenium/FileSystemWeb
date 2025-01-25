import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import styles from './styles/uiModal.module.scss'
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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
}) 
{

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          className={clsx(className, styles["ui-modal"])}
          open={isOpen}
          onClose={onClose}
          static // Чтобы избежать ошибок с анимациями
        >
          {/* Затемнение фона */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Контент модального окна */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, y: -20 }} // Начальное состояние (прозрачность 0 и смещение вверх)
            animate={{ opacity: 1, y: 0 }} // Анимация появления (прозрачность 1 и без смещения)
            exit={{ opacity: 0, y: -20 }} // Анимация исчезновения (прозрачность 0 и смещение вверх)
            transition={{ duration: 0.3 }} // Длительность анимации
          >
            <DialogPanel className={styles["content"]}>
              <DialogTitle className={styles["title"]}>
                <span>{title?.()}</span>
              </DialogTitle>
              {renderContent?.()}
            </DialogPanel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}