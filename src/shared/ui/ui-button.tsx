import { Button } from "@headlessui/react";
import styles from './styles/uiButton.module.scss'
import clsx from "clsx";
import React from "react";

export function UiButton({
  className,
  children,
  ...props
} : {
  className?: string,
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...props} className={clsx(className, styles['ui-button'])}>
      {children}
    </Button>
  )
}