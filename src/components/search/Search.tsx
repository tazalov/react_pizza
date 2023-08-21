import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useCallback, useContext, useRef, useState } from 'react'
import { SearchContext } from '../../app/App'
import closeIcon from '../../assets/img/icons8-close.svg'
import searchIcon from '../../assets/img/icons8-search.svg'
import s from './Search.module.scss'

export const Search: FC = () => {
  const [value, setValue] = useState<string>('')
  const { setSearch } = useContext(SearchContext)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const updateSearchValue = useCallback(
    debounce(str => setSearch(str), 300),
    [],
  )

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    updateSearchValue(e.currentTarget.value)
  }
  const onClickClearHandler = () => {
    setValue('')
    setSearch('')
    searchInputRef.current?.focus()
  }

  return (
    <div className={s.root}>
      <div className={s.search}>
        <img src={searchIcon} alt="" />
      </div>
      <input
        ref={searchInputRef}
        className={s.input}
        placeholder={'Find your pizzas!'}
        value={value}
        onChange={onChangeHandler}
      />
      {value && (
        <div className={s.clear} onClick={onClickClearHandler}>
          <img src={closeIcon} alt="" />
        </div>
      )}
    </div>
  )
}
