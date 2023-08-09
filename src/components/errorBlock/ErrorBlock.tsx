import s from './ErrorBlock.module.scss';

type ErrorBlockPT = {
  title: string;
  description: string;
};

export function ErrorBlock({ title, description }: ErrorBlockPT) {
  return (
    <div className={s.block}>
      <h1>{title} 😕</h1>
      <p className={s.description}>{description}</p>
    </div>
  );
}
