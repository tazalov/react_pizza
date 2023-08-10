import { ReactNode } from 'react';

type MainPT = {
  children: ReactNode;
};

export function Main({ children }: MainPT) {
  return <main className="content">{children}</main>;
}
