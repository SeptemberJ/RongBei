$(function() {
  var hasplaceArr = $("input[placeholder]");
  hasplaceArr.css("color","#999");
  hasplaceArr.each(function() {
    var current = $(this),
    currentPlace = current.attr("placeholder"),
    currentType = (current.attr("type") || '').toLowerCase();
    if (currentPlace != "") {
      current.val(currentPlace);
      placeholderFill(current, currentPlace, currentType);
      if (currentType == 'password') {
        current.attr("type", "text");
      }
    }
  });
});
function placeholderFill(inputObj, inputValue, inputType) {
  inputObj.focus(function() {
    if ($.trim(inputObj.val()) == inputValue) {
      inputObj.val('');
      if (inputType == 'password') {
        inputObj.attr("type", "password");
      }
    }
  });
  inputObj.blur(function() {
    if ($.trim(inputObj.val()) == '') {
      inputObj.val(inputValue);
      if (inputType == 'password') {
        inputObj.attr("type", "text");
      }
    }
  });
}