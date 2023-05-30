import style from './general-info-list.module.scss';

const GeneralInfoList = ({ 
  title, 
  production_countries, 
  place_of_birth, 
  birthday, 
  deathday, 
  status, 
  first_air_date,
  release_date,
  air_date,
  episode_run_time,
  season_number,
  runtime,
  episode_number
}) => {
  return (
    <ul className={style.list_info}>
      { title && <li>{ title }</li> }
      { season_number && <li>{season_number === '0' ? 'Special' : `Season ${season_number}`}</li> }
      { episode_number && <li>{`Episode ${episode_number}`}</li> }
      { production_countries?.map(({ name }, i) => <li key={i}>{name}</li>) }
      { status && <li>{status}</li>}
      { release_date && <li>{release_date.slice(0, 4)}</li> }
      { first_air_date && <li>{first_air_date.slice(0, 4)}</li> }
      { air_date && <li>{air_date.slice(0, 4)}</li> }
      { episode_run_time && <li>{episode_run_time?.[0]}min</li> }
      { Boolean(runtime) && <li>{runtime}min</li> }
      { place_of_birth && <li>{place_of_birth}</li> }
      {
        birthday && 
          <li>
            { birthday?.split('-').reverse().join('.') }
            { deathday && ` - ${deathday.split('-').reverse().join('.')}` }
          </li>
      }
    </ul>
  );
}

export default GeneralInfoList;