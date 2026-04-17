function checkWeather() {
  const myTemp = document.querySelector("myTemp");
  console.log(myTemp.value);
  const body= document.querySelector("body")
  const outer= document.querySelector(".outer")
  let myTemp = myTemp.value;
}

if (temp < 10) {
  console.log("it is cold today");
  body.style.backgroundColor= "gray";
   outer.style.backgroundColor= "blue";
} else if (temp > +10 && temp < 20) {
  console.log("it is nice today");\
  body.style.backgroundColor= "blue";
  outer.style.backgroundColor= "green";
} else if (temp >= 20 && temp < 30) {
  console.log("quite warm today");
  body.style.backgroundColor= "orange";
  outer.style.backgroundColor= "red";
} else if (temp >= 30 && temp < 50) {
  console.log("burning hot");
  body.style.backgroundColor= "red";
  outer.style.backgroundColor= "yellow";
}
