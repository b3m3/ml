import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';

import { fetchReviews } from '../../store/slices/fetchDataSlice';
import Poster from '../poster/Poster';
import { AiFillStar } from 'react-icons/ai';
import { MdCloseFullscreen, MdOpenInFull } from 'react-icons/md';

import style from './reviews.module.scss';

const Reviews = ({ type, id }) => {
  const [commentsHeight, setCommentsHeight] = useState([]);
  const [commentOpen, setCommentOpen] = useState(null);

  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.fetchData);

  useEffect(() => {
    dispatch(fetchReviews({ type, id }));
  }, [dispatch, type, id]);
  
  const refComment = useRef([]);

  useEffect(() => {
    const arr = [];

    refComment.current.map(el => el && arr.push(el.scrollHeight))

    if (arr.length) {
      setCommentsHeight(arr);
    }
  }, [refComment, reviews]);

  return (
    <>
      {
        Boolean(reviews?.res?.results.length) &&
          <div className={style.wrapp}>
            <h5>Reviews</h5>

            <ul>
              {
                reviews?.res?.results.map(({ id, content, created_at, author_details }, i) => {
                  const { avatar_path, name, username, rating } = author_details && author_details;

                  const isHttp = avatar_path && avatar_path.indexOf('http') === 1;

                  return (
                    <li 
                      key={id}
                      onClick={() => setCommentOpen(a => a === i ? null : i)}
                      style={commentOpen === i ? {height: (commentsHeight[i] + 40), WebkitLineClamp: 'unset'} : null}
                    >
                      <div className={style.image}>
                        {
                          isHttp 
                            ? <img src={avatar_path.slice(1)} alt={username} />
                            : <Poster url={avatar_path} size={'w92'} />
                        }
                      </div>

                      <div className={style.body}>

                        <span className={style.icon}>
                          {
                            commentOpen === i
                              ? <MdOpenInFull />
                              : <MdCloseFullscreen />
                          }
                        </span>

                        <div className={style.row}>
                          <h4>{name ? name : username}</h4>
                          <span>
                            <Moment date={created_at} format='D MMM YYYY' />
                          </span>
                          {
                            rating &&
                              <span>
                                <AiFillStar />
                                {rating}
                              </span>
                          }
                        </div>

                        {
                          content &&
                            <p 
                              ref={el => refComment.current[i] = el}
                              style={commentOpen === i ? {WebkitLineClamp: 'unset'} : null}
                            >
                              {content}
                            </p>
                        }
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
      }
    </>
  );
}

export default Reviews;