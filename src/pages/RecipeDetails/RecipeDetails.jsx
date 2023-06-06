import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAPI } from '../../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const parts = currentPath.split('/');
  const [, type, id] = parts;
  const [element, setElement] = useState(null);
  // const [user setUser] = useState({
  //   name:'',
  //   lastName: '',
  //   adress: '',
  // })

  // user.adress
  // setUser(user.lastName = 'Silva')

  const getIngredients = (array) => {
    const ingredients = Object.keys(array).filter((k) => k.includes('strIngredient'));
    console.log(ingredients);
  };

  const returnRote = async (tipo, ide) => {
    if (tipo === 'meals') {
      const meals = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ide}`);
      setElement(await meals.meals[0]);
    } else if (tipo === 'drinks') {
      // http://localhost:3000/drinks/14053
      const drinks = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ide}`);
      setElement(drinks.drinks[0]);
      // console.log(drinks);
    }
  };

  useEffect(() => {
    returnRote(type, id);
  }, [id, type]);
  // console.log(element);
  getIngredients(element);
  return (
    <div>
      <h1>aaa</h1>
      <h3>asd</h3>
      {
        element && (
          <div>
            <p data-testid="recipe-title">{element.strDrink}</p>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">{element.strCategory}</p>
            <p data-testid={ `${element.index}-ingredient-name-and-measure` }>
              {element.strIngredient1}
            </p>
            <p data-testid="instructions">{element.strInstructions}</p>
          </div>
        )
      }
    </div>
  );
}

export default RecipeDetails;
