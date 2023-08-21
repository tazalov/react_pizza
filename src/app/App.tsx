import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Cart } from '../pages/cart/Cart'
import { Error } from '../pages/error/Error'
import { Home } from '../pages/home/Home'
import '../styles/scss/app.scss'

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path={''} element={<Home />} />
        <Route path={'cart'} element={<Cart />} />
        <Route path={'*'} element={<Error />} />
      </Route>
    </Routes>
  )
}
