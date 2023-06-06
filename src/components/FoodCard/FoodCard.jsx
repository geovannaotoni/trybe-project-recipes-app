import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../services/helpers';

export default function FoodCard(props) {
  // History
  const history = useHistory();
  const { location: { pathname } } = history;
  // const path = API_URL.toParam(pathname);
  // const pathCap = API_URL.toCapitalize(pathname);
  const foodType = API_URL.toSingleParam(pathname);
  // console.log(props); --> results e index
  const { index, result } = props;
  return (
    <div
      className="FoodCard"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        style={ { width: '100px' } }
        data-testid={ `${index}-card-img` }
        src={ result[`str${foodType}Thumb`] }
        alt={ result[`str${foodType}`] }
      />
      <h4
        data-testid={ `${index}-card-name` }
      >
        { result[`str${foodType}`] }
      </h4>
    </div>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number,
  result: PropTypes.shape,
}.isRequired;
