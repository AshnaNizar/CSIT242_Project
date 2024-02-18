var rangeSliderLeft = document.getElementById("rangeSliderleft");
var rangeValueLeft = document.getElementById("rangeValueLeft");

var rangeSliderRight = document.getElementById("rangeSliderright");
var rangeValueRight = document.getElementById("rangeValueRight");

// Update the value boxes with the initial values of the sliders
rangeValueLeft.textContent = rangeSliderLeft.value;
rangeValueRight.textContent = rangeSliderRight.value;

// Add event listener to update value box when slider value changes
rangeSliderLeft.addEventListener("input", function() {
    rangeValueLeft.textContent = this.value;
});

rangeSliderRight.addEventListener("input", function() {
    // Calculate the inverted value
    rangeValueRight.textContent = this.value;
});
