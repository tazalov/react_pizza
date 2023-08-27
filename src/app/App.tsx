import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Preloader } from '../components'
import { MainLayout } from '../layout/MainLayout'
import '../styles/scss/app.scss'

const Home = lazy(() => import('../pages/home'))
const Cart = lazy(() => import('../pages/cart'))
const Error = lazy(() => import('../pages/error'))

export const App = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route path={''} element={<Home />} />
          <Route path={'cart'} element={<Cart />} />
          <Route path={'*'} element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
