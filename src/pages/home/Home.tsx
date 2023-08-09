import { Categories } from '../../components/categories/Categories';
import { Sorted } from '../../components/sorted/Sorted';
import { Skeleton } from '../../components/pizza-block/Skeleton';
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock';
import React, { useEffect, useState } from 'react';

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

type HomePT = {
  // Добавьте свойства пропсов здесь
};

export function Home(props: HomePT) {
  const [pizzas, setPizzas] = useState<PizzaT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://64d38ae867b2662bf3dc6592.mockapi.io/api/items', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sorted />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </>
  );
}
