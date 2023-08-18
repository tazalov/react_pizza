import { Categories } from '../../components/categories/Categories';
import { Sorted } from '../../components/sorted/Sorted';
import { Skeleton } from '../../components/pizza-block/Skeleton';
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock';
import React, { useContext, useEffect, useState } from 'react';
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock';
import { Paginator } from '../../components/common/paginator/Paginator';
import { SearchContext } from '../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCategoryId } from '../../redux/slice/categorySlice';

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

type HomePT = {};

export function Home({}: HomePT) {
  const categoryId = useSelector((state: RootState) => state.categoryId);
  const dispatch = useDispatch();

  const changeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const [pizzas, setPizzas] = useState<PizzaT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState<SortNameT>({
    id: 0,
    name: 'most popular',
    sort: 'rating',
  });
  const [descOrder, setDescOrder] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toggleDescOrder = () => setDescOrder((prev) => !prev);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);

    const order = `order=${descOrder ? 'desc' : 'asc'}`;
    const category = categoryId ? `category=${categoryId}` : '';
    const sort = sortType.sort;
    const searchValue = search ? `&title=${search}` : '';

    fetch(
      `https://64d38ae867b2662bf3dc6592.mockapi.io/api/items?page=${currentPage}&limit=4&${order}&${category}&sortBy=${sort}${searchValue}`,
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
  }, [categoryId, sortType, descOrder, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} changeId={changeCategoryId} />
        <Sorted
          type={sortType}
          changeType={setSortType}
          descOrder={descOrder}
          toggleDescOrder={toggleDescOrder}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <Paginator changePage={setCurrentPage} />
      {!pizzas.length && <ErrorBlock title={'Not found'} description={''} />}
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </div>
  );
}
