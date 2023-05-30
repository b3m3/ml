import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchDiscover } from '../../store/slices/fetchDataSlice';
import { getTypeFromPathname } from '../../utils/functions';
import { MdOutlineFilterList, MdOutlineFilterListOff } from 'react-icons/md';

import SortBy from './sortBy/SortBy';
import SelectCategory from './selectCategory/SelectCategory';

import style from './filters.module.scss';
import Genres from './genres/Genres';
import Rating from './rating/Rating';
import ReleaseDate from './releaseDate/ReleaseDate';

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsUrl, setOptionsUrl] = useState(null);
  const [options, setOptions] = useState({ sort_by: '', genres: [], rating: '', release_date: '' });
  
  const { filters, page } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const FilterBtnIcon = isOpen ? MdOutlineFilterListOff : MdOutlineFilterList;

  const type = getTypeFromPathname();

  const getParam = useCallback((param) => {
    const index = filters?.indexOf(param);
    return index !== -1 ? filters?.slice(index + param.length).split('&').shift() : '';
  }, [filters]);

  useEffect(() => {
    const { sort_by, genres, rating, release_date } = options; 
    
    const isSort = `${sort_by ? `&sort_by=${sort_by}&vote_count.gte=25` : ''}`;
    const isGenres = `${Boolean(genres[0]) ? `&with_genres=${genres}` : ''}`;
    const isRatingMin = `${rating?.min ? `&vote_average.gte=${rating?.min}` : ''}`;
    const isRatingMax = `${rating?.max ? `&vote_average.lte=${rating?.max}` : ''}`;
    const isReleaseDateMin = `${release_date?.min ? `&primary_release_date.gte=${release_date?.min}` : ''}`;
    const isReleaseDateMax = `${release_date?.max ? `&primary_release_date.lte=${release_date?.max}` : ''}`;

    const filtersUrl = isSort+isGenres+isRatingMin+isRatingMax+isReleaseDateMin+isReleaseDateMax;

    setOptionsUrl(filtersUrl);

    const doc = { filters: filtersUrl, page: page ? page : 1, type };

    dispatch(fetchDiscover(doc));
  }, [dispatch, options, page, type]);

  useEffect(() => {
    if (optionsUrl) {
      navigate(`/${type}/discover/${optionsUrl}/${page ? page : 1}`);
    }
  }, [navigate, optionsUrl, type, page]);

  useEffect(() => {
    if (filters) {
      const sort_by = getParam('&sort_by=');
      const genres = [...new Set(getParam('&with_genres=').split(','))];
      const rating_min = getParam('&vote_average.gte=');
      const rating_max = getParam('&vote_average.lte=');
      const release_date_min = getParam('&primary_release_date.gte=');
      const release_date_max = getParam('&primary_release_date.lte=');

      setOptions({
        sort_by,
        genres,
        rating: {min: rating_min, max: rating_max}, 
        release_date: {min: release_date_min, max: release_date_max}
      })
      
      setIsOpen(true);
    }
  }, [getParam, filters]);

  const handleOptions = useCallback((value) => {
    return setOptions(current => ({...current, ...value}))
  }, []);

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        {
          !isOpen && <SelectCategory />
        }      
        
        <FilterBtnIcon 
          className={style.filter_btn} 
          onClick={() => {
            setIsOpen(a => !a);
            isOpen && 
              navigate(`/${type}`);
              setOptionsUrl(null);
              setOptions({ sort_by: '', genres: [], rating: '', release_date: '' })
          }}
        />
      </div>

      {
        isOpen &&
          <div className={style.bottom}>
            <SortBy handleOptions={handleOptions} options={options}/>
            <Genres handleOptions={handleOptions} type={type} getParam={getParam} />
            <Rating handleOptions={handleOptions} getParam={getParam} />
            <ReleaseDate handleOptions={handleOptions} getParam={getParam} />
          </div>
      }
    </div>
  );
}

export default Filters;