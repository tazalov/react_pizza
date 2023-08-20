import { FC, ReactNode } from 'react'

type MainPT = {
  children: ReactNode
}

export const Main: FC<MainPT> = ({ children }) => <main className="content">{children}</main>
