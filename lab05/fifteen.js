//delete getDigits + make shuffle
//remove properties on game end
const TILE_SIDE = 100;
const PUZZLE_LENGTH = 4;
var freeTile = "";
var tiles = new Array(PUZZLE_LENGTH * PUZZLE_LENGTH - 1);
window.onload = newGame;

function newGame() {
  tiles = document.querySelectorAll("#puzzlearea div");
  initializeTiles(tiles);
  freeTile = "r3c3";
  document.getElementById("shufflebutton").innerHTML = "Shuffle";
  document.getElementById("shufflebutton").onclick = shuffleTiles;
}

function initializeTiles(tiles) {
  for (var i = 0; i < tiles.length; i++) {
    var x = Math.trunc(i / PUZZLE_LENGTH);
    var y = Math.trunc(i % PUZZLE_LENGTH);
    setID(tiles[i], x, y);
    setImg(tiles[i], x, y);
    tiles[i].onmouseover = setHovering;
    tiles[i].onmouseleave = unsetHovering;
    tiles[i].onclick = move;
  }
}

function setHovering() {
  if (canMove(this.id)) {
    this.classList.add("hoveredTile");
  }
}

function unsetHovering() {
  this.classList.remove("hoveredTile");
}

function canMove(currTile) {
  var dist = Math.abs(getDigits(currTile) - getDigits(freeTile));
  return dist == 1 ? 1 : dist == 10 ? 1 : 0;
}

function getDigits(str) {
  return str.replace(/\D/g, "");
}

function setID(currTile, x, y) {
  var tileID = "r" + x + "c" + y;
  currTile.setAttribute("id", tileID);
}

function setImg(currTile, x, y) {
  var tile_img =
    String(-(y * TILE_SIDE)) + "px " + String(-(x * TILE_SIDE)) + "px";
  currTile.style.backgroundPosition = tile_img;
}

function move() {
  if (canMove(this.id)) {
    var tmpID = this.id;
    this.setAttribute("id", freeTile);
    freeTile = tmpID;
    if (isCompleted()) congratulate();
  }
}

function isCompleted() {
  for (var i = 1; i < tiles.length; i++) {
    if (tiles[i - 1].id > tiles[i].id) return 0;
  }
  return freeTile == "r3c3"; //avoid the case where the 15th tile isn't on left
}

function congratulate() {
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].removeAttribute("onclick");
    tiles[i].removeAttribute("onmouseover");
    tiles[i].removeAttribute("onmouseleave");
  }
  var p = document.createElement("p");
  p.innerHTML =
    "Congratulations!<br>Richard is proud of you<br>for achieving the (free) javascript 15 puzzle.";
  document.getElementById("controls").appendChild(p);
  document.getElementById("shufflebutton").innerHTML = "Game over!";
  document.getElementById("shufflebutton").onclick = restart;
}

function restart() {
  document
    .getElementById("controls")
    .removeChild(document.querySelector("#controls p"));
  newGame();
}
