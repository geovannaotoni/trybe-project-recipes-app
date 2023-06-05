import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drink from '../../images/drinkIcon.svg';
import meals from '../../images/mealIcon.svg';
import '../style/footer.css';

function Footer() {
  const history = useHistory();
  // console.log(history);
  return (
    <footer
      data-testid="footer"
    >
      <Link rel="stylesheet" href={ () => history.push('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ drink }
          alt="food"
        />
      </Link>
      <Link href={ () => history.push('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ meals }
          alt="drink"
        />
      </Link>
    </footer>
  );
}
export default Footer;
