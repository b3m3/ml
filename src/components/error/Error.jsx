import style from './error.module.scss';

const Error = ({ status }) => {
  return (
    <div className={style.wrapp}>
      {status}
    </div>
  );
}

export default Error;