const theCanvas = document.querySelector("canvas");
const clearButton = document.querySelector(".clear-button");

const ctx = theCanvas.getContext("2d");
const { width, height } = theCanvas;

const MOVE_AMOUNT = 21;
const INIT_X = width / 2;
const INIT_Y = height / 2;

let x = INIT_X,
  y = INIT_Y,
  hue = 1;

// General Properties
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 20;

// Initial Point
goToInitialPoint();

function goToInitialPoint() {
  x = INIT_X;
  y = INIT_Y;
  ctx.strokeStyle = `hsl(${hue},100%,60%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(e) {
  if (e.key.includes("Arrow")) {
    move(e.key);
    e.preventDefault();
  }
}

function move(key) {
  hue = (hue + 1) % 360;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.strokeStyle = `hsl(${hue},100%,60%)`;
  console.log(ctx.strokeStyle);

  // Find The Direction
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;

    default:
      break;
  }

  // Go To New Location
  ctx.lineTo(x, y);
  // Draw Line
  ctx.stroke();
}

function handleClear(e) {
  ctx.clearRect(0, 0, width, height);
  goToInitialPoint();
}

window.addEventListener("keydown", handleKey);

clearButton.addEventListener("click", handleClear);
