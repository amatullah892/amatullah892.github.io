//variables - boxes to store values
// let and const-2 variables
//let- can change its value, const-remains fixed
// numerc, string, boolean, null, undefined, object and arrays

//numeric- math operations
let a = 10;

// string - text containing alpha-numeric value
const name = "amatullah";

// boolean- true and false, to run something based on conditions
let isItRaining = false;

// object- group of properties belonging to same entity- student, properties: age, id, name, grades
let student = {
  name: "amatullah",
  id: 1234,
};

//student.name student.id

// arrays - collection but they are all of the same type, for number, string, boolean, etc
let grades = [23, 34, 56];
let names = ["banana", "f"];

// grades[2] = 68 IMP: arrays starts at 0
// grades.length

// conditional statements
// if (condition) [true- execute this]
// else {false-execute this}
if (isItRaining) {
  console.log("yes it is");
} else {
  console.log("no it is not");
}

// loops - iterate through a function or set of instructions
//for loop

for (let i = 0; i < names.length; i++) {
  console.log("hello", names[i]);
}

//functions
let b = 20;

function add(a, b) {
  let c = a + b;
  console.log("value of c, c");
  return c;
} // this is called defining a function
add(a, b); // this is calling a function- function execute only if its called
add(4, 5);
let c = add(a, 50);
console.log("value of c, c");

function greet(name) {
  let greetings = "hello" + name;
  return greetings;
}

let welcome = greet("alice");
console.log(welcome);
console.log(greet("oda"));
