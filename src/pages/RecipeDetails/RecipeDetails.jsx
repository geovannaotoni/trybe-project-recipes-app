import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAPI } from '../../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();

  const [element, setElement] = useState();
  // const [user setUser] = useState({
  //   name:'',
  //   lastName: '',
  //   adress: '',
  // })

  // user.adress
  // setUser(user.lastName = 'Silva')
  const returnRote = async (type, id) => {
    if (type === 'meals') {
      const meals = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setElement(await meals.meals[0]);
    } else if (type === 'drinks') {
      // http://localhost:3000/drinks/14053
      const drinks = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setElement(await drinks.drinks[0]);
    }
  };

  useEffect(() => {
    const currentPath = history.location.pathname;
    const parts = currentPath.split('/');
    const [, type, id] = parts;
    returnRote(type, id);
  }, []);

  return (
    <div>{element}</div>
  );
}

export default RecipeDetails;
