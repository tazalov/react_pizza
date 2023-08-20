import load from '../../../assets/img/pizza-logo.svg'
import './preloader.scss'

export const Preloader = () => {
  const styled = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
  return (
    <div style={styled}>
      <div className={'preloader'}>
        <img width="180" src={load} alt="load" />
      </div>
    </div>
  )
}
