import React from 'react';
import PropTypes from 'prop-types';
import profileIconImage from '../../images/profileIcon.svg';
import searchIconImage from '../../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    const { pageTitle } = this.props;
    return (
      <div>
        <img src={ profileIconImage } alt="profile-icon" data-testid="profile-top-btn" />
        <img src={ searchIconImage } alt="search-icon" data-testid="search-top-btn" />
        <h2 data-testid="page-title">{ pageTitle }</h2>
      </div>
    );
  }
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
