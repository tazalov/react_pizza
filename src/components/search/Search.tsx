import s from './Search.module.scss';
import searchIcon from '../../assets/img/icons8-search.svg';
import closeIcon from '../../assets/img/icons8-close.svg';
import { ChangeEvent, useContext } from 'react';
import { SearchContext } from '../../App';

type SearchPT = {};

export function Search({}: SearchPT) {
  const { search, setSearch } = useContext(SearchContext);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const onClickClearHandler = () => {
    setSearch('');
  };
  return (
    <div className={s.root}>
      <div className={s.search}>
        <img src={searchIcon} alt="" />
      </div>
      <input
        className={s.input}
        placeholder={'Find your pizzas!'}
        value={search}
        onChange={onChangeHandler}
      />
      {search && (
        <div className={s.clear} onClick={onClickClearHandler}>
          <img src={closeIcon} alt="" />
        </div>
      )}
    </div>
  );
}
