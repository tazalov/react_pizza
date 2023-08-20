import { FC } from 'react'
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock'

type ErrorPT = {
  // Добавьте свойства пропсов здесь
}

export const Error: FC<ErrorPT> = ({}) => (
  <div>
    <ErrorBlock
      title={'Page not found'}
      description={'In my opinion, you did not find what you wanted'}
    />
  </div>
)
