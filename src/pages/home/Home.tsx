import { Categories } from '../../components/categories/Categories';
import { Sorted } from '../../components/sorted/Sorted';
import { Skeleton } from '../../components/pizza-block/Skeleton';
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock';
import React, { useEffect, useState } from 'react';
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock';

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

type SortT = 'rating' | 'price' | 'title';

export type SortNameT = {
  id: number;
  name: string;
  sort: SortT;
};

type HomePT = {
  search: string;
};

export function Home({ search }: HomePT) {
  const [pizzas, setPizzas] = useState<PizzaT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categoryId, setCategoryId] = useState<number>(0);

  const [sortType, setSortType] = useState<SortNameT>({
    id: 0,
    name: 'most popular',
    sort: 'rating',
  });

  const [descOrder, setDescOrder] = useState<boolean>(false);
  const toggleDescOrder = () => setDescOrder((prev) => !prev);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://64d38ae867b2662bf3dc6592.mockapi.io/api/items?order=${descOrder ? 'desc' : 'asc'}&${
        categoryId ? 'category=' + categoryId : ''
      }&sortBy=${sortType.sort}&${search ? 'title=' + search : ''}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, descOrder, search]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} changeId={setCategoryId} />
        <Sorted
          type={sortType}
          changeType={setSortType}
          descOrder={descOrder}
          toggleDescOrder={toggleDescOrder}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {search && <ErrorBlock title={'Not found'} description={''} />}
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </div>
  );
}
