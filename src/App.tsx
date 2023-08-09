import './styles/scss/app.scss';
import { Header } from './layout/header/Header';
import { Main } from './layout/main/Main';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Error } from './pages/error/Error';
import { Cart } from './pages/cart/Cart';

function App() {
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
  );
}

export default App;
