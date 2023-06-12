import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIconImage from '../../images/shareIcon.svg';

function useRecipeCards() {
  const [shareBtn, setShareBtn] = useState(false);

  const handleShare = (recipe) => {
    const currentDomain = window.location.origin;
    clipboardCopy(`${currentDomain}/${recipe.type}s/${recipe.id}`);
    setShareBtn(true);
  };

  const renderTags = (recipe, index) => {
    if (!recipe.tags || recipe.tags.length < 1) {
      return;
    }
    // console.log(recipe.tags);
    let tagsToRender;
    if (recipe.tags.length > 2) {
      tagsToRender = recipe.tags.slice(0, 2);
    } else {
      tagsToRender = recipe.tags;
    }

    return tagsToRender.map((tag) => (
      <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </span>));
  };

  const renderRecipeCard = (recipe, index) => (
    <>
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
      {
        recipe.doneDate && (
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate }
          </p>
        )
      }
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
    </>
  );

  return {
    renderRecipeCard,
    shareBtn,
  };
}

export default useRecipeCards;
