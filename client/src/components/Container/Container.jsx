import style from './Container.module.scss';

const Container = ({ children, title, filter, setFilteredValue }) => {
  return (
    <header className={style.header}>
      <div className={style.title}>
        {title}{' '}
        {filter && (
          <select className={style.filter} onChange={(e) => setFilteredValue(e.target.value)}>
            <option value=''>All</option>
            <option value='Pending'>Pending</option>
            <option value='Interview'>Interview</option>
            <option value='Offer'>Offer</option>
            <option value='Declined'>Declined</option>
          </select>
        )}
      </div>{' '}
      <div className={style.summary}>{children}</div>
    </header>
  );
};

export default Container;
