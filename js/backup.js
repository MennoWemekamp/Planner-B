let p1Cycles;
let p1Building;
let p1BuildingNumber;
let p1I1;
let p1I2;

// step 1: calculate number of cycles needed to reach target rounded up
p1Cycles = Math.ceil(numb / p1.amount);
console.log(p1Cycles);
// step 2: calculate the number of buildings required rounded up
p1Building = p1.building;
p1BuildingNumber = Math.ceil(p1Cycles / p1.cycles);
console.log(p1Building);
console.log(p1BuildingNumber);
// step 3: calculate inputs
// check if there is a first input and if so assign the object for it to variable
if (p1.input[0].amount) {
  p1I1 = p1.input[0];
  console.log(p1I1);
}
// check if there is a second input and if so assign the object for it to variable
if (p1.input[1].amount) {
  p1I2 = p1.input[1];
  console.log(p1I2);
}

// calculator code

// Assign the object for product 1 from the array to variable
let p1;
for (obj of data) {
  if (obj.name === prod) {
    p1 = obj;
  }
}
// lets start with a simple one step calculation, calculation for 30 steel per year
// declare array to pass to display function
let outputDisplay = [];
// check if product was valid
if (p1.icon) {
  // process: build an object that had the total amount of cycles for this product, this can later be used to populate table and there the buildings can be calculated, this also alows later steps that have the same product to be merged into this stage, giving totals later in the table.
  // Step 1 create an object
  let prod1 = {};
  // Step 2 add product name
  prod1.name = p1.name;
  // Step 3 add cyles required
  prod1.cycles = Math.ceil(numb / p1.amount);
  // Step 4 add prod1 to outputDisplay array
  outputDisplay.push(prod1);
  // Step 5 check if there is a first input and create obj for it
  if (p1.input[0].amount) {
    // add input1 object to obj
    inp1 = {};
    // add name to input 1
    inp1.name = p1.input[0].name;
    // calculate the amount of input product needed
    let inp1Amount = prod1.cycles * p1.input[0].amount;
    // calculate cycles for input amount
    let inp1Cycles;
    for (obj of data) {
      if (obj.name === inp1.name) {
        inp1Cycles = obj.amount * inp1Amount;
      }
    }
    // add cycles to object
    inp1.cycles = inp1Cycles;
    // add inp1 to display output array
    outputDisplay.push(inp1);
  }
  // step 6 check if there is a second input and create obj for it
  if (p1.input[1].amount) {
    inp2 = {};
    // add name to input 2
    inp2.name = p1.input[1].name;
    // calculate the amount of input product needed
    let inp2Amount = prod1.cycles * p1.input[1].amount;
    // calculate cycles for input amount
    let inp2Cycles;
    for (obj of data) {
      if (obj.name === inp1.name) {
        inp2Cycles = obj.amount * inp2Amount;
      }
    }
    // add cycles to object
    inp2.cycles = inp2Cycles;
    // add inp2 to display output array
    outputDisplay.push(inp2);
  }
  // Final step: clear output display and call output display function
  outputDiv.innerHTML = "";

  console.log("outputDisplay", outputDisplay);
  createOutput(outputDisplay);
}
