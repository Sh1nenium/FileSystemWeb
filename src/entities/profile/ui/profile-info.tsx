import React from "react"
import { User } from "../model/types"
import _ from 'lodash';
import clsx from "clsx"
import styles from './profileInfo.module.scss'

type Field = {
  label: string
  value?: string
  feature?: React.ReactNode
}

export function ProfileInfo({
  className,
  user,
  login,
  renderEditInitials,
  renderEditEmail
} : {
  className?: string
  user?: User,
  login? : string,
  renderEditInitials?: () => React.ReactNode
  renderEditEmail?: () => React.ReactNode
}) {
  const fields: Field[] = [
    { label: 'Логин', value: login },
    { label: 'Имя и Фамилия', value: `${user?.name ?? ''} ${user?.surname ?? 'Не заполнено'}`, feature: renderEditInitials?.() },
    { label: 'Email', value: user?.email, feature: renderEditEmail?.() },
  ]

  return (
    <div className={clsx(className, styles['profile-info'])}>
      {_.map(fields, (field, index) => (
        <div className={styles['field']} key={field.label}>
          <div className={styles['content']}>
            <span className={styles[`label-${index}`]}>{field.label}</span>
            <span className={styles[`value-${index}`]}>{_.isEmpty(field.value?.trim()) ? 'Не заполнено' : field.value}</span>
          </div>
          <div className={styles['feature']}>
            {field.feature}
          </div>
        </div>
      ))}
    </div>
  )
}
