import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IMG_ROOT } from '../../../constants/api';
import { fetchPersonPhotos } from '../../../store/slices/personSlice';

import { MdKeyboardArrowUp } from 'react-icons/md';

import style from './photos.module.scss';
import Poster from '../../../components/poster/Poster';

const Photos = ({ id }) => {
  const [photosLength, setPhotosLength] = useState(7);

  const dispatch =  useDispatch();
  const { photos } = useSelector(state => state.person);

  useEffect(() => {
    dispatch(fetchPersonPhotos({ id }));
  }, [dispatch, id]);

  const totalPhotos = photos?.res?.profiles.length;

  return (
    <>
      {
        Boolean(photos.res?.profiles.length) &&
        <div className={style.wrapp}>
          <h5>Photos</h5>

          <ul>
            {
              photos.res?.profiles?.slice(0, photosLength).map(({ file_path }, i) => {  
                return (
                  <li key={file_path}>
                    <a 
                      href={`${IMG_ROOT}/original${file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Poster url={file_path} size={'w500'} />
                    </a>

                    {
                      photosLength === 7 && i === 6 && totalPhotos > 7 &&
                        <button className={style.more} onClick={() => setPhotosLength(totalPhotos)}>
                          +{photosLength && totalPhotos - photosLength}
                        </button>
                    }
                  </li>
                )
              })
            }

            {
              photosLength > 7 && 
                <li className={style.less} onClick={() => setPhotosLength(7)}>
                  <button title='less' ><MdKeyboardArrowUp /></button>
                </li>
            }
          </ul>
        </div>
      }
    </>
  );
}

export default Photos;