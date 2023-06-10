import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import VideoFrame from '../VideoFrame/VideoFrame';

export default function RecipeContent(props) {
  // History
  // const history = useHistory();
  // const { pathname } = history.location;
  const [ingredients, setIngredients] = useState([]);
  // food
  const { food } = props;
  const type = food.idMeal ? 'meals' : 'drinks';

  useEffect(() => {
    if (food) {
      const newIngredients = Object.keys(food)
        .filter((key) => key.includes('strIngredient') && food[key])
        .map((key) => {
          const measureKey = key.replace('strIngredient', 'strMeasure');
          return {
            ingredient: food[key],
            measure: food[measureKey] || '',
          };
        });

      setIngredients(newIngredients);
    }
  }, [food]);

  const renderIngredients = () => (
    <div className="recipe-ingredients">
      {ingredients.map(({ ingredient, measure }, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <input type="checkbox" name="" id="" disabled />
          {`${ingredient} - ${measure}`}
        </label>
      ))}
    </div>
  );

  return (
    <div className={ `${type}Page` }>
      <p
        data-testid="recipe-title"
      >
        {food.strMeal || food.strDrink}

      </p>
      <img
        src={ food.strMealThumb || food.strDrinkThumb }
        alt={ food.strMeal || food.strDrink }
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-category"
      >
        { `${food.strCategory} - ${food.strAlcoholic}`}

      </p>
      {renderIngredients()}
      <p data-testid="instructions">{food.strInstructions}</p>
      {type === 'meals' && <VideoFrame food={ food } />}
    </div>
  );
}

RecipeContent.propTypes = {
  food: PropTypes.shape({
    idMeal: PropTypes.number,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;
