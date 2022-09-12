import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Example from './components/Example';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  function carouselSetup() {
    let carousel = document.querySelector('.carousel');
    let back = document.querySelector('.back');
    let next = document.querySelector('.next');
    let current = 0;
    let cellCount = 6;
    const rotateCarousel = () => {
      const angle = (current / cellCount) * -360;
      carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
      carousel.style.transition = 'all 0.75s ease-in-out';
    };
    back.addEventListener('click', () => {
      current--;
      rotateCarousel();
    });
    next.addEventListener('click', () => {
      current++;
      rotateCarousel();
    });
  }
  $(document).ready(function () {
    carouselSetup();
  });
  // ---------Responsive-navbar-active-animation-----------
  function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $('.hori-selector').css({
      top: itemPosNewAnimTop.top + 'px',
      left: itemPosNewAnimLeft.left + 'px',
      height: activeWidthNewAnimHeight + 'px',
      width: activeWidthNewAnimWidth + 'px',
    });
    $('#navbarSupportedContent').on('click', 'li', function (e) {
      $('#navbarSupportedContent ul li').removeClass('active');
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $('.hori-selector').css({
        top: itemPosNewAnimTop.top + 'px',
        left: itemPosNewAnimLeft.left + 'px',
        height: activeWidthNewAnimHeight + 'px',
        width: activeWidthNewAnimWidth + 'px',
      });
    });
  }
  $(document).ready(function () {
    setTimeout(function () {
      test();
    });
  });
  $(window).on('resize', function () {
    setTimeout(function () {
      test();
    }, 500);
  });
  $('.navbar-toggler').click(function () {
    $('.navbar-collapse').slideToggle(300);
    setTimeout(function () {
      test();
    });
  });
  // --------------add active class-on another-page move----------
  $(document).ready(function ($) {
    // Get current path and find target link
    var path = window.location.pathname.split('/').pop();
    // Account for home page with empty path
    if (path == '') {
      path = 'index.html';
    }
    var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
    // Add active class to target link
    target.parent().addClass('active');
  });
  // Add active class on another page linked
  // ==========================================
  // $(window).on('load',function () {
  //     var current = location.pathname;
  //     console.log(current);
  //     $('#navbarSupportedContent ul li a').each(function(){
  //         var $this = $(this);
  //         // if the current path is like this link, make it active
  //         if($this.attr('href').indexOf(current) !== -1){
  //             $this.parent().addClass('active');
  //             $this.parents('.menu-submenu').addClass('show-dropdown');
  //             $this.parents('.menu-submenu').parent().addClass('active');
  //         }else{
  //             $this.parent().removeClass('active');
  //         }
  //     })
  // });
  const exportCodeToHtml = () => {
    async function saveToFile() {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'index.html',
        types: [
          {
            description: 'HTML',
            accept: { 'text/html': ['.html'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(document.body.parentNode.innerHTML);
      writable.close();
    }
    saveToFile();
  };
  return (
    <>
      <div className="App">
        <div className="export-code-button">
          <button
            type="button"
            className="btn btn-success"
            onClick={exportCodeToHtml}
          >
            Export Code
          </button>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
      </div>
    </>
  );
}
export default App;
