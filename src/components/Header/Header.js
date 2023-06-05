import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIconImage from '../../images/profileIcon.svg';
import searchIconImage from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

function Header({ pageTitle }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const pagesToShowSearchIcon = ['/meals', '/drinks'];
  const { location: { pathname } } = history;
  return (
    <header>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img src={ profileIconImage } alt="profile-icon" data-testid="profile-top-btn" />
      </button>
      {
        pagesToShowSearchIcon.includes(pathname) && (
          <button type="button" onClick={ () => setShowInput(!showInput) }>
            <img src={ searchIconImage } alt="search-icon" data-testid="search-top-btn" />
          </button>
        )
      }
      <h1 data-testid="page-title">{pageTitle}</h1>
      {showInput && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
