import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function FoodCard(props) {
  // History
  const history = useHistory();
  const { result, testCard, testTitle, testImg } = props;
  const foodType = result.idMeal ? 'meals' : 'drinks';
  const redirectToDetail = () => {
    history.push(`/${foodType}/${result.idMeal || result.idDrink}`);
  };

  // Retorno visual
  return (
    <button
      className="FoodCard"
      data-testid={ testCard }
      style={ {
        border: '1px solid black',
      } }
      onClick={ redirectToDetail }
    >
      <img
        style={ { maxWidth: '40vw' } }
        data-testid={ testImg }
        src={ result.strMealThumb || result.strDrinkThumb }
        alt={ result.strMeal || result.strDrink }
      />
      <p
        data-testid={ testTitle }
      >
        { result.strMeal || result.strDrink }
      </p>
    </button>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number,
  result: PropTypes.shape,
}.isRequired;
