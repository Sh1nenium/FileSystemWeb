import { Field, Input, Label } from "@headlessui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import styles from './styles/uiInput.module.scss'
import clsx from "clsx";

type UiInputProps<T extends FieldValues> = {
  label?: string;
  className?: string;
  placeholder?: string
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> & UseControllerProps<T> 

export function UiInput<T extends FieldValues>({
  label,
  className,
  placeholder,
  icon,
  ...props
}: UiInputProps<T>) {
  const { field } = useController({ ...props });

  return (
    <Field className={clsx(className, styles['ui-input'])}>
      {label && <Label>{label}</Label>}
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <Input
          {...field}
          placeholder={placeholder}
          autoComplete="off"
          type={props.type ?? 'text'}
        />
      </div>
    </Field>
  );
}