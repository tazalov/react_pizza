import { FC } from 'react'

type CategoriesPT = {
  id: number
  changeId: (id: number) => void
}

export const Categories: FC<CategoriesPT> = ({ id, changeId }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed']

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li key={i} className={id === i ? 'active' : ''} onClick={() => changeId(i)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}
