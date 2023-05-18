import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuth } from './store/slices/authSlice';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

import Router from './routes/Router';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const { isActivePage } = useSelector(state => state.activePage);

  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);

  const appStyle = isActivePage ? {gridTemplate: 'auto / 1fr'} : null;
  const appMainStyle = isActivePage ? {gridColumn: 'unset'} : null;

  return (
    <BrowserRouter>
      <div className="App" style={appStyle}>
        <Sidebar />

        <div className="App-main" style={appMainStyle}>
          <Header />
          <Router />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
