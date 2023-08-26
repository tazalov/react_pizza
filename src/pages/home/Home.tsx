import qs from 'qs'
import { FC, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Categories } from '../../components/categories/Categories'
import { Paginator } from '../../components/common/paginator/Paginator'
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock'
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock'
import { Skeleton } from '../../components/pizza-block/Skeleton'
import { Sorted, sortName } from '../../components/sorted/Sorted'
import { selectFilter } from '../../redux/slice/filter/selectors'
import {
  setCategoryId,
  setCurrentPage,
  setFilterData,
  setSortType,
  toggleDescOrder,
} from '../../redux/slice/filter/slice'
import { SetFilterAT, SortT } from '../../redux/slice/filter/types'
import { selectPizzas } from '../../redux/slice/pizzas/selectors'
import { fetchPizzas } from '../../redux/slice/pizzas/slice'
import { useAppDispatch } from '../../redux/store'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isRequestSend = useRef<boolean>(false)
  const isAppMount = useRef<boolean>(false)

  const {
    categoryId,
    sort: sortType,
    descOrder,
    currentPage,
    searchValue: search,
  } = useSelector(selectFilter)
  const { items, status, error } = useSelector(selectPizzas)

  const changeCategoryId = useCallback((id: number) => {
    dispatch(setCategoryId(id))
    dispatch(setCurrentPage(1))
  }, [])

  const changeSortType = useCallback((sort: SortT) => {
    dispatch(setSortType(sort))
  }, [])

  const changeDescOrder = useCallback(() => {
    dispatch(toggleDescOrder())
  }, [])

  const changeCurrentPage = useCallback((page: number) => {
    dispatch(setCurrentPage(page))
  }, [])

  const getPizzas = async () => {
    const order = `&order=${descOrder ? 'desc' : 'asc'}`
    const category = categoryId ? `&category=${categoryId}` : ''
    const sort = `&sortBy=${sortType.property}`
    const searchValue = search ? `&title=${search}` : ''
    dispatch(
      fetchPizzas({
        order,
        category,
        sort,
        searchValue,
        currentPage,
      }),
    )
  }

  useEffect(() => {
    if (isAppMount.current) {
      const queryString = qs.stringify({
        page: currentPage,
        category: categoryId,
        sort: sortType.property,
      })
      navigate(`?${queryString}`)
    }
    isAppMount.current = true
  }, [categoryId, sortType.property, currentPage])

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.slice(1))
      const sortItem = sortName.find(el => el.property === params.sort)
      const filterParams: SetFilterAT = {
        page: params.page as string,
        category: params.category as string,
        sort: sortItem as SortT,
      }
      dispatch(setFilterData(filterParams))
      isRequestSend.current = true
    }
    isRequestSend.current = false
  }, [])

  useEffect(() => {
    if (!isRequestSend.current) getPizzas()

    isRequestSend.current = false

    window.scrollTo(0, 0)
  }, [categoryId, sortType.property, descOrder, search, currentPage])

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
      {status === 'error' ? (
        <ErrorBlock title={error} description={''} />
      ) : items.length ? (
        <>
          {categoryId === 0 && <Paginator changePage={changeCurrentPage} />}
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : items.map(el => <PizzaBlock key={el.id} {...el} />)}
          </div>
        </>
      ) : (
        <ErrorBlock title={'Not found'} description={'Sorry'} />
      )}
    </div>
  )
}
