import { useRoutes } from 'react-router-dom';

import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import TvShows from '../pages/tvShows/TvShows';
import Movies from '../pages/movies/Movies';
import Actors from '../pages/actors/Actors';
import Favorites from '../pages/favorites/Favorites';
import InfoMovie from '../pages/infoMovie/InfoMovie';
import InfoTvShows from '../pages/infoTvShows/InfoTvShows';
import InfoActor from '../pages/infoActor/InfoActor';
import NotFound from '../pages/notFound/NotFound';
import TvSeason from '../pages/tvSeason/TvSeason';
import TvEpisode from '../pages/tvEpisode/TvEpisode';
import Search from '../pages/search/Search';

const Router = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: 'login', element: <Login /> },
    { 
      path: 'movie',
      children: [
        { index: true, element: <Movies /> },
        { path: ':id', element: <InfoMovie /> },
        { path: ':category/:page', element: <Movies /> },
        { path: 'search/:query/:page', element: <Search /> }
      ]
    },
    { 
      path: 'tv',
      children: [
        { index: true, element: <TvShows /> },
        { path: 'search/:query/:page', element: <Search /> },
        { 
          path: ':id', 
          children: [
            { index: true, element: <InfoTvShows /> },
            { 
              path: 'season/:season_number',
              children: [
                { index: true, element: <TvSeason /> },
                { path: 'episode/:episode_number', element: <TvEpisode /> }
              ]
            }
          ]
        },
        { path: ':category/:page', element: <TvShows /> },
      ] 
    },
    { 
      path: 'person',
      children: [
        { index: true, element: <Actors /> },
        { path: ':id', element: <InfoActor /> },
        { path: 'popular/:page', element: <Actors /> },
        { path: 'search/:query/:page', element: <Search /> }
      ] 
    },
    { 
      path: 'favorite', 
      children: [
        { index: true, element: <Favorites /> },
        { path: ':type', element: <Favorites /> }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])
}

export default Router;