import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../../services/localStorage';
import './RecipeBottomButton.css';

const START_RECIPE_BTN = 'start-recipe-btn';

function RecipeBottomButton(props) {
  const [textButton, setTextButton] = useState('Start Recipe');
  const [testButton, setTestButton] = useState(START_RECIPE_BTN);
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const isInProgress = pathname.includes('progress');

  const { id, buttonDisabled } = props;

  useEffect(() => {
    const fetchRecipeStatus = async () => {
      const doneRecipes = getFromStorage('doneRecipes') || [];
      const inProgressRecipes = getFromStorage('inProgressRecipes') || {};

      if (doneRecipes.some((recipe) => recipe.id === id)) {
        setIsDone(true);
      } else if (inProgressRecipes[id]) {
        setTextButton('Continue Recipe');
        setTestButton(START_RECIPE_BTN);
      } else if (isInProgress) {
        setTextButton('Finish Recipe');
        setTestButton('finish-recipe-btn');
      } else {
        setTextButton('Start Recipe');
        setTestButton(START_RECIPE_BTN);
      }
    };

    fetchRecipeStatus();
  }, [id, isInProgress, pathname]);

  const handleClick = () => { // código para que ao clicar em 'start recipe' o usuário seja redirecionado para a página de receitas em andamento
    const link = history.location.pathname;
    history.push(`${link}/in-progress`);
  };

  return isDone ? '' : (
    <button
      className="RecipeBottomButton"
      data-testid={ testButton }
      onClick={ handleClick }
      disabled={ buttonDisabled }
    >
      { textButton}

    </button>);
}

RecipeBottomButton.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default RecipeBottomButton;
