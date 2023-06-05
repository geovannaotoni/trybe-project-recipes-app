import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();
  // console.log(history);
  return (
    <footer
      data-testid="footer"
    >
      <button type="button" onClick={ () => history.push('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="food"
        />
      </button>
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink"
        />
      </button>
    </footer>
  );
}
export default Footer;
