//The welcome page
const welcomeScreen = document.querySelector("#welcomeScreen");
console.log(welcomeScreen);

function showWelcomeScreen() {
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

//The maze game page
const gameScreen = document.querySelector("#gameScreen");
console.log(gameScreen);

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

// The congratulations page when the user wins the game by reaching the end.

const successScreen = document.querySelector("#successScreen");
console.log(successScreen);

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

// The start button on the welcome page.

const startButton = document.querySelector("#startButton");
console.log(startButton);

if (startButton) {
  startButton.addEventListener("click", startMaze);
}

// The restart button above the maze.

const restartButton = document.querySelector("#restartButton");
console.log(restartButton);

if (restartButton) {
  restartButton.addEventListener("click", startMaze);
}

// The play again button on the congratulations page.
const playAgainButton = document.querySelector("#playAgainButton");
console.log(playAgainButton);

if (playAgainButton) {
  playAgainButton.addEventListener("click", startMaze);
}

// starts the maze game when start button is clicked.

function startMaze() {
  stopCalmSound();
  attempts = 1;
  startedAt = Date.now();
  updateStats();
  showGameScreen();
  requestAnimationFrame(resetPlayerToStart);
}

// The maze board that the player navigates through.
const mazeBoard = document.querySelector("#mazeBoard");
console.log(mazeBoard);

if (mazeBoard) {
  mazeBoard.addEventListener("pointermover", movePlayer);
  mazeBoard.addEventListener("pointerleave", hidePlayer);
}

//moves the red glowing cursor whenever the user moves their mouse in the maze.

function movePlayer(event) {
  if (isScaring) {
    return;
  }
  if (!mazeBoard || !player) {
    return;
  }

  const boardRect = mazeBoard.getBoundingClientRect();
  const x = event.clientX - boardRect.left;
  const y = event.clientY - boardRect.top;

  player.style.left = x + "px";
  player.style.top = y + "px";
  player.style.opacity = 1;

  addTrailDot(x, y);

  if (playerHitsWall()) {
    handleWallHit();
  } else if (playerReachedEnd()) {
    finishMaze();
  }
}

//hides the red cursor when the mouse leaves the maze.
function hidePlayer() {
  if (!player) {
    return;
  }

  player.style.opacity = 0;
}

//the red glowing cursor and player

const player = document.querySelector("#player");
console.log(player);

//moves the red cursor back to the cat start point.

function resetPlayerToStart() {
  if (!player || !trailLayer || !mazeBoard) {
    return;
  }

  const startPosition = getCellCenter(startCell);

  player.style.left = startPosition.x + "px";
  player.style.top = startPosition.y + "px";
  player.style.opacity = 1;
  trailLayer.innerHTML = "";
}

//checks if the player is touching any wall.

function playerHitsWall() {
  if (!player) {
    return false;
  }

  const playerRect = player.getBoundingClientRect();
  const walls = document.querySelectorAll(".wall");

  return Array.from(walls).some(function checkWall(wall) {
    const wallRect = wall.getBoundingClientRect();
    return rectanglesOverlap(playerRect, wallRect);
  });
}

//checks if the player has reached the end food icon.

function playerReachedEnd() {
  if (!mazeBoard || !player) {
    return false;
  }

  const boardRect = mazeBoard.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  const endPosition = getCellCenter(endCell);
  const cellWidth = boardRect.width / mazeColumns;
  const cellHeight = boardRect.height / mazeRows;
  const playerCenterX = playerRect.left + playerRect.width / 2 - boardRect.left;
  const playerCenterY = playerRect.top + playerRect.height / 2 - boardRect.top;

  return (
    Math.abs(playerCenterX - endPosition.x) < cellWidth &&
    Math.abs(playerCenterY - endPosition.y) < cellHeight
  );
}

// The layer that holds the glowning trail.
const trailLayer = document.querySelector("#trailLayer");
console.log(trailLayer);

//creates a small glowing trail dot behind the cursor.
function addTrailDot(x, y) {
  const dot = document.createElement("span");

  dot.className = "trail-dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  trailLayer.appendChild(dot);

  window.setTimeout(removeTrailDot, 700);

  function removeTrailDot() {
    dot.remove();
  }
}

//The scary image overlay
const scareOverlay = document.querySelector("#scareOverlay");
console.log(scareOverlay);

// hiding the scary image after it appears.
function hideScare() {
  scareOverlay.classList.remove("is-active");
  scareOverlay.setAttribute("aria-hidden", true);
  resetAfterWallHit(0);
}

// The scary images that rotate each time the scare appears.

const scareImages = document.querySelectorAll(".scare-image");
console.log(scareImages);

//chooses which image to show next.

function showNextScareImage() {
  scareImages.forEach(hideScareImage);

  function hideScareImage(image) {
    image.classList.remove("is-active");
  }
  if (scareImages.length === 0) {
    return;
  }

  scareIndex++;

  if (scareIndex >= scareImages.length) {
    scareIndex = 0;
  }
  scareImages[scareIndex].classList.add("is-active");
}

//The loud horror sound

const screamAudio = document.querySelector("#screamAudio");
console.log(screamAudio);

//plays the loud horror sound
function playScareSound() {
  if (!screamAudio) {
    return;
  }

  screamAudio.pause();
  screamAudio.currentTime = 0;
  screamAudio.volume = 1;
  screamAudio.play();
}

// The calming sound at the end

const calmAudio = document.querySelector("#calmAudio");
console.log(calmAudio);

//plays the calming sound as the congratulations page appears.

function playCalmSound() {
  if (!calmAudio) {
    return;
  }

  stopCalmSound();
  calmAudio.volume = 0.55;
  calmAudio.play();
}

//stops the calming sound when a game starts.
function stopCalmSound() {
  if (!calmAudio) {
    return;
  }
  calmAudio.pause();
  calmAudio.currentTime = 0;
}

// the number of attempts box.
const attemptsBox = document.querySelector("#attemptsBox");
console.log(attemptsBox);

//the tier box

const tierBox = document.querySelector("#tierBox");
console.log(tierBox);

//the best record box
const bestBox = document.querySelector("#bestBox");
console.log(bestBox);

//updates attempts, tier, and best record boxes.
function updateStats() {
  const bestRecord = getBestRecord();

  if (attemptsBox) {
    attemptsBox.textContent = attempts;
  }

  if (tierBox) {
    if (attempts === 0) {
      tierBox.textContent = "Untested";
    } else {
      tierBox.textContent = getTier(attempts, Date.now() - startedAt);
    }
  }

  if (bestBox) {
    if (bestRecord) {
      bestBox.textContent =
        formatTime(bestRecord.time) + " - " + bestRecord.attempts + "tries";
    } else {
      bestBox.textContent = "No finish yet";
    }
  }
}

// The paragraph that tells the player their finished result.

const finishSummary = document.querySelector("#finishSummary");
console.log(finishSummary);

//runs when the player reaches the food icon.
function finishMaze() {
  if (!finishSummary) {
    return;
  }

  const finishTime = Date.now() - startedAt;
  const finalTier = getTier(attempts, finishTime);
  const bestRecord = getBestRecord();

  if (!bestRecord || finishTime < bestRecord.time) {
    saveBestRecord(finishTime, attempts);
  }

  finishSummary.textContent =
    "You finished in" +
    formatTime(finishTime) +
    " on attempt " +
    attempts +
    ". Final rank: " +
    finalTier +
    ".";

  updateStats();
  showSuccessScreen();
  playCalmSound();
}

//These values store what is happening in the game
let attempts = 0;
let startedAt = 0;
let isScaring = false;
let scareIndex = 0;
let scareHitsRemaining = getNextScareDelay();

//these values control the maze size and the start and end positions.

const mazeColumns = 31;
const mazeRows = 19;
const startCell = { column: 1, row: 1 };
const endCell = { column: 29, row: 17 };

//this is the name used to save the best record in local storage

const bestRecordKey = "glowMazeBestRecord";

// building the maze and showing the first set of stats when page loads

buildMaze();
updateStats();

//Runs whenever the player touches a wall
function handleWallHit() {
  if (isScaring) {
    return;
  }

  isScaring = true;
  attempts++;
  scareHitsRemaining--;
  updateStats();

  // most wall hits only reset the player. the scary image appears after a random number of wall hits.

  if (scareHitsRemaining > 0) {
    resetAfterWallHit(180);
    return;
  }

  scareHitsRemaining = getNextScareDelay();
  showNextScareImage();
  playScareSound();
  scareOverlay.classList.add("is-active");
  scareOverlay.setAttribute("aria-hidden", false);

  window.setTimeout(hideScare, 900);
}

// resets the player after touching a wall.
function resetAfterWallHit(delay) {
  window.setTimeout(resetNow, delay);

  function resetNow() {
    resetPlayerToStart();
    isScaring = false;
  }
}

// chooses a random number of wall hits beofre the scary image appears.

function getNextScareDelay() {
  return Math.floor(Math.random() * 4) + 2;
}

// gets the best record from local storage
function getBestRecord() {
  const savedRecord = localStorage.getItem(bestRecordKey);

  if (!savedRecord) {
    return null;
  }

  return JSON.parse(savedRecord);
}

//saves the best record to local storage
function saveBestRecord(time, attemptCount) {
  const record = {
    time: time,
    attempts: attemptCount,
  };

  localStorage.setItem(bestRecordKey, JSON.stringify(record));
}

//changes milliseconds into seconds text.

function formatTime(milliseconds) {
  const seconds = milliseconds / 1000;
  return seconds.toFixed(1) + "s";
}

// chooses the player's tier based on attempts and time.
function getTier(attemptCount, milliseconds) {
  const seconds = milliseconds / 1000;

  if (attemptCount <= 1 && seconds <= 35) {
    return "S Tier";
  }

  if (attemptCount <= 3 && seconds <= 55) {
    return "A Tier";
  }

  if (attemptCount <= 6) {
    return " B Tier";
  }

  return "Brave";
}

// checks if two rectangles are overlapping

function rectanglesOverlap(firstRectangle, secondRectangle) {
  return (
    firstRectangle.left < secondRectangle.right &&
    firstRectangle.right < secondRectangle.left &&
    firstRectangle.top < secondRectangle.bottom &&
    firstRectangle.bottom < secondRectangle.top
  );
}

//finds the centre of a maze cell
function getCellCenter(cell) {
  if (!mazeBoard) {
    return {
      x: 0,
      y: 0,
    };
  }

  const boardRect = mazeBoard.getBoundingClientRect();

  return {
    x: ((cell.column + 0.5) * boardRect, width) / mazeColumns,
    y: ((cell.row + 0.5) * boardRect.height) / mazeRows,
  };
}

// the function below create the maze wall patterns
//builds the maze on scree

function buildMaze() {
  if (!mazeBoard) {
    return;
  }

  const mazeGrid = makeMazeGrid();
  const wallWidth = 100 / mazeColumns;
  const wallHeigth = 100 / mazeRows;

  mazeBoard.querySelectorAll(".wall").forEach(removeWall);

  for (let row = 0; row < mazeRows; row++) {
    for (let column = 0; column < mazeColumns; column++) {
      if (mazeGrid[row][column] === 1) {
        addWall(column, row, wallWidth, wallHeigth);
      }
    }
  }
}

// remove an old wall
function removeWall(wall) {
  wall.remove();
}

// adds one wall sqaure to the maze
function addWall(column, row, wallWidth, wallHeight) {
  const wall = document.createElement("div");

  wall.className = "wall";
  wall.style.left = column * wallWidth + "%";
  wall.style.top = row * wallHeight + "%";
  wall.style.width = wallWidth + "%";
  wall.style.height = wallHeight + "%";
  mazeBoard.prepend(wall);
}

// creates a maze grid using 1 for walls and 0 for paths

function makeMazeGrid() {
  const randomNumber = seededRandom(52);
  const grid = makeWallGrid();
  const stack = [startCell];

  grid[startCell.row][startCell.column] = 0;

  while (stack.length > 0) {
    const currentCell = stack[stack.length - 1];
    const nextCell = getNextCell(currentCell, grid, randomNumber);

    if (!nextCell) {
      stack.pop();
    } else {
      grid[nextCell.wallRow][nextCell.wallColumn] = 0;
      grid[nextCell.row][nextCell.column] = 0;
      stack.push({
        column: nextCell.column,
        row: nextCell.row,
      });
    }
  }

  return grid;
}

//starts with a grid that is all walls.
function makeWallGrid() {
  const grid = [];

  for (let row = 0; row < mazeRows; row++) {
    const rowCells = [];

    for (let column = 0; column < mazeColumns; column++) {
      rowCells.push(1);
    }

    grid.push(rowCells);
  }
  return grid;
}

// finds the next path cell while building the maze

function getNextCell(currentCell, grid, randomNumber) {
  const directions = shuffleWithSeed(
    [
      { column: 2, row: 0 },
      { column: -2, row: 0 },
      { column: 0, row: 2 },
      { column: 0, row: -2 },
    ],
    randomNumber,
  );

  for (let index = 0; index < directions.length; index++) {
    const direction = directions[index];
    const nextColumn = currentCell.column + direction.column;
    const nextRow = currentCell.row + direction.row;

    if (cellCanBeUsed(nextColumn, nextRow, grid)) {
      return {
        column: nextColumn,
        row: nextRow,
        wallColumn: currentCell.column + direction.column / 2,
        wallRow: currentCell.row + direction.row / 2,
      };
    }
  }
  return null;
}

// checks if a cell can become a path
function cellCanBeUsed(column, row, grid) {
  return (
    column > 0 &&
    column < mazeColumns - 1 &&
    row > 0 &&
    row < mazeRows - 1 &&
    grid[row][column] === 1
  );
}

// this makes the maze random but still the same everytime the page loads.

function seededRandom(seed) {
  let value = seed;

  function getRandomNumber() {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  }

  return getRandomNumber;
}

//shuffles the directions when is being created.

function shuffleWithSeed(items, randomNumber) {
  const shuffledItems = items.slice();

  for (let index = shuffledItems.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(randomNumber() * (index + 1));
    const firstItems = shuffledItems[index];

    shuffledItems[index] = shuffledItems[swapIndex];
    shuffledItems[swapIndex] = firstItems;
  }

  return shuffledItems;
}
