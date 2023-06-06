import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer';
import { getFromStorage } from '../../services/localStorage';

function Profile() {
  const history = useHistory();
  const emailFromStorage = getFromStorage('user') || ({ email: '' });
  const { email } = emailFromStorage;

  const cleanLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageTitle="Profile" />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ () => history.push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ () => cleanLocalStorage() }
          data-testid="profile-logout-btn"
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
