import TrendingActors from './trendingActors/TrendingActors';
import TrendingTv from './trendingTv/TrendingTv';
import TrendingMovies from './trendingMovies/TrendingMovies';
import TrendingMoviesWeek from './trendingMoviesWeek/TrendingMoviesWeek';

import style from './Home.module.scss';
import Upcoming from './upcoming/Upcoming';

const Home = () => {
  return (
    <div className="container">
      <section className={style.home}>
        <div className={style.box}>
          <TrendingMovies />
          <TrendingMoviesWeek />
        </div>

        <Upcoming />
        <TrendingActors />
        <TrendingTv />
      </section>
    </div>
  );
}

export default Home;