import React from 'react';
import './styles/scss/app.scss';
import { Header } from './layout/header/Header';
import { Main } from './layout/main/Main';
import { Categories } from './components/categories/Categories';
import { Sorted } from './components/sorted/Sorted';
import { PizzaBlock } from './components/pizza-block/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main>
        <div className="content__top">
          <Categories />
          <Sorted />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
          <PizzaBlock />
        </div>
      </Main>
    </div>
  );
}

export default App;
