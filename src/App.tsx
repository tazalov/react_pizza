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
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          <PizzaBlock title={'Margherita'} price={128} />
          <PizzaBlock title={'Pepperoni'} price={456} />
          <PizzaBlock title={'Hawaiian'} price={789} />
          <PizzaBlock title={'Meat Lovers'} price={324} />
          <PizzaBlock title={'BBQ Chicken'} price={345} />
          <PizzaBlock title={'Veggie Supreme'} price={111} />
          <PizzaBlock title={'Four Cheese'} price={555} />
          <PizzaBlock title={'Supreme'} price={222} />
          <PizzaBlock title={'Buffalo Chicken'} price={333} />
          <PizzaBlock title={'Mushroom and Olive'} price={333} />
        </div>
      </Main>
    </div>
  );
}

export default App;
