import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL, showError } from '../../services/helpers';
import './SearchBar.css';

const FIRST_LETTER = 'firstLetter';
const INGREDIENT = 'ingredient';
const NAME = 'name';

export default function SearchBar() {
  // History
  const history = useHistory();
  const { pathname } = history.location;
  const path = API_URL.toParam(pathname); // --> /drinks --> drink
  // Estados
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState(INGREDIENT);

  // Context
  const { results, setResults } = useContext(RecipesContext);

  const handleRadioChange = ({ target }) => {
    setSearchInput('');
    setRadioInput(target.value);
  };

  const handleSearchClick = async () => {
    const URL = API_URL[path][radioInput] + searchInput;

    try {
      if (radioInput === FIRST_LETTER && searchInput.length > 1) {
        throw new Error('Your search must have only 1 (one) character');
      }
      const apiData = await fetchAPI(URL);

      // console.log('apiData', apiData);
      if (!apiData) {
        throw new Error('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (apiData.length === 1) {
        const id = apiData[0].idMeal || apiData[0].idDrink; // para obter o id que está contido na chave idMeals ou idDrink
        history.push(`${pathname}/${id}`); // redireciona para a rota com o id
      } if (apiData.length > API_URL.maxResults) {
        setResults(apiData.slice(0, API_URL.maxResults));
      } else {
        setResults(apiData ?? []);
      }
    } catch (error) {
      showError(error.message);
      setResults([]);
    }
  };

  const handleKeyDown = ({ keyCode }) => {
    const keyENTER = 13;
    if (keyCode === keyENTER) {
      handleSearchClick();
    }
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        placeholder="Digite aqui"
        className="SearchBarInput"
        onKeyDown={ handleKeyDown }
        maxLength={ radioInput === FIRST_LETTER ? 1 : '' }
      />

      <div className="SearchBarRadioAndLabel">
        <input
          type="radio"
          name="searchInput"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value={ INGREDIENT }
          checked={ radioInput === INGREDIENT }
          onChange={ handleRadioChange }
        />
        <label htmlFor="ingredient-search-radio">Ingredient</label>
        <input
          type="radio"
          name="searchInput"
          id="name-search-radio"
          data-testid="name-search-radio"
          value={ NAME }
          checked={ radioInput === NAME }
          onChange={ handleRadioChange }
        />
        <label htmlFor="name-search-radio">Name</label>
        <input
          type="radio"
          name="searchInput"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value={ FIRST_LETTER }
          checked={ radioInput === FIRST_LETTER }
          onChange={ handleRadioChange }
        />
        <label htmlFor="first-letter-search-radio">First letter</label>
      </div>
      <button data-testid="exec-search-btn" onClick={ handleSearchClick }>Search</button>
      {
        results
        && (
          <h4 className="SearchBarResults">
            {`${results.length} ${results.length > 1 ? 'results' : 'result'}`}
          </h4>)

      }

    </div>
  );
}
