type CategoriesPT = {
  id: number;
  changeId: (id: number) => void;
};

export function Categories({ id, changeId }: CategoriesPT) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Sharp', 'Closed'];

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
  );
}
