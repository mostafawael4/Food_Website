import { navBar } from './navBarControl.js';
import { displayAllData } from './display.js';
import { displayCategorydata } from './display.js';
import { getDetails } from './display.js';
import { displayIngredientMeal } from './display.js';
import { displayIngredient } from './display.js';
import { displayArea } from './display.js';
import { displayAreaMeals } from './display.js';
import { displayItemByName } from './display.js';
import { displayItemByFirstLetter } from './display.js';
import { width } from './navBarControl.js';
navBar();
displayItemByName('');



// // form control

function Validate() {
  let number = $('.number');
  let name = $('.name');
  let age = $('.age');
  let mail = $('.mail');
  let pass = $('.pass');
  let repass = $('.repass');
  let button = $(".btn");
  let numberFlag = false;
  let nameFlag = false;
  let ageFlag = false;
  let mailFlag = false;
  let passFlag = false;
  let repassFlag = false;
  function checkValidity() {
    if (
      numberFlag &&
      nameFlag &&
      ageFlag &&
      mailFlag &&
      passFlag &&
      repassFlag
    ) {
      button.removeAttr('disabled');
      button.addClass('hover:bg-red-700');
    } else {
      button.attr('disabled', 'disabled');
      button.removeClass('hover:bg-red-700');
    }
  }
  number.keyup(() => {
    if (/^0?1[0125][0-9]{8}$/.test(number.val())) {
      numberFlag = true;
      $('.numberAlarm').addClass('hidden');
    } else {
      numberFlag = false;
      $('.numberAlarm').removeClass('hidden');
    }
    checkValidity();
  });
  name.keyup(() => {
    if (/^[a-zA-z]{1,}$/.test(name.val())) {
      nameFlag = true;
      $('.nameAlarm').addClass('hidden');
    } else {
      nameFlag = false;
      $('.nameAlarm').removeClass('hidden');
    }
    checkValidity();
  });
  age.keyup(() => {
    if (/^([1-9]|[1-9][1-9])$/.test(age.val())) {
      ageFlag = true;
      $('.ageAlarm').addClass('hidden');
    } else {
      ageFlag = false;
      $('.ageAlarm').removeClass('hidden');
    }
    checkValidity();
  });
  mail.keyup(() => {
    if (/^[\w._@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(mail.val())) {
      mailFlag = true;
      $('.mailAlarm').addClass('hidden');
    } else {
      mailFlag = false;
      $('.mailAlarm').removeClass('hidden');
    }
    checkValidity();
  });
  pass.keyup(() => {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass.val())) {
      passFlag = true;
      $('.passAlarm').addClass('hidden');
    } else {
      passFlag = false;
      $('.passAlarm').removeClass('hidden');
    }
    checkValidity();
  });

  repass.keyup(() => {
    if (repass.val() == pass.val()) {
      repassFlag = true;
      $('.repassAlarm').addClass('hidden');
    } else {
      repassFlag = false;
      $('.repassAlarm').removeClass('hidden');
    }
    checkValidity();
  });
}

// action when click on category link
$('#cat').click(() => {
  $('#display').removeClass('hidden');
  $('.form').addClass('hidden');
  $('#displayDetails').addClass('hidden');
  $('#customDisplay').addClass('hidden');
  displayAllData();
  console.log('mostafa');
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
});

$('#contact').click(() => {
  $('.form').removeClass('hidden');
  $('#displayDetails').addClass('hidden');
  $('#display').addClass('hidden');
  $('#customDisplay').addClass('hidden');
  $('.form').html(`<div class="w-3/4">
      <div class="grid grid-cols-2  gap-4">
        <div class="input">
          <input type="text" class="name w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Enter Your Name">
          <div class="nameAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Special characters and numbers not allowed</div>
        </div>
        <div class="input">
          <input type="email" class="mail w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Enter Your Email">
          <div class="mailAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Email not valid *exemple@yyy.zzz</div>
        </div>
        <div class="input">
          <input type="text" class="number w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Enter Your phone">
          <div class="numberAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Enter valid Phone Number</div>
        </div>
        <div class="input">
          <input type="number" class="age w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Enter Your Age">
          <div class="ageAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Enter valid age</div>
        </div>
        <div class="input">
          <input type="password" class="pass w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Enter Your password">
          <div class="passAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
        </div>
        <div class="input">
          <input type="password" class="repass w-full py-2 px-3 rounded-md focus:outline-cyan-400"  placeholder="Repassword">
          <div class="repassAlarm hidden bg-red-700 text-white w-full text-center py-3 mt-2 rounded-lg">Enter valid repassword</div>
        </div>
      </div>
      <div class="flex justify-center">
        <button type="submit"
          class="btn text-white mt-3 py-2 px-3 bg-transparent rounded-md  border border-red-600 border-solid "
          disabled>Submit</button>
      </div>
    </div>`);
    
    Validate();
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
    
  
});

$('#Ingredients').click(() => {
  $('#display').removeClass('hidden');
  $('.form').addClass('hidden');
  $('#displayDetails').addClass('hidden');
  $('#customDisplay').addClass('hidden');
  displayIngredient();
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
});

$('#Area').click(() => {
  $('#display').removeClass('hidden');
  $('.form').addClass('hidden');
  $('#displayDetails').addClass('hidden');
  $('#customDisplay').addClass('hidden');
  displayArea();
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
});

let searchName = $('.searchName');
let searchLetter = $('.searchLetter');

$('#Search').click(() => {
  searchName.val('');
  searchLetter.val('');
  $('#display').removeClass('hidden');
  $('.form').addClass('hidden');
  $('#displayDetails').addClass('hidden');
  $('#customDisplay').removeClass('hidden');
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
  $('#category').html('');
  searchName.keyup(() => {
    displayItemByName(searchName.val());
  });
  searchLetter.keyup(() => {
    if (searchLetter.val()) 
      displayItemByFirstLetter(searchLetter.val());
    else
    {
      displayItemByName('');
    }
  });
});




// ^0?1[0125][0-9]{8}$           -----> phone number
// ^([1-9]|[1-9][1-9])$          -----> age
// ^[a-zA-z]{1,}$        -----> name
// ^[\w._@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$     ------> email
// ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$   ------> password