import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage, setOnStorage } from '../../services/localStorage';
import './RecipeBottomButton.css';

const START_RECIPE_BTN = 'start-recipe-btn';

const saveAsDoneRecipe = (food) => {
  const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
    strDrinkThumb, strMealThumb, strMeal, strDrink, strTags } = food;
  const typeSingular = idMeal ? 'meal' : 'drink';
  const doneDate = new Date(Date.now()).toISOString();
  const tags = strTags ? strTags.split(',') : [];
  const favoriteRecipe = {
    id: idMeal || idDrink,
    type: typeSingular,
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strDrinkThumb || strMealThumb,
    doneDate,
    tags,
  };
  const doneRecipes = getFromStorage('doneRecipes') || []; // Pego do LS
  if (doneRecipes.length < 1) {
    setOnStorage('doneRecipes', [favoriteRecipe]);
  } else {
    // const haveRecipe = doneRecipes.some((recipe) => recipe.id === id);
    // if (!haveRecipe) {
    setOnStorage('doneRecipes', [...doneRecipes, favoriteRecipe]);
    // }
  }
};

function RecipeBottomButton(props) {
  const [textButton, setTextButton] = useState('Start Recipe');
  const [testButton, setTestButton] = useState(START_RECIPE_BTN);
  const [isDone, setIsDone] = useState(false);
  const [typeBtn, setTypeBtn] = useState('start');
  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const isInProgress = pathname.includes('progress');

  const { buttonDisabled, food } = props;
  const id = food.idMeal || food.idDrink;

  useEffect(() => {
    const fetchRecipeStatus = async () => {
      const doneRecipes = getFromStorage('doneRecipes') || [];
      const inProgressRecipes = getFromStorage('inProgressRecipes');
      setTextButton('Start Recipe');
      setTypeBtn('start');
      setTestButton(START_RECIPE_BTN);
      if (doneRecipes.some((recipe) => recipe.id === id)) {
        setIsDone(true);
      } else if (isInProgress) {
        setTextButton('Finish Recipe');
        setTestButton('finish-recipe-btn');
      } else if (inProgressRecipes && inProgressRecipes[type][id]) {
        setTextButton('Continue Recipe');
        setTestButton(START_RECIPE_BTN);
        setTypeBtn('Continue');
      }
    };

    fetchRecipeStatus();
  }, [id, isInProgress, pathname, type]);

  const handleClick = () => { // código para que ao clicar em 'start recipe' o usuário seja redirecionado para a página de receitas em andamento
    if (isInProgress) {
      saveAsDoneRecipe(food);
      history.push('/done-recipes');
    } else {
      history.push(`${pathname}/in-progress`);
    }
  };

  return isDone ? '' : (
    <button
      className="RecipeBottomButton"
      data-testid={ testButton }
      onClick={ handleClick }
      disabled={ buttonDisabled }
      id={ typeBtn }
    >
      { textButton}

    </button>);
}

RecipeBottomButton.propTypes = {
  buttonDisabled: PropTypes.bool,
  food: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
  }),
}.isRequired;

export default RecipeBottomButton;
