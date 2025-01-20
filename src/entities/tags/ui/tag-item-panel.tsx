import clsx from "clsx";
import { Tag } from "../model/types";
import styles from './tagItemPanel.module.scss'

export function TagItemPanel({
  tag,
  isActive,
  className,
  onClick,
  renderDeleteButton,
  renderEditbutton,
} : {
  tag: Tag;
  className?: string;
  isActive?: boolean;
  onClick?: () => void
  renderDeleteButton?: () => React.ReactNode
  renderEditbutton?: () => React.ReactNode
}) {
  return (
    <div className={clsx(
        className,
        styles['tag-item-panel'],
        isActive && styles['active']
      )} 
        onClick={onClick}>
      <div className={styles['tag-item']}>
        <span className={styles['name']}>{tag.name}</span>
      </div>
      <div className={styles['buttons']}>
        {renderEditbutton?.()}
        {renderDeleteButton?.()}
      </div>
    </div>
  )
}