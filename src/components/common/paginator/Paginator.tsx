import s from './Paginator.module.scss';
import ReactPaginate from 'react-paginate';

type PaginatorPT = {
  changePage: (value: number) => void;
};

export function Paginator({ changePage }: PaginatorPT) {
  const onPageChangeHandler = (e: { selected: number }) => {
    changePage(e.selected + 1);
  };
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
  );
}
