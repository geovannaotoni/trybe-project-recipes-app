import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL } from '../../services/helpers';

const FIRST_LETTER = 'firstLetter';
const INGREDIENT = 'ingredient';
const NAME = 'name';

export default function SearchBar() {
  // History
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = API_URL.toParam(pathname); // --> /drinks --> drink
  // Estados
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState(INGREDIENT);

  // Context
  const { results, setResults } = useContext(RecipesContext);

  // Effect
  useEffect(() => {
    if (results) {
      if (results.length === 1) {
        const id = `id${API_URL.toSingleParam(pathname)}`; // para obter o id que está contido na chave idMeals ou idDrink
        history.push(`/${path}/${results[0][id]}`); // redireciona para a rota com o id
      } else if (results.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        // Swal.fire({
        //   icon: 'warning',
        //   title: 'Oops...',
        //   text: 'Sorry, we haven\'t found any recipes for these filters.',
        //   confirmButtonColor: 'yellow',
        // });
      }
    }
  }, [results]);

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
      setResults(apiData[path] ?? []);
    } catch (error) {
      global.alert(error.message);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: error.message,
      //   confirmButtonColor: '#dd6b55',
      // });
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
        // maxLength={ radioInput === 'First letter' ? 1 : '' }
      />

      <div>
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

      <h4>{`${results ? results.length : 0} resultados`}</h4>

    </div>
  );
}
