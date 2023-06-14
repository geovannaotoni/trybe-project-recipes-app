import React, { useState } from 'react';
import './useFilterButtons.css';

function useFilterButtons() {
  const [filterType, setFilterType] = useState('');

  const handleFilter = (value) => {
    if (filterType === value) {
      setFilterType('');
    } else {
      setFilterType(value);
    }
  };

  const renderButtons = () => (
    <section className="mainUDB">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter('') }
        className="btnALLALL"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
        className="btnALLMeals"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
        className="btnALLDrinks"
      >
        Drinks
      </button>
    </section>
  );

  return {
    filterType,
    renderButtons,
  };
}

export default useFilterButtons;
