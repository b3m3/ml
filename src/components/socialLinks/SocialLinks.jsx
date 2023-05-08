import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSocials } from '../../store/slices/fetchDataSlice';
import { FaFacebookSquare, FaTwitterSquare, FaImdb } from 'react-icons/fa';
import { TbBrandTiktok } from 'react-icons/tb';
import { RiInstagramFill } from 'react-icons/ri';

import style from './social-links.module.scss';

const SocialLinks = ({ type, id }) => {
  const dispatch =  useDispatch();
  const { socials } = useSelector(state => state.fetchData);

  useEffect(() => {
    dispatch(fetchSocials({ type, id }));
  }, [dispatch, type, id]);

  const links = [
    {name: 'facebook_id', link: 'https://www.facebook.com/', Icon: FaFacebookSquare},
    {name: 'imdb_id', link: 'https://www.imdb.com/title/', Icon: FaImdb},
    {name: 'instagram_id', link: 'https://www.instagram.com/', Icon: RiInstagramFill},
    {name: 'twitter_id', link: 'https://twitter.com/', Icon: FaTwitterSquare},
  ]

  const renderLink = (name, linkPath, Icon) => {
    if (socials.res?.[`${name}`]) {
      return (
        <li key={name}>
          <a 
            href={`${linkPath}${socials.res[`${name}`]}`} 
            target="__blank"
            rel="noopener noreferrer"
          >
            <Icon />
          </a>
        </li>
      )
    }
  }

  return (
    <ul className={style.wrapp}>
      {
        links.map(({name, link, Icon}) => renderLink(name, link, Icon))
      }
    </ul>
  );
}

export default SocialLinks;