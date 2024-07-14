// navigation bar control
export let width = $('.list').outerWidth(true); ;
export function navBar()
{
    $('#navOptions').css({ left: `-${width}px` }, 500);
    $('.closeOrOpen').click(() => {
      if ($('.icon').hasClass('fa-xmark')) {
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
      } else {
        $('#navOptions').animate({ left: `0px` }, 500);
        $('#navOptions li').each(function (index) {
          const delay = index * 100;
          setTimeout(() => {
            $(this).removeClass('animate__fadeOutBottomLeft');
            $(this).addClass('animate__fadeInBottomLeft');
          }, delay);
        });
        $('.icon').removeClass('fa-bars');
        $('.icon').addClass('fa-xmark');
      }
    });
}
