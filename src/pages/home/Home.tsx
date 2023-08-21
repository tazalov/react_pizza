import qs from 'qs'
import { FC, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../app/App'
import { Categories } from '../../components/categories/Categories'
import { Paginator } from '../../components/common/paginator/Paginator'
import { ErrorBlock } from '../../components/errorBlock/ErrorBlock'
import { PizzaBlock } from '../../components/pizza-block/PizzaBlock'
import { Skeleton } from '../../components/pizza-block/Skeleton'
import { Sorted, sortName } from '../../components/sorted/Sorted'
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  SetFilterAT,
  setFilterData,
  setSortType,
  SortT,
  toggleDescOrder,
} from '../../redux/slice/filterSlice'
import { fetchPizzas, selectPizzas } from '../../redux/slice/pizzasSlice'
import { AppDispatch } from '../../redux/store'

export const Home: FC = () => {
  const { search } = useContext(SearchContext)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const isRequestSend = useRef<boolean>(false)
  const isAppMount = useRef<boolean>(false)

  const { categoryId, sort: sortType, descOrder, currentPage } = useSelector(selectFilter)
  const { items, status, error } = useSelector(selectPizzas)

  const changeCategoryId = (id: number) => {
    dispatch(setCategoryId(id))
  }
  const changeSortType = (sort: SortT) => {
    dispatch(setSortType(sort))
  }
  const changeDescOrder = () => {
    dispatch(toggleDescOrder())
  }
  const changeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page))
  }
  const getPizzas = async () => {
    const order = `order=${descOrder ? 'desc' : 'asc'}`
    const category = categoryId ? `category=${categoryId}` : ''
    const sort = sortType.property
    const searchValue = search ? `&title=${search}` : ''
    const action = fetchPizzas({
      order,
      category,
      sort,
      searchValue,
      currentPage,
    })

    dispatch(action)
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
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1))
      const sortItem = sortName.find(el => el.property === params.sort)
      const filterParams: SetFilterAT = {
        page: params.page as string,
        category: params.category as string,
        sort: sortItem as SortT,
      }
      dispatch(setFilterData(filterParams))
      isRequestSend.current = true
    }
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
      ) : (
        <>
          <Paginator changePage={changeCurrentPage} />
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : items.map(el => <PizzaBlock key={el.id} {...el} />)}
          </div>
        </>
      )}
    </div>
  )
}
