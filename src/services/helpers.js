import Swal from 'sweetalert2';

export const API_URL = {
  meals: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    filter: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    single: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  },
  drinks: {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    filter: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    single: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  },
  // input: /drinks --> output: Drink (para ser usado em idDrink, strDrink, etc)
  toSingleParam: (pathname) => pathname[1].toUpperCase()
+ pathname.substring(2, pathname.length - 1),
  // --> /meals ---> Meals
  toCapitalize: (pathname) => pathname[1].toUpperCase()
  + pathname.substring(2),
  // --> /drinks --> drinks
  toParam: (pathname) => pathname.replace('/', ''),
  // Máximo de elementos por vez
  maxResults: 12,
};

export const sanitizeURL = (url) => url.replaceAll(' ', '%20');

export const showError = (message) => {
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: message,
    confirmButtonColor: '#dd6b55',
  });
  // podemos inserir callback de retorno, timer, etc, etc
};
