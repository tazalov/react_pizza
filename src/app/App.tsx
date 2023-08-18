import '../styles/scss/app.scss';
import { Header } from '../layout/header/Header';
import { Main } from '../layout/main/Main';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Error } from '../pages/error/Error';
import { Cart } from '../pages/cart/Cart';
import { createContext, useState } from 'react';

type SearchContextT = {
  search: string;
  setSearch: (value: string) => void;
};

export const SearchContext = createContext<SearchContextT>({
  search: '',
  setSearch: (value) => {
    console.log('SearchContext empty');
  },
});

function App() {
  const [search, setSearch] = useState<string>('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <Main>
          <Routes>
            <Route index path={'/'} element={<Home />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'*'} element={<Error />} />
          </Routes>
        </Main>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
