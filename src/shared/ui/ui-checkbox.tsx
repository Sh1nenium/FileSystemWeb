import React from "react";
import clsx from "clsx"; // Импортируем clsx для комбинирования классов
import styles from "./styles/uiCheckbox.module.scss";

interface UiCheckboxProps {
  label: string; // Текст рядом с чекбоксом
  checked: boolean; // Состояние чекбокса (выбран/не выбран)
  onChange: (checked: boolean) => void; // Обработчик изменения состояния
  disabled?: boolean; // Отключение чекбокса
  className?: string; // Дополнительные классы для контейнера
}

export function UiCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}: UiCheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className={clsx(styles["checkbox-container"], className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles["checkbox-input"]}
      />
      <span className={styles["checkbox-custom"]}></span>
      {label && <span className={styles["checkbox-label"]}>{label}</span>}
    </label>
  );
}