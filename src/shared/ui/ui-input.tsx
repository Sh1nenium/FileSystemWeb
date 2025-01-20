import { Field, Input, Label } from "@headlessui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import styles from './styles/uiInput.module.scss'
import clsx from "clsx";

type UiInputProps<T extends FieldValues> = {
  label?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement> & UseControllerProps<T> 

export function UiInput<T extends FieldValues>({
  label,
  className,
  ...props
}: UiInputProps<T>) {
  const { field } = useController({ ...props });

  return (
    <Field className={clsx(className, styles['ui-input'])}>
      {label && <Label>{label}</Label>}
      <div className={styles.inputContainer}>
        {props.icon && (
          <div className={styles.iconDivider}>
            <span className={styles.icon}>{props.icon}</span>
            <div className={styles.divider} />
          </div>
        )}
        <Input
          {...field}
          placeholder={props.placeholder}
          autoComplete="off"
          type={props.type ?? 'text'}
          className = {styles.input}
        />
      </div>
    </Field>
  );
}