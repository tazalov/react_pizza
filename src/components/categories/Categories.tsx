import React from 'react';

type CategoriesPT = {
  // Добавьте свойства пропсов здесь
};

export function Categories(props: CategoriesPT) {
  return (
    <div className="categories">
      <ul>
        <li className="active">All</li>
        <li>Meat</li>
        <li>Vegetarian</li>
        <li>Grill</li>
        <li>Sharp</li>
        <li>Closed</li>
      </ul>
    </div>
  );
}
