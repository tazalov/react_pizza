import React, { useEffect, useState } from 'react';
import './styles/scss/app.scss';
import { Header } from './layout/header/Header';
import { Main } from './layout/main/Main';
import { Categories } from './components/categories/Categories';
import { Sorted } from './components/sorted/Sorted';
import { PizzaBlock } from './components/pizza-block/PizzaBlock';
import { Preloader } from './components/common/preloader/Preloader';

type PizzaT = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

function App() {
  const [pizzas, setPizzas] = useState<PizzaT[]>([]);

  useEffect(() => {
    fetch('https://64d38ae867b2662bf3dc6592.mockapi.io/api/items', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Main>
        <div className="content__top">
          <Categories />
          <Sorted />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {pizzas.length ? pizzas.map((el) => <PizzaBlock key={el.id} {...el} />) : <Preloader />}
        </div>
      </Main>
    </div>
  );
}

export default App;
