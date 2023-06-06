import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAPI } from '../../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const parts = currentPath.split('/');
  const [, type, id] = parts;

  const [element, setElement] = useState(null);
  const [pageTypeMeals, setPageTypeMeals] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  // const [user setUser] = useState({
  //   name:'',
  //   lastName: '',
  // })
  // user.adress
  // setUser(user.lastName = 'Silva')

  // _____________________________________________________________________________________________________________________________________________ //

  // useEffect para fazer a requisição a API de acordo com a página: meals ou drinks.
  useEffect(() => {
    const returnRote = async (tipo, ide) => {
      if (tipo === 'meals') {
        const meals = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ide}`);
        setElement(meals.meals[0]); // estou setando o state element um objeto com o retono da requisição a API com as informações do meals obs.: {meals: [{}]}
        setPageTypeMeals(true); // afirmando que a page é do tipo meals
      } else if (tipo === 'drinks') {
        const drinks = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ide}`);
        setElement(drinks.drinks[0]); // estou setando o state element um objeto com o retono da requisição a API com as informações do drink obs.: {drinks: [{}]}
        setPageTypeMeals(false); // afirmando que a page é to tipo drink
      }
    };

    returnRote(type, id); // Chamando a função para fazer a requisição da API com os parametros: Type: meals ou drinks e o id do produto
  }, [id, type]); // usando type e id como parametro

  // useEffect para monitorar o element e pegar os ingredients dele para salvar em um array que será renderizado em tela
  useEffect(() => {
    const getIngredients = (objIngredients) => {
      const ingredientKeys = Object.keys(objIngredients) // recebo um obj e torno ele um array apenas com as keys que contem 'strIngredient'
        .filter((k) => k.includes('strIngredient'));
      const measureKeys = Object.keys(objIngredients)
        .filter((k) => k.includes('strMeasure'));

      const arrayOfIngredients = ingredientKeys.reduce((acc, key, index) => { // aqui eu faço um reducer para pegar os ingredientes
        if (objIngredients[key]) { // verifico se ele existe para não pegar ingrediente sem nada
          const ingredient = objIngredients[key];
          const measure = objIngredients[measureKeys[index]];
          acc.push({ ingredient, measure }); // salvo dentro do array
        }
        return acc; // retorno o array com os ingredients
      }, []);

      setIngredients(arrayOfIngredients);// seto o array no state ingredients
    };

    if (element) { // faço verificação se element existe para chamar a função que pega os ingredients acima
      getIngredients(element);
    }
  }, [element]);

  const getYouTubeVideoId = (url) => { // função que pega o id do link do video do youtube
    const videoId = url.split('=')[1]; // separa o link em 2: antes do = e depois do = (um array[antesDo=, depoisDo=])
    return videoId; // retorno o id
  };

  const mealsPage = () => ( // renderiza a pagina de meals
    <div>
      <p data-testid="recipe-title">{element.strMeal}</p>
      <img
        src={ element.strMealThumb }
        alt={ element.strMeal }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{element.strCategory}</p>
      <div>
        {
          ingredients.map((ingred, index) => (
            <label
              key={ ingred }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <input type="checkbox" name="" id="" />
              {ingred.ingredient}
              {ingred.measure}
            </label>
          ))
        }
      </div>
      <p data-testid="instructions">{element.strInstructions}</p>
      <div>
        <iframe
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${getYouTubeVideoId(element.strYoutube)}` }
          title={ `How to make ${element.strMeal}` }
          allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
      </div>
    </div>
  );

  const drinksPage = () => ( // renderiza a pagina de drinks
    <div>
      <p data-testid="recipe-title">{element.strDrink}</p>
      <img
        src={ element.strDrinkThumb }
        alt={ element.strDrink }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{element.strAlcoholic}</p>
      <div>
        {
          ingredients.map((ingred, index) => (
            <label
              key={ ingred }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <input type="checkbox" name="" id="" />
              {ingred.ingredient}
              {ingred.measure}
            </label>
          ))
        }
      </div>
      <p data-testid="instructions">{element.strInstructions}</p>
    </div>
  );

  return (
    <div>
      {
        element && ( // verifica se element existe para renderizar a pagina e evitar erros
          pageTypeMeals ? (mealsPage()) : (drinksPage()) // verificação ternaria para saber qual pagina renderizar. se o state for true ele renderiza meals, contrário drinks
        )
      }
    </div>
  );
}

export default RecipeDetails;
