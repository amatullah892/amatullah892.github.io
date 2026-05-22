const myButton = document.querySelector("#my-button");
console.log(myButton);

myButton.addEventListener("click me", doJump);

const duck = document.querySelector("#duck");
console.log(duck);

let clicked = false;

function doJump() {
  if (clicked) {
    clicked = false;
    duck.style.translate = "8px-60px";
  } else {
    clicked = true;
    duck.style.translate = "8px-0px";
  }
  console.log(clicked);
}
