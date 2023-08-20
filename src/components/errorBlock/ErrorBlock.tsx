import { FC } from 'react'
import s from './ErrorBlock.module.scss'

type ErrorBlockPT = {
  title: string
  description: string
}

export const ErrorBlock: FC<ErrorBlockPT> = ({ title, description }) => (
  <div className={s.block}>
    <h1>{title} 😕</h1>
    <p className={s.description}>{description}</p>
  </div>
)
