import clsx from "clsx";
import { Tag } from "../model/types";
import styles from './tagItemPanel.module.scss'

export function TagItemPanel({
  tag,
  isActive,
  onClick,
  renderDeleteButton,
  renderEditbutton,
} : {
  tag: Tag;
  isActive?: boolean;
  onClick?: () => void
  renderDeleteButton?: () => React.ReactNode
  renderEditbutton?: () => React.ReactNode
}) {
  return (
    <div className={clsx(
        styles['tag-item-panel'],
        isActive && styles['active']
      )} 
        onClick={onClick}>
      <div className={styles['tag-item']}>
        <span className={styles['name']}>{tag.name}</span>
      </div>
      <div className={styles['buttons']}>
        {renderDeleteButton?.()}
        {renderEditbutton?.()}
      </div>
    </div>
  )
}