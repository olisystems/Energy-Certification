$(document).click(function (event) {
if ($(event.target).parents(".navbar-collapse").length < 1) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("in");
    if (_opened === true && !clickover.hasClass("navbar-collapse")) {
        $navbar.collapse('hide');
    }
  }
});
