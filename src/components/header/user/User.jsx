import style from './user.module.scss';

const User = () => {
  return (
    <div className={style.wrapp}>
      <div className={style.image}>
        <img src="https://m.media-amazon.com/images/M/MV5BMTIzNTg5MzcyNV5BMl5BanBnXkFtZTYwMzAzNzAz._V1_.jpg" alt="User avatar" />
      </div>

      <div className={style.info}>
        <p>Username</p>
        <span>userdata</span>
      </div>
    </div>
  );
}

export default User;