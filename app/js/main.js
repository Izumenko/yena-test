//= ../bower_components/jquery/dist/jquery.js
//= ../bower_components/select2/dist/js/select2.js
//= ../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js
//= ../bower_components/jquery-mask-plugin/dist/jquery.mask.js
//= ../libs/js/bootstrap.collapse.js




$( document ).ready(function() {

  var submenuLang = $(".submenu-lang");
  var headerHeight = $(".header").height();

  function pickLanguage () {
    var langBox = $("#lang-flag"); //get DOM element
    var langValue = event.target.attributes[1].value; //get value of data-value attr
    langBox.attr("src", "images/flags/" + langValue + ".png") //change visible flag icon
  };

  //Init language pick
  $(".lang").on("click", function(){
    pickLanguage();
  });


  //submenu toggle 
  $("#lang-flag").click( function(e) {
    e.preventDefault();
      submenuLang.toggleClass("submenu-lang-active");
  });


  //If submenu haven't closed when main-menu is closing - close it
  $(".navbar-toggle").click( function() {
    if (submenuLang.hasClass("submenu-lang-active")) {
      submenuLang.removeClass("submenu-lang-active");
    }
  });

  $(window).resize(function() {
    if(window.innerWidth == 767)
    submenuLang.removeClass("submenu-lang-active");
  });

  //FormState for select2
  function formatState (state) {
    if (!state.id) { return state.text; }
    //buid a template for select list item
    var $state = $(
      '<span><img src="images/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
  };

  //Init select 2 on select-country
  $(".select-country").select2({
    minimumResultsForSearch: Infinity,  //Hide search box
    templateSelection: formatState,
    templateResult: formatState
  });

  //Init select 2 on select-language
  $(".select-language").select2({
    minimumResultsForSearch: Infinity,  //Hide search box
    templateSelection: formatState,
    templateResult: formatState
  });


  //Hide/show password
  (function ($) {
    $.hideShowPassword = function (options) {

      var control = $(options.control);
      var field = $(options.field)
      var text = $(options.text)

      control.bind("click", function () {
        if (control.is(":checked")) {
          field.attr("type", "text");
          text.text("HIDE");
        } else {
          field.attr("type", "password");
          text.text("SHOW");
        }
      })
    };
  }(jQuery));

  //Hide/show password init
  $.hideShowPassword({
    field: "#password",
    control: "#enable-show",
    text: "#password-btn-text"
  });



  //DATE PICKER INIT
  $("#birth-date").datepicker({
    format: "dd/mm/yyyy", //set date format to - day/month/year (including zeros)
    startView: 2  //view order year->month->day
  });


  //Remove events from blank links
  $('a[href*="#"]').click(function(e){
    e.preventDefault();
  });

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
        event.preventDefault();
          //close mobile menu if it's open
        if($(".navbar-collapse").hasClass("in")) {
          $(".navbar-collapse").removeClass("in");
          submenuLang.removeClass("submenu-lang-active-sm");
        }
        $("html, body").animate({
          scrollTop: target.offset().top - headerHeight
        }, 1000);
      }
    }
  });
});

