

// fetch All CAtegories
export async function fetchAllCategories() {
  let response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  );
  response = await response.json();
  return response;
}
// fetch data when click on any category
export async function fetchCategory(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  response = await response.json();
  return response;
}
// fetch item details
export async function fetchDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  return response;
}
// fetch ingredient
export async function fetchIngredient() {
  let response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
  );
  response = await response.json();

  return response;
}
export async function fetchIngredientMeal(ing) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );

  response = await response.json();
  return response;
}
// fetch all areas
export async function fetchArea() {
  let response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
  );

  response = await response.json();

  return response;
}
// fetch areas item when click on any area
export async function filterByArea(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  response = await response.json();
  return response;
}
// fetch by name
export async function searchByName(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  return response;
}
// fetch by first letter
export async function searchByFirstLetter(l) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
  );
  response = await response.json();
  return response;
}
