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
      ]
    },
    { 
      path: 'tv',
      children: [
        { index: true, element: <TvShows /> },
        { path: ':id', element: <InfoTvShows /> },
        { path: ':category/:page', element: <TvShows /> },
      ] 
    },
    { 
      path: 'person',
      children: [
        { index: true, element: <Actors /> },
        { path: ':id', element: <InfoActor /> },
        { path: 'popular/:page', element: <Actors /> },
      ] 
    },
    { path: 'favorite', element: <Favorites /> },
    { path: '*', element: <NotFound /> }
  ])
}

export default Router;