import React, { useState, useEffect } from 'react';
import './RecipeButtons.css';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../../services/localStorage';

function RecipeButtons() {
  const [recipeStatus, setRecipeStatus] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchRecipeStatus = async () => {
      const currentPath = history.location.pathname;
      const parts = currentPath.split('/');
      const [, , id] = parts;

      const doneRecipes = getFromStorage('doneRecipes') || [];
      const inProgressRecipes = getFromStorage('inProgressRecipes') || {};

      if (doneRecipes.some((recipe) => recipe.id === id)) {
        setRecipeStatus('finished');
      } else if (inProgressRecipes[id]) {
        setRecipeStatus('started');
      } else {
        setRecipeStatus('');
      }
    };

    fetchRecipeStatus();
  }, [history.location.pathname]);

  let buttonContent;
  switch (recipeStatus) {
  case '':
    buttonContent = (
      <button className="start-recipe-btn" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    );
    break;
  case 'started':
    buttonContent = (
      <button className="start-recipe-btn" data-testid="start-recipe-btn">
        Continue Recipe
      </button>
    );
    break;
  case 'finished':
    buttonContent = null;
    break;
  default:
    buttonContent = null;
    break;
  }

  return <div>{ buttonContent }</div>;
}

export default RecipeButtons;
