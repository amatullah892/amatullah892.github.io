console.log("hi");
//comment
// data types within js
//let is for defining variables or creating boxes whose value change
// const is for boxes for variables whose value is constant
// number, they cna be both positive and negative and fractions

let myStudentId = 1234;
console.log(myStudentId);
myStudentId = 4567;
console.log(myStudentId);
let myBudget = 34;
console.log("I can spend: $", myBudget);
//add + subt- multiply* divide/
{
  let a = 20;
  let b = 50;
  let c = a * b;
  console.log("total value", c);
}

let x = 40;
if ((x = 40)) {
  console.log(true);
} else {
  console.log(false);
}
//boolean- mainly used for condition check

let isItFriday = true;
let isItPublicHoliday = false;
if (isItPublicHoliday) {
  console.log("no class today");
} else {
  console.log("sorry class today");
}

//null and undefined, null is empty box and defined is unknown box

let iAmUnknown;
let emptyBox = null;
console.log(emptyBox);

// strings to store alpha-numeric value including html

const myName = "amatullah";
console.log("hello", myName);
const myName2 = "sabrina carpenter";
console.log("hello", myName2);

let myCity = "Melbourne";
console.log("hello", myCity);

//objects to group things that belong to same entity
//and here you can have multiple datatypes
const myRecord = { myName: "amatullah", id: 1234, city: "perth" };
console.log(myRecord);
console.log(myRecord.city);

const grade1 = 67;
const grade2 = 85;

if (grade1 >= 60 && grade1 < 70) {
  console.log("you got C");
} else if (grade1 >= 70 && grade1 < 80) {
  console.log("you got D");
}
if (grade1 >= 80 && grade1 < 100) {
  console.log("you got HD");
}

// arrays are collections of elements of same kind

const grades = [67, 56, 78, 89];
const cities = ["melb", "syd", "perth"];
//arrays start with 0 position not 1

console.log("grades of student 1", grades[0]);
console.log("second city I visited", cities[1]);

const students = ["alice", "blob", "carol", "deb"];
console.log(students.length);
for (let i = 0; i < students.length; i++) {
  console.log("hello", student[i]);
}
console.log("total expenditure is:",totalSpend);

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];
console.log(shoppingCart[0].length);
let purchases=0;

console.log(shoppingCart.length; i++);
{
  purchases=purchases+shoppingCart[i].price;
  console.log(
    "purchased:",
    shoppingCart[i].name,
    "for: $",
    shoppingCart[i].price,
  );
}
console.log("total purchaase is:", purchases);
let discount=0
if(purchases>100){
discount=purchases - 10* (purchases/100);
console.log("your discount price is:", discount);
}