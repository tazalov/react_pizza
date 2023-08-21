import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import closeIcon from '../../assets/img/icons8-close.svg'
import searchIcon from '../../assets/img/icons8-search.svg'
import { setSearchValue } from '../../redux/slice/filterSlice'
import s from './Search.module.scss'

export const Search: FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const updateSearchValue = useCallback(
    debounce(str => dispatch(setSearchValue(str)), 300),
    [],
  )

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    updateSearchValue(e.currentTarget.value)
  }
  const onClickClearHandler = () => {
    setValue('')
    dispatch(setSearchValue(''))
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
