// Make the fetch assign the json to global variable
// Build the input list
// Get list of products from JSON
fetch("./data/outputs.json")
  .then((response) => response.json())
  .then(function (data) {
    // build list of <option> elements
    let poductList = "";
    data.outputs.forEach((element) => {
      poductList += `<option value="${element.name}">${element.name}</option>`;
    });
    // insert elements into <select> with id of "inp-product"
    document.getElementById("inp-product").innerHTML = poductList;
  });

// Get input from the user
let productName = "";
let productNumber = 0;
// Targets
const product = document.getElementById("inp-product");
const number = document.getElementById("inp-number");
const calculate = document.getElementById("calculate");
// Event Listeners
calculate.addEventListener("click", handleCalculate);
// Event Handlers
function handleCalculate() {
  productName = product.value;
  productNumber = number.value;
  console.log(productName);
  console.log(productNumber);
}
