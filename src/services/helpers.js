export const API_URL = {
  meals: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  },
  drinks: {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  },
  // input: /drinks --> output: Drink (para ser usado em idDrink, strDrink, etc)
  toSingleParam: (pathname) => pathname[1].toUpperCase()
+ pathname.substring(2, pathname.length - 1),
  // --> /drinks --> drinks
  toParam: (pathname) => pathname.replace('/', ''),
};
