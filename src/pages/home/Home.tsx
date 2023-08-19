import { Categories } from '../../components/categories/Categories';
import { Sorted, sortName } from '../../components/sorted/Sorted';
import { Skeleton } from '../../components/pizza-block/Skeleton';
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock';
import { Paginator } from '../../components/common/paginator/Paginator';
import { SearchContext } from '../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setCategoryId,
  setSortType,
  toggleDescOrder,
  SortT,
  setCurrentPage,
  setFilterData,
  SetFilterAT,
} from '../../redux/slice/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

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
  const { search } = useContext(SearchContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState<PizzaT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isRequestSend = useRef<boolean>(false);
  const isAppMount = useRef<boolean>(false);

  const {
    categoryId,
    sort: sortType,
    descOrder,
    currentPage,
  } = useSelector((state: RootState) => state.filter);

  const changeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const changeSortType = (sort: SortT) => {
    dispatch(setSortType(sort));
  };
  const changeDescOrder = () => {
    dispatch(toggleDescOrder());
  };
  const changeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = () => {
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
  };

  useEffect(() => {
    if (isAppMount.current) {
      const queryString = qs.stringify({
        page: currentPage,
        category: categoryId,
        sort: sortType.property,
      });
      navigate(`?${queryString}`);
    }
    isAppMount.current = true;
  }, [categoryId, sortType.property, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      const sortItem = sortName.find((el) => el.property === params.sort);
      const filterParams: SetFilterAT = {
        page: params.page as string,
        category: params.category as string,
        sort: sortItem as SortT,
      };
      dispatch(setFilterData(filterParams));
      isRequestSend.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isRequestSend.current) getPizzas();

    isRequestSend.current = false;

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
      <Paginator changePage={changeCurrentPage} />
      {!pizzas.length && <ErrorBlock title={'Not found'} description={''} />}
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)}
      </div>
    </div>
  );
}
