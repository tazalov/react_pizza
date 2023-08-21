import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Main } from './main/Main'

export const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  )
}
