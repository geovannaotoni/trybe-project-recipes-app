import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer';
import { getFromStorage } from '../../services/localStorage';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const emailFromStorage = getFromStorage('user') || ({ email: '' });
  const { email } = emailFromStorage;

  const cleanLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="mainProfile">
      <Header pageTitle="Profile" />
      <div className="btnAreaProfile">
        <p data-testid="profile-email" className="emailprof">{email}</p>
        <div className="divbtnProf">
          <button
            onClick={ () => history.push('/done-recipes') }
            data-testid="profile-done-btn"
            className="btnDonesProf"
          >
            Done Recipes
          </button>
        </div>
        <div className="divbtnProf">
          <button
            onClick={ () => history.push('/favorite-recipes') }
            data-testid="profile-favorite-btn"
            className="btnFavProf"
          >
            Favorite Recipes
          </button>
        </div>
        <div className="divbtnProf">
          <button
            onClick={ () => cleanLocalStorage() }
            data-testid="profile-logout-btn"
            className="btnLOutProf"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
