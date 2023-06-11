import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareIconImage from '../../images/shareIcon.svg';
import { getFromStorage } from '../../services/localStorage';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [shareBtn, setShareBtn] = useState(false);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const doneRecipesFromStorage = getFromStorage('doneRecipes');
    if (doneRecipesFromStorage) {
      setDoneRecipes(doneRecipesFromStorage);
    }
  }, []);

  const handleShare = (recipe) => {
    const currentDomain = window.location.origin;
    clipboardCopy(`${currentDomain}/${recipe.type}s/${recipe.id}`);
    setShareBtn(true);
  };

  const handleFilter = (value) => {
    if (filterType === value) {
      setFilterType('');
    } else {
      setFilterType(value);
    }
  };

  const renderTags = (recipe, index) => {
    if (!recipe.tags || recipe.tags.length < 1) {
      return;
    }
    console.log(recipe.tags);
    let tagsToRender;
    if (recipe.tags.length > 2) {
      recipe.tags.slice(0, 2);
    } else {
      tagsToRender = recipe.tags;
    }

    return tagsToRender.map((tag) => (
      <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </span>));
  };

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </section>
      <section>
        {
          doneRecipes
            .filter((recipe) => recipe.type.includes(filterType))
            .map((recipe, index) => (
              <article key={ index }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    width="100px"
                    // precisei colocar o width de 100px para passar no cypress, porque a imagem estava muito grande pro teste
                  />
                </Link>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name }
                  </p>
                </Link>
                {
                  recipe.type === 'meal' && (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { `${recipe.nationality} - ${recipe.category}` }
                    </p>
                  )
                }
                {
                  recipe.type === 'drink' && (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.alcoholicOrNot }
                    </p>
                  )
                }
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate }
                </p>
                <p>
                  {renderTags(recipe, index)}
                </p>
                <button type="button" onClick={ () => handleShare(recipe) }>
                  <img
                    src={ shareIconImage }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>

                { shareBtn && <p>Link copied!</p>}
              </article>
            ))
        }
      </section>
    </div>
  );
}

export default DoneRecipes;
