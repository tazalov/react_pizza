import { Route, Routes } from 'react-router-dom'
import { Header } from '../layout/header/Header'
import { Main } from '../layout/main/Main'
import { Cart } from '../pages/cart/Cart'
import { Error } from '../pages/error/Error'
import { Home } from '../pages/home/Home'
import '../styles/scss/app.scss'

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main>
        <Routes>
          <Route index path={'/'} element={<Home />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'*'} element={<Error />} />
        </Routes>
      </Main>
    </div>
  )
}
