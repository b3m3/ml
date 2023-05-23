import style from './genres.module.scss';

const Genres = ({ genres }) => {
  return (
    <>
      {
        genres &&
          <ul className={style.genres}>
            {
              genres?.map(({ name }, i) => {
                return (
                  <li key={i}>{name}</li>
                )
              })
            }
          </ul>
      }
    </>
  );
}

export default Genres;