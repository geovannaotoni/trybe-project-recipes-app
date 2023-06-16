export const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks || data.meals;
  } catch (error) {
    return null;
  }
  // console.log('URL NO FETCHAPI', url);
};
