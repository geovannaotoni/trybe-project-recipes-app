import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../../services/localStorage';
import './RecipeBottomButton.css';

function RecipeBottomButton(props) {
  const [textButton, setTextButton] = useState('Start Recipe');
  const [testButton, setTestButton] = useState('start-recipe-btn');
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const { id } = props;

  useEffect(() => {
    const fetchRecipeStatus = async () => {
      const doneRecipes = getFromStorage('doneRecipes') || [];
      const inProgressRecipes = getFromStorage('inProgressRecipes') || {};

      if (doneRecipes.some((recipe) => recipe.id === id)) {
        setIsDone(true);
      } else if (inProgressRecipes[id]) {
        setTextButton('Continue Recipe');
      } else {
        setTextButton('Start Recipe');
      }
    };

    fetchRecipeStatus();
  }, [pathname]);

  const handleClick = () => { // código para que ao clicar em 'start recipe' o usuário seja redirecionado para a página de receitas em andamento
    const link = history.location.pathname;
    history.push(`${link}/in-progress`);
  };

  return isDone ? '' : (
    <button
      className="RecipeBottomButton"
      data-testid={ testButton }
      onClick={ handleClick }
    >
      {textButton}

    </button>);
}

RecipeBottomButton.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default RecipeBottomButton;
