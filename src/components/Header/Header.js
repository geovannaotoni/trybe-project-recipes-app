import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import profileIconImage from '../../images/profileIcon.svg';
import searchIconImage from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';
import logoIcon from '../../images/logoComFundo2.svg';

function Header({ pageTitle }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const pagesToShowSearchIcon = ['/meals', '/drinks'];
  const { location: { pathname } } = history;
  return (
    <header className="mainHeader">
      <div className="iconsHeader">
        <Link to="/meals" className="logoheaderDiv">
          <img src={ logoIcon } alt="Icon" className="logoHeader" />
        </Link>
        <div>
          <button type="button" onClick={ () => history.push('/profile') }>
            <img
              src={ profileIconImage }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
          {
            pagesToShowSearchIcon.includes(pathname) && (
              <button type="button" onClick={ () => setShowInput(!showInput) }>
                <img
                  src={ searchIconImage }
                  alt="search-icon"
                  data-testid="search-top-btn"
                />
              </button>
            )
          }
        </div>
      </div>
      <div className="titleHeader">
        <h1 data-testid="page-title" className={ pageTitle }>{pageTitle}</h1>
        {showInput && <SearchBar />}
      </div>
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
