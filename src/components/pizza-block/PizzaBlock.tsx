import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCountItemsInCart } from '../../redux/slice/cart/selectors'
import { addProduct } from '../../redux/slice/cart/slice'
import { useAppDispatch } from '../../redux/store'

type PizzaBlockPT = {
  id: number
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export const PizzaBlock: FC<PizzaBlockPT> = ({ id, title, price, imageUrl, sizes, types }) => {
  const doughTypeName = ['thin', 'thick']

  const dispatch = useAppDispatch()

  const addedCount = useSelector(selectCountItemsInCart(id))

  const [doughType, setDoughType] = useState<number>(0)

  const [sizeType, setSizeType] = useState<number>(0)

  const addPizzaInCart = () => {
    const pizza = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[sizeType],
      dough: doughTypeName[doughType],
      count: 0,
    }
    dispatch(addProduct(pizza))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map(el => (
              <li
                key={el}
                className={doughType === el ? 'active' : ''}
                onClick={() => setDoughType(el)}
              >
                {doughTypeName[el]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((el, i) => (
              <li key={i} className={sizeType === i ? 'active' : ''} onClick={() => setSizeType(i)}>
                {el} cm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} RUB</div>
          <div className="button button--outline button--add" onClick={addPizzaInCart}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add to cart</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  )
}
