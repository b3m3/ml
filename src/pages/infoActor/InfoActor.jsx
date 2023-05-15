import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Poster from '../../components/poster/Poster';
import KnownFor from './knownFor/KnownFor';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SocialLinks from '../../components/socialLinks/SocialLinks';
import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchDataByid } from '../../store/slices/fetchDataSlice';

import style from './info-actor.module.scss';
import Photos from './photos/Photos';

const InfoActor = () => {
  const [fullBiography, setFullBiography] = useState(false);

  const dispatch = useDispatch();
  const { info } = useSelector(state => state.fetchData);
  const { id } = useParams();

  const params = { type: 'person', id };

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchDataByid({ type: 'person', id }));
  }, [dispatch, id]);

  if (info.loading) {
    return <Loading />
  }

  if (info.status) {
    return <Error status={info.status.message} />
  }

  return (
    <section className={style.wrapp}>
      {
        info.res &&
        <>
          <div className={style.left}>
            <Poster url={info.res.profile_path} size={'original'} />
          </div>

          
          <div className={style.right}>
            <h1>{info.res.name}</h1>
            
            <ul className={style.info}>
              {
                info.res.place_of_birth && <li>{info.res.place_of_birth}</li>
              }
              {
                info.res.birthday && 
                  <li>
                    {info.res.birthday?.split('-').reverse().join('.')}
                    {info.res.deathday && ` - ${info.res.deathday.split('-').reverse().join('.')}`}
                  </li>
              }
            </ul>

            <SocialLinks {...params} />

            {
              info.res.biography && 
                <div className={style.biography}>
                  <h5>Biography</h5>
                  <p
                    style={fullBiography ? {WebkitLineClamp: 'unset'} : null}
                    onClick={() => setFullBiography(a => !a)}
                  >
                    {info.res.biography}
                  </p>
                </div>
            }

            <Photos id={id} />
            <KnownFor id={id} />
          </div>
        </>
      }
    </section>
  );
}

export default InfoActor;