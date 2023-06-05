import React from 'react';

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <input
        type="text"
        data-testid="search-input"
      />
      <fieldset>
        <input
          type="radio"
          name="searchInput"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"
        />
        <label htmlFor="ingredient-search-radio">Ingredient</label>
        <input
          type="radio"
          name="searchInput"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="Name"
        />
        <label htmlFor="ingredient-search-radio">Name</label>
        <input
          type="radio"
          name="searchInput"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="First letter"
        />
        <label htmlFor="ingredient-search-radio">First letter</label>
      </fieldset>
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}
