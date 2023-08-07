import React, { useState } from 'react';

type CategoriesPT = {
  // Добавьте свойства пропсов здесь
};

export function Categories(props: CategoriesPT) {
  const categories = [
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'Meat',
    },
    {
      id: 2,
      name: 'Vegetarian',
    },
    {
      id: 3,
      name: 'Grill',
    },
    {
      id: 4,
      name: 'Sharp',
    },
    {
      id: 5,
      name: 'Closed',
    },
  ];

  const [categoryNum, setCategoryNum] = useState<number>(0);

  const changeCategory = (n: number) => setCategoryNum(n);

  return (
    <div className="categories">
      <ul>
        {categories.map((el) => (
          <li
            key={el.id}
            className={categoryNum === el.id ? 'active' : ''}
            onClick={() => changeCategory(el.id)}>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
