import { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import arrowLeft from '../../assets/img/grey-arrow-left.svg'
import { EmptyCart, PizzaBlockCart } from '../../components'
import { selectCart } from '../../redux/slice/cart/selectors'
import { clearCart } from '../../redux/slice/cart/slice'
import { useAppDispatch } from '../../redux/store'

export const Cart: FC = () => {
  const dispatch = useAppDispatch()

  const removeAllItemsInCart = () => {
    if (window.confirm('Are you sure you want to remove all pizzas?')) {
      dispatch(clearCart())
    }
  }

  const { totalPrice, items } = useSelector(selectCart)
  const countItems = items.reduce((acc, el) => acc + el.count, 0)

  return (
    <div className="container container--cart">
      {items.length ? (
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">Cart</h2>
            <div className="cart__clear" onClick={removeAllItemsInCart}>
              <span>Remove cart</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((el, i) => (
              <PizzaBlockCart
                key={i}
                id={el.id}
                title={el.title}
                imageUrl={el.imageUrl}
                price={el.price}
                dough={el.dough}
                size={el.size}
                count={el.count}
              />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Total pizzas: <b>{countItems}</b>
              </span>
              <span>
                Total price: <b>{totalPrice} RUB</b>{' '}
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <NavLink to="/" className="button button--outline button--add go-back-btn">
                <img src={arrowLeft} alt="goBack" />
                <span>Go back</span>
              </NavLink>
              <div className="button pay-btn">
                <span>Pay now</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}
