import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage, setOnStorage } from '../../services/localStorage';
import RecipeBottomButton from '../RecipeBottomButton/RecipeBottomButton';
import VideoFrame from '../VideoFrame/VideoFrame';

export default function RecipeContent(props) {
  // History
  const history = useHistory();
  const { pathname } = history.location;
  const [ingredients, setIngredients] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // food
  const { food } = props;
  const type = food.idMeal ? 'meals' : 'drinks';
  // showVideo const
  const isInProgress = pathname.includes('progress');
  const showVideo = type === 'meals' && !isInProgress;

  // styleChecked
  const style = { textDecoration: 'line-through solid rgb(0, 0, 0)' };

  useEffect(() => {
    if (food) {
      let inProgressIng;
      if (isInProgress) {
        const inProgressRecipes = getFromStorage('inProgressRecipes');
        inProgressIng = inProgressRecipes
          ? inProgressRecipes[type][food.idMeal || food.idDrink] : [];
        console.log(inProgressRecipes, inProgressIng);
      }
      const newIngredients = Object.keys(food)
        .filter((key) => key.includes('strIngredient') && food[key])
        .map((key) => {
          const measureKey = key.replace('strIngredient', 'strMeasure');
          return {
            ingredient: food[key],
            measure: food[measureKey] || '',
            isChecked: isInProgress
            && inProgressIng
            && inProgressIng.some((ing) => ing === food[key]),
          };
        });

      setIngredients(newIngredients);
    }
  }, [food, isInProgress, type]);

  useEffect(() => {
    if (isInProgress) {
      setButtonDisabled(!ingredients.every(({ isChecked }) => isChecked));
    }
  }, [ingredients, isInProgress]);

  const saveProgressInLS = (arrayIng) => {
    const inProgressRecipes = getFromStorage('inProgressRecipes')
    || { drinks: {}, meals: {} };
    inProgressRecipes[type][food.idMeal || food.idDrink] = arrayIng
      .filter((ing) => ing.isChecked)
      .map(({ ingredient }) => ingredient);
    setOnStorage('inProgressRecipes', inProgressRecipes);
  };

  const handleCheck = ({ target }) => {
    console.log('target.value', target.value);

    setIngredients((prev) => {
      const newIng = prev.map((ing, index) => {
        if (index === +target.value) {
          return { ...ing, isChecked: !ing.isChecked };
        }
        return ing;
      });
      saveProgressInLS(newIng);
      return newIng;
    });
  };

  const renderIngredients = () => (
    <div className="recipe-ingredients">
      <p>{buttonDisabled.toString()}</p>
      {ingredients.map(({ ingredient, measure, isChecked }, index) => (
        <label
          key={ index }
          data-testid={ isInProgress
            ? `${index}-ingredient-step`
            : `${index}-ingredient-name-and-measure` }
          style={ isChecked ? style : {} }
          htmlFor={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `${index}-ingredient-step` }
            checked={ isChecked }
            data-testid={ `${index}-ingredient-step` }
            disabled={ !isInProgress }
            value={ index }
            onChange={ handleCheck }
          />
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
        { `${type === 'meals' ? food.strCategory : food.strAlcoholic}`}

      </p>
      {renderIngredients()}
      <p data-testid="instructions">{food.strInstructions}</p>
      {showVideo && <VideoFrame food={ food } />}
      <RecipeBottomButton
        food={ food }
        buttonDisabled={ buttonDisabled }
      />
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
