import {fetchAllCategories} from './fetchAllApi.js'
import { fetchCategory } from './fetchAllApi.js';
import { fetchDetails } from './fetchAllApi.js';
import { fetchIngredient } from './fetchAllApi.js';
import { fetchIngredientMeal } from './fetchAllApi.js';
import { fetchArea } from './fetchAllApi.js';
import { filterByArea } from './fetchAllApi.js';
import { searchByName } from './fetchAllApi.js';
import { searchByFirstLetter } from './fetchAllApi.js';
import { width } from './navBarControl.js';
// display All Categories
export async function displayAllData() {
  document.querySelector('.loading').style.display = 'flex';
  let req = await fetchAllCategories();
  console.log(req);
  let data = req.categories;
  let text = [];

  for (let i = 0; i < 20; i++) {
    let x = ' ';
    if (data[i]) {
      for (let j = 0; j < 20; j++) {
        if (data[i].strCategoryDescription.split(' ')[j]) {
          x += data[i].strCategoryDescription.split(' ')[j] + ' ';
        }
      }
      text.push(x);
    }
  }

  let cartona = '';
  for (let i = 0; i < 20; i++) {
    if (data[i]) {
      cartona += `
        <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strCategoryThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-xl  group-hover:top-0 duration-500 text-center p-4">
            <h1 class=" font-extrabold">${data[i].strCategory}</h1>
            <p class="">${text[i]}</p>
          </div>
        </div>
      </div>
      `;
    }
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';

  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#customDisplay').addClass('hidden');
      console.log(data[i].strCategory);
      displayCategorydata(data[i].strCategory);
    });
  }
}
// display items have the same category
export async function displayCategorydata(name) {
  document.querySelector('.loading').style.display = 'flex';
  let req = await fetchCategory(name);
  let data = req.meals;
  let cartona = '';
  for (let i = 0; i < 20; i++) {
    if (data[i]) {
      cartona += `
        <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strMealThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-2xl  group-hover:top-0 duration-500  p-4 flex items-center">
            <h1 class="">${data[i].strMeal}</h1>
          </div>
        </div>
      </div>
      `;
    }
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#display').addClass('hidden');
      $('#displayDetails').removeClass('hidden');
      $('#customDisplay').addClass('hidden');
      getDetails(data[i].idMeal);
    });
  }
}
// display item details
export async function getDetails(id) {
    $('#navOptions').animate({ left: `-${width}px` }, 500);
    $('#navOptions li').each(function (index) {
      const delay = index * 100;
      setTimeout(() => {
        $(this).addClass('animate__fadeOutBottomLeft');
        $(this).removeClass('animate__fadeInBottomLeft');
      }, delay);
    });
    $('.icon').removeClass('fa-xmark');
    $('.icon').addClass('fa-bars');
  document.querySelector('.loading').style.display = 'flex';
  let req = await fetchDetails(id);
  let data = await req.meals;
  let tags = data[0].strTags;
  let cartona1 = '';
  if (tags != null) {
    tags = tags.split(',');
    for (let i = 0; i < tags.length; i++) {
      cartona1 += `
    <div class="bg-orange-800  rounded-lg p-2 mx-2">${tags[i]}</div>
    `;
    }
  }

  let j = 1;
  let Ingredient = [];
  let recipes1 = 'strIngredient' + j;
  let recipes2 = 'strMeasure' + j;
  while (
    data[0][recipes1] != '' &&
    data[0][recipes1] != null &&
    data[0][recipes1] != ' ' &&
    data[0][recipes2] != ' ' &&
    data[0][recipes2] != null &&
    data[0][recipes2] != ''
  ) {
    Ingredient.push(data[0][recipes2] + ' ' + data[0][recipes1]);
    j++;
    recipes1 = 'strIngredient' + j;
    recipes2 = 'strMeasure' + j;
  }
  let cartona2 = ' ';
  for (let i = 0; i < Ingredient.length; i++) {
    cartona2 += `
    <div class="bg-sky-300 text-black w-fit m-2 p-2 rounded-lg">${Ingredient[i]}</div>
    `;
  }

  let container = `

  <div class="text-white text-3xl md:col-span-2">
        <img src="${data[0].strMealThumb}" alt="image" class="w-full rounded-lg">
        <h2>${data[0].strMeal}</h2>
      </div>
      <div class="md:col-span-4 text-white">
        <div class="">
          <h2 class="text-3xl">Instructions</h2>
          <p>${data[0].strInstructions}</p>
          <h2 class="text-3xl py-2">
            <span>Area : </span>
            ${data[0].strArea}
          </h2>
          <h2 class="text-3xl py-2">
            <span>Category : </span>
            ${data[0].strCategory}
          </h2>
          <h2 class="text-3xl py-2">
            Recipes :
          </h2>
          <div class="flex flex-wrap py-2">${cartona2}</div>

          <h2 class="text-3xl py-2">
            Tags :
          </h2>
          <div class="flex flex-wrap ">${cartona1}</div>

          <div class="mt-2">
            <button class="bg-green-800 py-2 px-3 rounded-lg hover:bg-green-600 duration-500 "><a href="${data[0].strSource}" target="_blank">Source</a></button>
            <button class="bg-red-700 py-2 px-3 rounded-lg hover:bg-red-500 duration-500"><a href="${data[0].strYoutube}" target="_blank">Youtube</a></button>
          </div>
        </div>
      </div>

  `;
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('#details').innerHTML = container;
}
// display items when click on any ingredient
export async function displayIngredientMeal(ing) {
  document.querySelector('.loading').style.display = 'flex';
  let req = await fetchIngredientMeal(ing);
  let data = req.meals;
  let cartona = ' ';
  for (let i = 0; i < 20; i++) {
    if (data[i]) {
      cartona += `
      <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strMealThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-2xl  group-hover:top-0 duration-500  p-4 flex items-center">
            <h1 class="">${data[i].strMeal}</h1>
          </div>
        </div>
      </div>

    `;
    }
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#display').addClass('hidden');
      $('#displayDetails').removeClass('hidden');
      $('#customDisplay').addClass('hidden');
      getDetails(data[i].idMeal);
      $('#navOptions').animate({ left: `-${width}px` }, 500);
      $('.icon').removeClass('fa-xmark');
      $('.icon').addClass('fa-bars');
    });
  }
}
// display all ingredient
export async function displayIngredient() {
  document.querySelector('.loading').style.display = 'flex';

  let req = await fetchIngredient();
  let data = req.meals;
  let cartona = ' ';
  let text = [];

  for (let i = 0; i < 20; i++) {
    let x = ' ';
    for (let j = 0; j < 10; j++) {
      if (data[i].strDescription.split(' ')[j]) {
        x += data[i].strDescription.split(' ')[j] + ' ';
      }
    }
    text.push(x);
  }
  for (let i = 0; i < 20; i++) {
    if (data[i]) {
      cartona += `
      <div class="item text-white p-3 hover:cursor-pointer">
        <div class="flex justify-center ">
          <i class="fa-solid fa-drumstick-bite text-6xl"></i>
        </div>
        <div class="text-center">
          <h2 class="text-3xl">${data[i].strIngredient}</h2>
          <p>${text[i]}</p>
        </div>
      </div>

    `;
    }
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';

  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#customDisplay').addClass('hidden');
      displayIngredientMeal(data[i].strIngredient);
    });
  }
}
// display all areas 
export async function displayArea() {
  document.querySelector('.loading').style.display = 'flex';
  let req = await fetchArea();
  let data = req.meals;
  let cartona = ' ';
  for (let i = 0; i < data.length; i++) {
    cartona += `
        <div class="item hover:cursor-pointer">
        <div class="flex justify-center">
          <i class="fa-solid fa-house-laptop text-7xl text-white"></i>
        </div>
        <h2 class="text-white text-center text-3xl">${data[i].strArea}</h2>
      </div>

      `;
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#customDisplay').addClass('hidden');
      displayAreaMeals(data[i].strArea);
    });
  }
}
// display items when click on any area
export async function displayAreaMeals(area) {
  document.querySelector('.loading').style.display = 'none';
  let req = await filterByArea(area);
  let data = req.meals;
  let cartona = ' ';
  for (let i = 0; i < 20; i++) {
    if (data[i]) {
      cartona += `
      <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strMealThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-2xl  group-hover:top-0 duration-500  p-4 flex items-center">
            <h1 class="">${data[i].strMeal}</h1>
          </div>
        </div>
      </div>

    `;
    }
  }
  $('#customDisplay').addClass('hidden');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('#category').innerHTML = cartona;

  let item = document.querySelectorAll('.item');

  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function () {
      $('#display').addClass('hidden');
      $('#displayDetails').removeClass('hidden');
      $('#customDisplay').addClass('hidden');
      getDetails(data[i].idMeal);
      $('#navOptions').animate({ left: `-${width}px` }, 500);
      $('.icon').removeClass('fa-xmark');
      $('.icon').addClass('fa-bars');
    });
  }
}
// search by name
export async function displayItemByName(name) {
    $('#displayDetails').addClass('hidden');
  document.querySelector('.loading').style.display = 'flex';
  let req = await searchByName(name);
  let data = req.meals;
  if (data) {
    let cartona = ' ';
    for (let i = 0; i < 20; i++) {
      if (data[i]) {
        console.log(data[i].strMeal);
        cartona += `
        <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strMealThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-2xl  group-hover:top-0 duration-500  p-4 flex items-center">
            <h1 class="">${data[i].strMeal}</h1>
          </div>
        </div>
      </div>
      `;
      }
    }
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('#category').innerHTML = cartona;

    let item = document.querySelectorAll('.item');
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('click', function () {
        $('#display').addClass('hidden');
        $('#displayDetails').removeClass('hidden');
        $('#customDisplay').addClass('hidden');
        getDetails(data[i].idMeal);
        $('#navOptions').animate({ left: `-${width}px` }, 500);
        $('.icon').removeClass('fa-xmark');
        $('.icon').addClass('fa-bars');
      });
    }
  } else {
    console.log('mostafa');
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('#category').innerHTML = '';
  }
}
// search by first letter
export async function displayItemByFirstLetter(l) {
  document.querySelector('.loading').style.display = 'flex';
  let req = await searchByFirstLetter(l);
  let data = req.meals;
  if (data) {
    let cartona = ' ';
    for (let i = 0; i < 20; i++) {
      if (data[i]) {
        console.log(data[i].strMeal);
        cartona += `
        <div class="item">
        <div class="relative group overflow-hidden w-full rounded-md hover:cursor-pointer">
          <img src="${data[i].strMealThumb}" alt="" class="w-full rounded-md" />
          <div
            class="bg-reba absolute size-full top-full text-2xl  group-hover:top-0 duration-500  p-4 flex items-center">
            <h1 class="">${data[i].strMeal}</h1>
          </div>
        </div>
      </div>
      `;
      }
    }
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('#category').innerHTML = cartona;

    let item = document.querySelectorAll('.item');
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('click', function () {
        $('#display').addClass('hidden');
        $('#displayDetails').removeClass('hidden');
        $('#customDisplay').addClass('hidden');
        getDetails(data[i].idMeal);
        $('#navOptions').animate({ left: `-${width}px` }, 500);
        $('.icon').removeClass('fa-xmark');
        $('.icon').addClass('fa-bars');
      });
    }
  } else {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('#category').innerHTML = '';
  }
}