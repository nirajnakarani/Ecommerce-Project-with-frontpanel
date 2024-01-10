
$(function () {
  "use strict";


  //sidebar menu js
  $.sidebarMenu($('.sidebar-menu'));

  // === toggle-menu js
  $(".toggle-menu").on("click", function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  // === sidebar menu activation js

  $(function () {
    for (var i = window.location, o = $(".sidebar-menu a").filter(function () {
      return this.href == i;
    }).addClass("active").parent().addClass("active"); ;) {
      if (!o.is("li")) break;
      o = o.parent().addClass("in").parent().addClass("active");
    }
  }),


    /* Top Header */

    $(document).ready(function () {
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 60) {
          $('.topbar-nav .navbar').addClass('bg-dark');
        } else {
          $('.topbar-nav .navbar').removeClass('bg-dark');
        }
      });

    });


  /* Back To Top */

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn();
      } else {
        $('.back-to-top').fadeOut();
      }
    });

    $('.back-to-top').on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });


  $(function () {
    $('[data-toggle="popover"]').popover()
  })


  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


  // theme setting
  $(".switcher-icon").on("click", function (e) {
    e.preventDefault();
    $(".right-sidebar").toggleClass("right-toggled");
  });

  $('#theme1').click(theme1);
  $('#theme2').click(theme2);
  $('#theme3').click(theme3);
  $('#theme4').click(theme4);
  $('#theme5').click(theme5);
  $('#theme6').click(theme6);
  $('#theme7').click(theme7);
  $('#theme8').click(theme8);
  $('#theme9').click(theme9);
  $('#theme10').click(theme10);
  $('#theme11').click(theme11);
  $('#theme12').click(theme12);
  $('#theme13').click(theme13);
  $('#theme14').click(theme14);
  $('#theme15').click(theme15);

  function theme1() {
    $('body').attr('class', 'bg-theme bg-theme1');
  }

  function theme2() {
    $('body').attr('class', 'bg-theme bg-theme2');
  }

  function theme3() {
    $('body').attr('class', 'bg-theme bg-theme3');
  }

  function theme4() {
    $('body').attr('class', 'bg-theme bg-theme4');
  }

  function theme5() {
    $('body').attr('class', 'bg-theme bg-theme5');
  }

  function theme6() {
    $('body').attr('class', 'bg-theme bg-theme6');
  }

  function theme7() {
    $('body').attr('class', 'bg-theme bg-theme7');
  }

  function theme8() {
    $('body').attr('class', 'bg-theme bg-theme8');
  }

  function theme9() {
    $('body').attr('class', 'bg-theme bg-theme9');
  }

  function theme10() {
    $('body').attr('class', 'bg-theme bg-theme10');
  }

  function theme11() {
    $('body').attr('class', 'bg-theme bg-theme11');
  }

  function theme12() {
    $('body').attr('class', 'bg-theme bg-theme12');
  }

  function theme13() {
    $('body').attr('class', 'bg-theme bg-theme13');
  }

  function theme14() {
    $('body').attr('class', 'bg-theme bg-theme14');
  }

  function theme15() {
    $('body').attr('class', 'bg-theme bg-theme15');
  }




});





$("#FileInput").on('change', function (e) {
  var labelVal = $(".title").text();
  var oldfileName = $(this).val();
  fileName = e.target.value.split('\\').pop();

  if (oldfileName == fileName) { return false; }
  var extension = fileName.split('.').pop();

  if ($.inArray(extension, ['jpg', 'jpeg', 'png']) >= 0) {
    $(".filelabel i").removeClass().addClass('fa fa-file-image-o');
    $(".filelabel i, .filelabel .title").css({ 'color': '#AAFF00' });
    $(".filelabel").css({ 'border': ' 2px solid #AAFF00' });
  }
  else if (extension == 'pdf') {
    $(".filelabel i").removeClass().addClass('fa fa-file-pdf-o');
    $(".filelabel i, .filelabel .title").css({ 'color': 'red' });
    $(".filelabel").css({ 'border': ' 2px solid red' });

  }
  else if (extension == 'doc' || extension == 'docx') {
    $(".filelabel i").removeClass().addClass('fa fa-file-word-o');
    $(".filelabel i, .filelabel .title").css({ 'color': '#00FFFF' });
    $(".filelabel").css({ 'border': ' 2px solid #00FFFF' });
  }
  else {
    $(".filelabel i").removeClass().addClass('fa fa-file-o');
    $(".filelabel i, .filelabel .title").css({ 'color': 'black' });
    $(".filelabel").css({ 'border': ' 2px solid black' });
  }

  if (fileName) {
    if (fileName.length > 10) {
      $(".filelabel .title").text(fileName.slice(0, 4) + '...' + extension);
    }
    else {
      $(".filelabel .title").text(fileName);
    }
  }
  else {
    $(".filelabel .title").text(labelVal);
  }
});


$("#FileInput1").on('change', function (e) {
  var labelVal = $(".title1").text();
  var oldfileName = $(this).val();
  fileName = e.target.value.split('\\').pop();

  if (oldfileName == fileName) { return false; }
  var extension = fileName.split('.').pop();

  if ($.inArray(extension, ['jpg', 'jpeg', 'png']) >= 0) {
    $(".filelabel1 i").removeClass().addClass('fa fa-file-image-o');
    $(".filelabel1 i, .filelabel1 .title1").css({ 'color': '#AAFF00' });
    $(".filelabel1").css({ 'border': ' 2px solid #AAFF00' });
  }
  else if (extension == 'pdf') {
    $(".filelabel1 i").removeClass().addClass('fa fa-file-pdf-o');
    $(".filelabel1 i, .filelabel1 .title1").css({ 'color': 'red' });
    $(".filelabel1").css({ 'border': ' 2px solid red' });

  }
  else if (extension == 'doc' || extension == 'docx') {
    $(".filelabel1 i").removeClass().addClass('fa fa-file-word-o');
    $(".filelabel1 i, .filelabel1 .title1").css({ 'color': '#00FFFF' });
    $(".filelabel1").css({ 'border': ' 2px solid #00FFFF' });
  }
  else {
    $(".filelabel1 i").removeClass().addClass('fa fa-file-o');
    $(".filelabel1 i, .filelabel1 .title1").css({ 'color': 'black' });
    $(".filelabel1").css({ 'border': ' 2px solid black' });
  }

  if (fileName) {
    if (fileName.length > 10) {
      $(".filelabel1 .title1").text(fileName.slice(0, 4) + '...' + extension);
    }
    else {
      $(".filelabel1 .title1").text(fileName);
    }
  }
  else {
    $(".filelabel1 .title1").text(labelVal);
  }
});



var checkAll = document.querySelector("#checkAll");
var checkItem = document.querySelectorAll(".checkItem");

var checkedIds = [];

$('.delete-button').hide()
$('#checkAll').click(function () {
  $(':checkbox.checkItem').prop('checked', this.checked);
  $('.delete-button').toggle()
});


for (var i = 0; i < checkItem.length; i++) {
  checkItem[i].addEventListener('click', function () {
    // console.log(this.value);
    if (this.checked) {
      checkedIds.push(this.value);
    }
    else {
      let pos = checkedIds.findIndex((v) => v == this.value);
      checkedIds.splice(pos, 1);
    }
    if (checkedIds.length > 0) {
      checkAll.checked = true;
      $('.delete-button').show()
    }
    else {
      checkAll.checked = false;
      $('.delete-button').hide()
    }
  })
}

