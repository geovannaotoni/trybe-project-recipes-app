export const fetchAPI = async (url) => {
  // console.log('URL NO FETCHAPI', url);
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks || data.meals;
};
