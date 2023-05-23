import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import KnownFor from './knownFor/KnownFor';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SocialLinks from '../../components/socialLinks/SocialLinks';
import Photos from './photos/Photos';
import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchDataByid } from '../../store/slices/fetchDataSlice';

import style from './info-actor.module.scss';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import GeneralInfoList from '../../components/generalInfoList/GeneralInfoList';
import Overview from '../../components/overview/Overview';

const InfoActor = () => {
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.fetchData);
  const { id } = useParams();

  const params = { type: 'person', id };

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchDataByid({ type: 'person', id }));
  }, [dispatch, id]);

  if (info.loading) {
    return <Loading page />
  }

  if (info.status) {
    return <Error status={info.status.message} page />
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
            <Breadcrumb />

            <h1>{info.res.name}</h1>

            <GeneralInfoList 
              place_of_birth={info.res.place_of_birth}
              birthday={info.res.birthday}
              deathday={info.res.deathday}
            />

            <SocialLinks {...params} />
            <Overview biography={info.res.biography} />
            <Photos id={id} />
            <KnownFor id={id} />
          </div>
        </>
      }
    </section>
  );
}

export default InfoActor;