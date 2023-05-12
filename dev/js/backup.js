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
