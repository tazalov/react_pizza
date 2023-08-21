import { FC } from 'react'
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock'

export const Error: FC = () => (
  <div>
    <ErrorBlock
      title={'Page not found'}
      description={'In my opinion, you did not find what you wanted'}
    />
  </div>
)
