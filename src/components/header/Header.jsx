import SelectCategory from './selectCategory/SelectCategory';

import style from './header.module.scss';
import Search from './search/Search';
import CurrentTime from './currentTime/CurrentTime';
import User from './user/User';

// const links = [
//   {name: 'Home', path: '/'},
//   {name: 'Movies', path: '/movie'},
//   {name: 'Tv shows', path: '/tv'},
//   {name: 'Actors', path: '/person'}
// ]

// const activeColor = {color: 'var(--blue-900)'};

// const checkIsActive = (actionTrue, actionFalce) => {
//   return ({isActive}) => isActive ? actionTrue : actionFalce;
// }

// <nav className={style.navbar}>
// <ul>
//   {
//     links.map(({ name, path }, i) => {
//       return (
//         <li key={i}>
//           <NavLink 
//             to={path}
//             style={checkIsActive(activeColor, null)}
//             className={checkIsActive(style.active, '')}
//           >
//             {name}
//           </NavLink>
//         </li>
//       )
//     })
//   }
// </ul>
// </nav>

const Header = () => {
  return (
    <div className="container">
      <header className={style.wrapp}>
        <div className={style.col}>
          <SelectCategory />
          <Search />
        </div>
        <div className={style.col}>
          <User />
          <CurrentTime />
        </div>
      </header>
    </div>
  );
}

export default Header;