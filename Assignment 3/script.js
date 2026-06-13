/*The welcome page*/
const welcomeScreen = document.querySelector("#welcomeScreen");
console.log(welcomeScreen);
/*shows the welcome screen and hides other screens*/
function showWelcomeScreen() {
  /*checks if each elements exists before changing it, which prevents errors if the HTML changes*/
  if (gameScreen) {
    gameScreen.classList.remove("is-active");
  }
  if (successScreen) {
    successScreen.classList.remove("is-active");
  }
  if (welcomeScreen) {
    welcomeScreen.classList.add("is-active");
  }
}

/*The maze game page*/
const gameScreen = document.querySelector("#gameScreen");
console.log(gameScreen);
/*shows the maze game screen and hides the other screens*/
function showGameScreen() {
  if (welcomeScreen) {
    welcomeScreen.classList.remove("is-active");
  }
  if (successScreen) {
    successScreen.classList.remove("is-active");
  }
  if (gameScreen) {
    gameScreen.classList.add("is-active");
  }
}

/*The congratulations page when the user wins the game by reaching the end.*/

const successScreen = document.querySelector("#successScreen");
console.log(successScreen);
/*\shows the success screen after the player wins the game by reaching the end*/
function showSuccessScreen() {
  if (welcomeScreen) {
    welcomeScreen.classList.remove("is-active");
  }
  if (gameScreen) {
    gameScreen.classList.remove("is-active");
  }

  if (successScreen) {
    successScreen.classList.add("is-active");
  }
}

/*the start button on the welcome page*/
const startButton = document.querySelector("#startButton");
console.log(startButton);
/*clicking start begins a new maze run*/
if (startButton) {
  startButton.addEventListener("click", startMaze);
}

/*the restart button above the maze*/
const restartButton = document.querySelector("#restartButton");
console.log(restartButton);
/*restart uses the same setup as start*/
if (restartButton) {
  restartButton.addEventListener("click", startMaze);
}

/*the play again button on the congratulations page*/
const playAgainButton = document.querySelector("#playAgainButton");
console.log(playAgainButton);
/*play again also starts the maze from the beginning*/
if (playAgainButton) {
  playAgainButton.addEventListener("click", startMaze);
}

/*starts the maze game when start button is clicked*/
function startMaze() {
  /*stop the ending music so it does not play over the maze*/
  stopCalmSound();
  /*attempsts starts at 1 because beginning the maze counts as the first try*/
  attempts = 1;
  /*save the start time so the finish time can be calculated later*/
  startedAt = Date.now();
  /*refresh the stats before showing the game*/
  updateStats();
  showGameScreen();
  /*wait one animation frame so the board has its real size before  positioning the player*/
  requestAnimationFrame(resetPlayerToStart);
}

/*the maze board that the player navigates through*/
const mazeBoard = document.querySelector("#mazeBoard");
console.log(mazeBoard);
/*pointer move works for mouse, trackpad and touch like devices*/
if (mazeBoard) {
  mazeBoard.addEventListener("pointermove", movePlayer);
  /*hide the custom player dot when the real cursor leaves the board*/
  mazeBoard.addEventListener("pointerleave", hidePlayer);
}

/*moves the red glowing cursor whenever the user moves their mouse in the maze*/

function movePlayer(event) {
  /*ignore movement while the scare overlay is active*/
  if (isScaring) {
    return;
  } /*if the board or player is missing, stop instead of crashing the game*/
  if (!mazeBoard || !player) {
    return;
  }
  /*get the boards position on the page so cursor coordinates can be converted into board coorsinates*/
  const boardRect = mazeBoard.getBoundingClientRect();
  const x = event.clientX - boardRect.left;
  const y = event.clientY - boardRect.top;
  /*move the red player dot to the same place as the cursor*/
  player.style.left = x + "px";
  player.style.top = y + "px";
  player.style.opacity = 1;
  /*add a fading dot behind the player for the glowing trail effect*/
  addTrailDot(x, y);
  /*touching a wall triggers the scare/reset. reaching  the end triggers the success screen*/
  if (playerHitsWall()) {
    handleWallHit();
  } else if (playerReachedEnd()) {
    finishMaze();
  }
}

/*hides the red cursor when the mouse leaves the maze*/
function hidePlayer() {
  if (!player) {
    return;
  }

  player.style.opacity = 0;
}

/*the red glwoing cursor and player*/

const player = document.querySelector("#player");
console.log(player);

/*moves the red cursor back to the cat start point*/

function resetPlayerToStart() {
  /*all three elements are needed to reset the player and clear the trail*/
  if (!player || !trailLayer || !mazeBoard) {
    return;
  }
  /*the start position is based on the maze frid cell, not pixels*/
  const startPosition = getCellCenter(startCell);

  player.style.left = startPosition.x + "px";
  player.style.top = startPosition.y + "px";
  player.style.opacity = 1;
  trailLayer.innerHTML = "";
}

/*checks if the player is touching any wall*/

function playerHitsWall() {
  if (!player) {
    return false;
  }
  /*this gives the real on-screen box for the player and each wall*/
  const playerRect = player.getBoundingClientRect();
  const walls = document.querySelectorAll(".wall");
  /*if any wall overlaps the player, the player has hit the wall*/
  return Array.from(walls).some(function checkWall(wall) {
    const wallRect = wall.getBoundingClientRect();
    return rectanglesOverlap(playerRect, wallRect);
  });
}

/*checks if the player has reached the end food icon*/
function playerReachedEnd() {
  if (!mazeBoard || !player) {
    return false;
  }
  /*work out where the player is inside the board*/
  const boardRect = mazeBoard.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  /*the end positon is the center of the end cell*/
  const endPosition = getCellCenter(endCell);
  /*cell sizes changes when the board resizes, so calculate it every time*/
  const cellWidth = boardRect.width / mazeColumns;
  const cellHeight = boardRect.height / mazeRows;
  const playerCenterX = playerRect.left + playerRect.width / 2 - boardRect.left;
  const playerCenterY = playerRect.top + playerRect.height / 2 - boardRect.top;
  /*the player wins if their center is close to the end cell center*/
  return (
    Math.abs(playerCenterX - endPosition.x) < cellWidth &&
    Math.abs(playerCenterY - endPosition.y) < cellHeight
  );
}

/*the layer that holds the glowing trail*/
const trailLayer = document.querySelector("#trailLayer");
console.log(trailLayer);

/*creates a small glwoing trail dot behind the cursor*/
function addTrailDot(x, y) {
  const dot = document.createElement("span");

  dot.className = "trail-dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  trailLayer.appendChild(dot);
  /*remove the dot after the CSS fade finishes so the page does not fill with old dots*/
  window.setTimeout(removeTrailDot, 700);

  function removeTrailDot() {
    dot.remove();
  }
}

/*the scary image overlay*/
const scareOverlay = document.querySelector("#scareOverlay");
console.log(scareOverlay);

/*hididng the scary image after it appears*/
function hideScare() {
  scareOverlay.classList.remove("is-active");
  scareOverlay.setAttribute("aria-hidden", true);
  /*after the scare ends the player is back to the start*/
  resetAfterWallHit(0);
}

/*the scary images that rotate each time the scare appears*/
const scareImages = document.querySelectorAll(".scare-image");
console.log(scareImages);

/*chooses which image to show next*/
function showNextScareImage() {
  /*hide all scare images first so only one is visible at a time*/
  scareImages.forEach(hideScareImage);

  function hideScareImage(image) {
    image.classList.remove("is-active");
  }
  if (scareImages.length === 0) {
    return;
  }
  /*move to the next in the list*/
  scareIndex++;
  /*if the index goes past the lat image, loop back to the first image*/
  if (scareIndex >= scareImages.length) {
    scareIndex = 0;
  }
  /*show the chosen image, CSS handles the pulse animations*/
  scareImages[scareIndex].classList.add("is-active");
}

/*loud horror scream sound*/

const screamAudio = document.querySelector("#screamAudio");
console.log(screamAudio);

/*plays the horror shound*/
function playScareSound() {
  if (!screamAudio) {
    return;
  }
  /*rewind before playing so the scream slways starts from beginning*/
  screamAudio.pause();
  screamAudio.currentTime = 0;
  /*browser voluse goes from 0 to 1 is the loudest, it was made even more loud in Reaper*/
  screamAudio.volume = 1;
  screamAudio.play();
}

/*calming sound*/
const calmAudio = document.querySelector("#calmAudio");
console.log(calmAudio);

/*plays the calming sound as the congratulations page appears.*/

function playCalmSound() {
  if (!calmAudio) {
    return;
  }
  /*calm audio is quieter than scare audio so the screen feels peaceful and understimulating*/
  stopCalmSound();
  calmAudio.volume = 0.55;
  calmAudio.play();
}

/*stops the calming sound when a game starts*/
function stopCalmSound() {
  if (!calmAudio) {
    return;
  }
  calmAudio.pause();
  calmAudio.currentTime = 0;
}

/*the number of attempts box */
const attemptsBox = document.querySelector("#attemptsBox");
console.log(attemptsBox);

/*the tier box */

const tierBox = document.querySelector("#tierBox");
console.log(tierBox);

/*the best record box */
const bestBox = document.querySelector("#bestBox");
console.log(bestBox);

/*updates attempts, tier, and best record boxes.*/
function updateStats() {
  /*read the saved best record before writing text into the stat boxes*/
  const bestRecord = getBestRecord();
  /*show how many tries the current run has taken*/
  if (attemptsBox) {
    attemptsBox.textContent = attempts;
  }
  /*the tier changes based on attempts and time*/
  if (tierBox) {
    if (attempts === 0) {
      tierBox.textContent = "Untested";
    } else {
      tierBox.textContent = getTier(attempts, Date.now() - startedAt);
    }
  }
  /*if the player has finished before, show their best saved resuts*/
  if (bestBox) {
    if (bestRecord) {
      bestBox.textContent =
        formatTime(bestRecord.time) + " - " + bestRecord.attempts + "tries";
    } else {
      bestBox.textContent = "No finish yet";
    }
  }
}

/*the paragraph that tells the player their finished result*/

const finishSummary = document.querySelector("#finishSummary");
console.log(finishSummary);

/*runs when the player reaches the end food icon*/
function finishMaze() {
  if (!finishSummary) {
    return;
  }
  /*the finish time is current time minus when the player strted*/
  const finishTime = Date.now() - startedAt;
  /*final tier is calculated one last time using the finish time*/
  const finalTier = getTier(attempts, finishTime);
  /*compare this run to the saved best record */
  const bestRecord = getBestRecord();
  /*save the new record only if it is the first record or faster than the old one*/
  if (!bestRecord || finishTime < bestRecord.time) {
    saveBestRecord(finishTime, attempts);
  }
  /*build the message shown on the congratulations screen*/
  finishSummary.textContent =
    "You finished in " +
    formatTime(finishTime) +
    " on attempt " +
    attempts +
    ". Final rank: " +
    finalTier +
    ".";
  /*refresh stats, witch screens and play the calm ending audio*/
  updateStats();
  showSuccessScreen();
  playCalmSound();
}

/*these values store what is happening in the game.
  attempts starts at 0 because the player has not clicked start yet*/
let attempts = 0;
/*startedAt stores the time when the current run began*/
let startedAt = 0;
/*isScaring stops movement while the jumpscare is showing*/
let isScaring = false;
/*scareIndex rememebers which scare image was used last*/
let scareIndex = 0;
/*this counts how many wall hits are left before next scare*/
let scareHitsRemaining = getNextScareDelay();

/*these values control the maze size and start and end positions*/
/*the maze uses an odd number of columns/rows so walls and paths can alternate cleanly*/

const mazeColumns = 31;
const mazeRows = 19;
/*starts and end are written as grid cells, not pixels so they scale with the board*/
const startCell = { column: 1, row: 1 };
const endCell = { column: 29, row: 17 };

/*this is the name used to save the best record in local storage*/
const bestRecordKey = "glowMazeBestRecord";

/*building the maze and showing the first set of stats when page loads*/
buildMaze();
updateStats();

/*runs whenever the player touches wall*/
function handleWallHit() {
  /*if a scare/reset is already happening, ignore extra wall hits*/
  if (isScaring) {
    return;
  }
  /*marks the scale/reset state so the player cannot trigger this function repeatedly*/
  isScaring = true;
  /*a wall hit counts as another attempt*/
  attempts++;
  /*count down toward the next jumpscare*/
  scareHitsRemaining--;
  updateStats();

  /*most wall hits only reset the player, the scary image appears after a random number of wall hits*/
  if (scareHitsRemaining > 0) {
    resetAfterWallHit(180);
    return;
  }
  /*pick a new random delay for the scare after this one*/
  scareHitsRemaining = getNextScareDelay();
  /*prepare the scare image and sound*/
  showNextScareImage();
  playScareSound();
  scareOverlay.classList.add("is-active");
  scareOverlay.setAttribute("aria-hidden", false);

  window.setTimeout(hideScare, 1800);
}

/*player resets after hitting the wall*/
function resetAfterWallHit(delay) {
  /*a delay gives the player a tiny pause before being returned to the start*/
  window.setTimeout(resetNow, delay);

  function resetNow() {
    resetPlayerToStart();
    /*movemnt is allowed again after reset is complete*/
    isScaring = false;
  }
}

/*chooses a random number of wall hits before the scare image appears*/
function getNextScareDelay() {
  /*returns a number from 2 to 5 so the scare does not happen on every wall hit*/
  return Math.floor(Math.random() * 4) + 2;
}

/*gets the best record form the local storage*/
function getBestRecord() {
  const savedRecord = localStorage.getItem(bestRecordKey);
  /*no saved value means the player has not finished before*/
  if (!savedRecord) {
    return null;
  }
  /*localStorage stores text, so convert it back into an object*/
  return JSON.parse(savedRecord);
}

/*saves the best record to local storage*/
function saveBestRecord(time, attemptCount) {
  /*store both time and attempts so the bext box can show a useful record*/
  const record = {
    time: time,
    attempts: attemptCount,
  };

  localStorage.setItem(bestRecordKey, JSON.stringify(record));
}

/*changes miliseconds into seconds text*/
function formatTime(milliseconds) {
  /*the game measures time in milliseconds, but seconds are easier for players to read*/
  const seconds = milliseconds / 1000;
  return seconds.toFixed(1) + "s";
}

/*chooses the player's tier based on attempts and time*/
function getTier(attemptCount, milliseconds) {
  const seconds = milliseconds / 1000;

  if (attemptCount <= 1 && seconds <= 35) {
    return "A Tier";
  }

  if (attemptCount <= 3 && seconds <= 55) {
    return "B Tier";
  }

  if (attemptCount <= 6) {
    return "C Tier";
  }

  return "Brave";
}

/*checks if two rectangles are overlapping*/
function rectanglesOverlap(firstRectangle, secondRectangle) {
  /*two boxes overlap when each one crosses into the others horizontal and vertical space*/
  return (
    firstRectangle.left < secondRectangle.right &&
    firstRectangle.right > secondRectangle.left &&
    firstRectangle.top < secondRectangle.bottom &&
    firstRectangle.bottom > secondRectangle.top
  );
}

/*finds the center of a maze cell*/
function getCellCenter(cell) {
  if (!mazeBoard) {
    return {
      x: 0,
      y: 0,
    };
  }
  /*the board size can change with the viewport, so measure it fresh each time*/
  const boardRect = mazeBoard.getBoundingClientRect();
  /*add 0.5 to move from the cell's corner to the cell's center*/
  return {
    x: ((cell.column + 0.5) * boardRect.width) / mazeColumns,
    y: ((cell.row + 0.5) * boardRect.height) / mazeRows,
  };
}

/*builds the maze wall patterns*/
function buildMaze() {
  if (!mazeBoard) {
    return;
  }
  /*a grid is easier to thick about than placing every wall by hand*/
  const mazeGrid = makeMazeGrid();
  /*convert one grid cell into a percentage size so the maze scales with the board*/
  const wallWidth = 100 / mazeColumns;
  const wallHeigth = 100 / mazeRows;
  /*removed old walls before adding new ones, so rebuilding does not duplicate walls*/
  mazeBoard.querySelectorAll(".wall").forEach(removeWall);
  /*loop through every cell, if the grid says 1, place a wall there*/
  for (let row = 0; row < mazeRows; row++) {
    for (let column = 0; column < mazeColumns; column++) {
      if (mazeGrid[row][column] === 1) {
        addWall(column, row, wallWidth, wallHeigth);
      }
    }
  }
}

/*removes an old wall*/
function removeWall(wall) {
  wall.remove();
}

/*adds one wall square to the maze*/
function addWall(column, row, wallWidth, wallHeight) {
  /*creates a div because each wall is a simple rectangular block*/
  const wall = document.createElement("div");

  wall.className = "wall";
  /*percentanges make the wall positions responsive instead of fixed to one screen size*/
  wall.style.left = column * wallWidth + "%";
  wall.style.top = row * wallHeight + "%";
  wall.style.width = wallWidth + "%";
  wall.style.height = wallHeight + "%";
  /*prepend puts walls behind the start/end/player elements because those have higher z-index*/
  mazeBoard.prepend(wall);
}

/*creates a maze grid using 1 for walls and 0 for paths*/
function makeMazeGrid() {
  /*seeded random keeps the maze looking random but reatable every page load*/
  const randomNumber = seededRandom(52);
  /*start with a grid full of walls then carve through it*/
  const grid = makeWallGrid();
  /*the start cell must be open so the player can begin there*/
  const stack = [startCell];
  /*the start cell mist be open so the player can begin there*/
  grid[startCell.row][startCell.column] = 0;
  /*keep carving until there are no cells left to explore*/
  while (stack.length > 0) {
    const currentCell = stack[stack.length - 1];
    const nextCell = getNextCell(currentCell, grid, randomNumber);
    /*if there is nowhere to go, backtrack to the previous cell*/
    if (!nextCell) {
      stack.pop();
    } else {
      /*open the wall between the current cell and the next cell*/
      grid[nextCell.wallRow][nextCell.wallColumn] = 0;
      /*open the next cell itself*/
      grid[nextCell.row][nextCell.column] = 0;
      /*continue exploring from the next cell*/
      stack.push({
        column: nextCell.column,
        row: nextCell.row,
      });
    }
  }

  return grid;
}

/*starts with a grid that is all walls*/
function makeWallGrid() {
  const grid = [];
  /*make each row*/
  for (let row = 0; row < mazeRows; row++) {
    const rowCells = [];
    /*fill each row with wall cells*/
    for (let column = 0; column < mazeColumns; column++) {
      rowCells.push(1);
    }
    /*add the finished row to the whole grid*/
    grid.push(rowCells);
  }
  return grid;
}

/*finds the next path cell while building the maze*/
function getNextCell(currentCell, grid, randomNumber) {
  /*move two cells at a time so there is always a wall between path vells to carve through*/
  const directions = shuffleWithSeed(
    [
      { column: 2, row: 0 },
      { column: -2, row: 0 },
      { column: 0, row: 2 },
      { column: 0, row: -2 },
    ],
    randomNumber,
  );
  /*try each directions until one works*/
  for (let index = 0; index < directions.length; index++) {
    const direction = directions[index];
    const nextColumn = currentCell.column + direction.column;
    const nextRow = currentCell.row + direction.row;
    /*only use cells that are inside the maze and still walls*/
    if (cellCanBeUsed(nextColumn, nextRow, grid)) {
      return {
        column: nextColumn,
        row: nextRow,
        /*this is the wall halfway between the current cell and next cell*/
        wallColumn: currentCell.column + direction.column / 2,
        wallRow: currentCell.row + direction.row / 2,
      };
    }
  }
  return null;
}

/*checks if a cell can become a path*/
function cellCanBeUsed(column, row, grid) {
  /*the outer edge stays as walls and only untouched cells can become paths*/
  return (
    column > 0 &&
    column < mazeColumns - 1 &&
    row > 0 &&
    row < mazeRows - 1 &&
    grid[row][column] === 1
  );
}

/*this makes the maze random but still same eveyr time the page loads*/
function seededRandom(seed) {
  /*store the current random value inside this function*/
  let value = seed;

  function getRandomNumber() {
    /*this formula creates a repeatable pseudo-random number form the previous value*/
    value = (value * 1664525 + 1013904223) % 4294967296;
    /*return a decimal between 0 to 1, like math.random()*/
    return value / 4294967296;
  }
  /*return the random-number function so other code can call it later*/
  return getRandomNumber;
}

/*shuffles the directions when the maze is being created*/
function shuffleWithSeed(items, randomNumber) {
  /*slice makes a copy so the original directions array is not changed*/
  const shuffledItems = items.slice();

  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(randomNumber() * (index + 1));
    const firstItems = shuffledItems[index];
    /*swap the two items*/
    shuffledItems[index] = shuffledItems[swapIndex];
    shuffledItems[swapIndex] = firstItems;
  }
  /*return the shuffled copy*/
  return shuffledItems;
}
