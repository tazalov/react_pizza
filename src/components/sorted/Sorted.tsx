import React, { useState } from 'react';
import { SortST } from '../../redux/slice/sortSlice';

type SortedPT = {
  type: SortST;
  changeType: (sort: SortST) => void;
  descOrder: boolean;
  toggleDescOrder: () => void;
};

export function Sorted({ type, changeType, descOrder, toggleDescOrder }: SortedPT) {
  const sortName: SortST[] = [
    { id: 0, sort: { name: 'most popular', property: 'rating' } },
    { id: 1, sort: { name: 'price', property: 'price' } },
    { id: 2, sort: { name: 'title', property: 'title' } },
  ];

  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setPopupIsOpen((prev) => !prev);
  };

  const setSortedBy = (sort: SortST) => {
    togglePopup();
    changeType(sort);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          onClick={toggleDescOrder}
          style={{
            transform: descOrder ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'all 0.3s ease',
          }}
          width="20"
          height="12"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={togglePopup}>{type.sort.name}</span>
      </div>
      {popupIsOpen && (
        <div className="sort__popup">
          <ul>
            {sortName.map((el) => (
              <li
                key={el.id}
                className={el.sort.property === type.sort.property ? 'active' : ''}
                onClick={() => setSortedBy(el)}>
                {el.sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
