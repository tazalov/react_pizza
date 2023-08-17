import './styles/scss/app.scss';
import { Header } from './layout/header/Header';
import { Main } from './layout/main/Main';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Error } from './pages/error/Error';
import { Cart } from './pages/cart/Cart';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState<string>('');
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <Main>
        <Routes>
          <Route index path={'/'} element={<Home search={search} />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'*'} element={<Error />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
