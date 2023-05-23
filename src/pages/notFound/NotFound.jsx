import style from './not-found.module.scss';

const NotFound = () => {
  return (
    <div className="container">
      <div className={style.wrapp}>
        <h1>Oops!</h1>
        <p>
        It looks like this page doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;