import load from '../../../assets/img/pizza-logo.svg';
import './preloader.scss';

type PreloaderPT = {
  // Добавьте свойства пропсов здесь
};

export function Preloader(props: PreloaderPT) {
  const styled = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <div style={styled}>
      <div className={'preloader'}>
        <img width="180" src={load} alt="load" />
      </div>
    </div>
  );
}
