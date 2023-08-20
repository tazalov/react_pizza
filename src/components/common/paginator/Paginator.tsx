import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import s from './Paginator.module.scss'

type PaginatorPT = {
  changePage: (page: number) => void
}

export const Paginator: FC<PaginatorPT> = ({ changePage }) => {
  const onPageChangeHandler = (e: { selected: number }) => {
    changePage(e.selected + 1)
  }
  return (
    <div className={s.wrapper}>
      <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageChangeHandler}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={10}
      />
    </div>
  )
}
