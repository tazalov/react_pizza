import React from 'react';

type CategoriesPT = {
  // Добавьте свойства пропсов здесь
};

export function Categories(props: CategoriesPT) {
  return (
    <div className="categories">
      <ul>
        <li className="active">Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li>
      </ul>
    </div>
  );
}
