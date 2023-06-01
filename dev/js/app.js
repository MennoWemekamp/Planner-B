// Make the fetch assign the json to global variable
async function importData() {
  // fetch json file
  const promise = await fetch("./data/outputs.json");
  // assign the result of the .json method
  const theData = await promise.json();
  return theData;
}
// assign the promise to variable, remember to call this in async function and assign it to a function scope variable using await.
const DATA = importData();

// Build the input list
async function buildProductList(imp) {
  // make sure the promise is fulfilled
  const data = await imp;
  let productList = "";
  // build the product list
  data.outputs.forEach((element) => {
    productList += `<option value="${element.name}">${element.name}</option>`;
  });
  // render the product list
  document.getElementById("inp-product").innerHTML = productList;
}
buildProductList(DATA);

// Get input from the user
// Targets
const product1 = document.getElementById("inp-product");
const number1 = document.getElementById("inp-number");
const calculate = document.getElementById("calculate");
// Event Listeners
calculate.addEventListener("click", handleCalculate);
// Event Handlers
async function handleCalculate() {
  // assign array with products to a variable called data
  const importData = await DATA;
  const data = importData.outputs;
  // Clear innerHTML and call calculator
  outputDiv.innerHTML = "";
  // get product object from data
  for (x of data) {
    if (x.name === product1.value) {
      prod1 = x;
    }
  }
  // check if product was valid before calling the calculator
  if (prod1.icon) {
    calculator(product1.value, number1.value);
  } else {
    outputDiv.innerHTML = "<h3>Select a product above to get started.</h3>";
  }
  // could be a way of handling mutliple inputs
  // calculator(product2.value, number2.value);
}

// Do the calculation
async function calculator(prod, numb) {
  // assign array with products to a variable called data
  const importData = await DATA;
  const data = importData.outputs;
  // declare array to pass to display function
  let outputDisplay = [];
  // this function adds the product and cycles required to the outputDislay array
  function addProduct(prod, numb) {
    // get object from data
    let productData;
    for (obj of data) {
      if (obj.name === prod) {
        productData = obj;
      }
    }
    // object to be added to outputDisplay array
    let product = {};
    // add product name to object
    product.name = prod;
    // add cycles to object
    product.cycles = Math.ceil(numb / productData.amount);
    // call addInputs to handle input calculation
    addInputs(productData.input, numb);
    // add product ot output display, if it already exists increase the cycles.
    // TODO figure out why high-tech parts is not calculation inputs correctly
    // check if product already exists in outputDisplay
    let found = false;
    let productIndex;
    outputDisplay.forEach((item, i) => {
      if (prod === item.name) {
        found = true;
        productIndex = i;
      }
    });

    if (found) {
      // add cycles to already existing cycles
      outputDisplay[productIndex].cycles += product.cycles;
    } else {
      // add object to outputDisplay
      outputDisplay.unshift(product);
    }
  }

  // this function checks for inputs and then adds those to the outputDisplay if required
  function addInputs(inputs, numb) {
    for (input of inputs) {
      if (input.amount && input.amount !== "Placed") {
        addProduct(input.name, input.amount * numb);
      }
    }
  }

  addProduct(prod, numb);

  // Final step: clear output display and call output display function
  console.log("outputDisplay", outputDisplay);
  createOutput(outputDisplay);
}

// output;
// declare variable for output div
const outputDiv = document.getElementById("output-display");
// set default output display content
outputDiv.innerHTML = "<h3>Select a product above to get started.</h3>";
// Write function that creates output html
// things to display for each on the objects in outputDisplay: number of buildings, total amount they output, total amount of input needed.
async function createOutput(arr) {
  //assign array with products to a variable called data
  const importData = await DATA;
  const data = importData.outputs;
  // create a div for the table of a product and append to output-display
  const prodDiv = document.createElement("div");
  prodDiv.id = "prod-n";
  outputDiv.appendChild(prodDiv);
  // create and append title
  const prodTitle = document.createElement("h3");
  prodTitle.innerHTML = `Product 1: ${arr[0].name}`;
  prodDiv.appendChild(prodTitle);
  // create and append table
  const prodTable = document.createElement("table");
  prodTable.id = "prod-table";
  prodDiv.appendChild(prodTable);
  // create and append table head
  const tHead = document.createElement("thead");
  prodTable.appendChild(tHead);
  const tHeadRow = document.createElement("tr");
  tHead.appendChild(tHeadRow);
  const tHeadCell1 = document.createElement("th");
  tHeadCell1.setAttribute("colspan", "2");
  tHeadCell1.innerHTML = "Buildings";
  tHeadRow.appendChild(tHeadCell1);
  const tHeadCell2 = document.createElement("th");
  tHeadCell2.setAttribute("colspan", "2");
  tHeadCell2.innerHTML = "Output";
  tHeadRow.appendChild(tHeadCell2);
  const tHeadCell3 = document.createElement("th");
  tHeadCell3.setAttribute("colspan", "2");
  tHeadCell3.innerHTML = "Inputs";
  tHeadRow.appendChild(tHeadCell3);
  // create and append table body
  const tBody = document.createElement("tbody");
  prodTable.appendChild(tBody);

  // create Table rows for each obj in arr
  let rows = "";
  for (obj of arr) {
    // get product object from data
    let prod;
    for (x of data) {
      if (x.name === obj.name) {
        prod = x;
      }
    }
    // get buildings required
    const buildingNum = Math.ceil(obj.cycles / prod.cycles);
    const buildingType = prod.building;
    // get data about the building
    let building;
    for (y of data) {
      if (y.name === prod.building) {
        building = y;
      }
    }
    const buildingIcon = building.icon;
    const buildingColor = building.bgcolor;
    // get output amount
    const outputAmount = obj.cycles * prod.amount;
    const outputIcon = prod.icon;
    const outputColor = prod.bgcolor;
    // get inputs and build an array with input objects
    let inputs = [];
    for (inp of prod.input)
      if (inp.amount) {
        // compare the input names to the JSON and pull icon and bgcolor from that object in the JSON and then use that to build the table row later.
        let input = {};
        input.name = inp.name;
        input.amount = obj.cycles * inp.amount;
        // grap data for the inputs from json
        let inputData;
        for (w of data) {
          if (w.name === inp.name) {
            inputData = w;
            input.icon = inputData.icon;
            input.color = inputData.bgcolor;
          }
        }
        // add input object to array of inputs
        inputs.push(input);
      }
    // build each td using the const above
    let dataCells = "";
    function numCol(num) {
      if (inputs[0] && inputs[1]) {
        dataCells += `<td class="num-col" rowspan="2">${num}</td>`;
      } else {
        dataCells += `<td class="num-col">${num}</td>`;
      }
    }
    function iconCol(icon, bgcolor, name) {
      if (inputs[0] && inputs[1]) {
        dataCells += `<td class="icon-col" rowspan="2">
      <span class="icon-span"><img class="icon-img" src="img/${icon}" style="background-color:${bgcolor};" title="${name}" /></span></td>`;
      } else {
        dataCells += `<td class="icon-col"><span class="icon-span"><img class="icon-img" src="img/${icon}" style="background-color:${bgcolor};" title="${name}" /></span></td>`;
      }
    }
    // create building column
    numCol(buildingNum);
    iconCol(buildingIcon, buildingColor, buildingType);
    // create output column
    numCol(outputAmount);
    iconCol(outputIcon, outputColor, obj.name);
    // create input column, rowspan for dual inputs
    if (inputs[0] && inputs[1]) {
      dataCells += `<td class="num-col">${inputs[0].amount}</td><td class="icon-col"><span class="icon-span"><img class="icon-img" src="img/${inputs[0].icon}" style="background-color:${inputs[0].color};" title="${inputs[0].name}" /></span></td></tr><tr><td class="num-col">${inputs[1].amount}</td><td class="icon-col"><span class="icon-span"><img class="icon-img" src="img/${inputs[1].icon}" style="background-color:${inputs[1].color};" title="${inputs[1].name}" /></span></td>`;
    } else if (inputs[0].amount) {
      numCol(inputs[0].amount);
      iconCol(inputs[0].icon, inputs[0].color, inputs[0].name);
    } else {
      dataCells += `<td colspan="2">Placed ${inputs[0].name}</td>`;
    }
    // add td's to tr and tr to rows array
    let rowStart = "<tr>";
    let rowEnd = "</tr>";
    rows += `${rowStart}${dataCells}${rowEnd}`;
  }

  // Set inner html
  tBody.innerHTML = rows;
}
