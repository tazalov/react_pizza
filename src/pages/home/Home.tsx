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
import { setCategoryId, setSortType, toggleDescOrder, SortT } from '../../redux/slice/filterSlice';
import axios from 'axios';

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

type HomePT = {};

export function Home({}: HomePT) {
  const dispatch = useDispatch();

  const { categoryId, sort: sortType, descOrder } = useSelector((state: RootState) => state.filter);

  const changeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const changeSortType = (sort: SortT) => {
    dispatch(setSortType(sort));
  };
  const changeDescOrder = () => {
    dispatch(toggleDescOrder());
  };

  const [pizzas, setPizzas] = useState<PizzaT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    const order = `order=${descOrder ? 'desc' : 'asc'}`;
    const category = categoryId ? `category=${categoryId}` : '';
    const sort = sortType.property;
    const searchValue = search ? `&title=${search}` : '';
    setIsLoading(true);
    axios
      .get<PizzaT[]>(
        `https://64d38ae867b2662bf3dc6592.mockapi.io/api/items?page=${currentPage}&limit=4&${order}&${category}&sortBy=${sort}${searchValue}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType.property, descOrder, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} changeId={changeCategoryId} />
        <Sorted
          type={sortType}
          changeType={changeSortType}
          descOrder={descOrder}
          toggleDescOrder={changeDescOrder}
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
