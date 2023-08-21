import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import emptyCart from '../../assets/img/empty-cart.png'

export const EmptyCart: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty</h2>
      <p>
        Most likely, you haven't ordered pizza yet.
        <br />
        To order a pizza, go to the main page.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <NavLink to="/" className="button button--black">
        <span>Go back</span>
      </NavLink>
    </div>
  )
}
