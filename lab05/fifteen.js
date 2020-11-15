/*
   Federico Serra matricola 898925
   Corso di Tecnologie Web
   Consegna esercizio 5 di laboratorio: fifteen puzzle (JS + DOM)
*/

// tile side in pixels
const TILE_SIDE = 100;
// puzzle side in tiles number
const PUZZLE_LENGTH = 4;
// contains current free tile; empty at game start
var freeTile = "";
// array of puzzle's tiles
var tiles = new Array(PUZZLE_LENGTH * PUZZLE_LENGTH - 1);

window.onload = newGame;

// initialize puzzle and set shuffle button
function newGame() {
  tiles = document.querySelectorAll("#puzzlearea div");
  initializeTiles(tiles);
  freeTile = "r3c3";
  document.getElementById("shufflebutton").innerHTML = "Shuffle";
  document.getElementById("shufflebutton").onclick = shuffleTiles;
}

// initialize tiles in the correct order (puzzle is solved)
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

// set red border for hovered tile
function setHovering() {
  if (canMove(this.id)) {
    this.classList.add("hoveredTile");
  }
}

// unset red border for the tile if it is no longer hovered; back to black
function unsetHovering() {
  this.classList.remove("hoveredTile");
}

/* check if current tile can move, used by move() of tile's onclick
   1 means that the tile is ADJACENT in the same row of the free tile
   10 that that the tile is ADJACENT in the same column of the free tile */
function canMove(currTile) {
  var dist = Math.abs(getDigits(currTile) - getDigits(freeTile));
  return dist == 10 || dist == 1;
}

// return digits only from puzzle id
function getDigits(str) {
  return str.replace(/[^0-9]/g, "");
}

// set row and column for current tile
function setID(currTile, x, y) {
  var tileID = "r" + x + "c" + y;
  currTile.setAttribute("id", tileID);
}

// set image to display for current tile based on its position
function setImg(currTile, x, y) {
  var tile_img =
    String(-(y * TILE_SIDE)) + "px " + String(-(x * TILE_SIDE)) + "px";
  currTile.style.backgroundPosition = tile_img;
}

// move on tile's click, only if it is possible; check if game is over
function move() {
  if (canMove(this.id)) {
    var tmpID = this.id;
    this.setAttribute("id", freeTile);
    freeTile = tmpID;
    if (isCompleted()) {
      this.classList.remove("hoveredTile");
      congratulate();
    }
  }
}

// check if all tiles are in the correct order
function isCompleted() {
  for (var i = 1; i < tiles.length; i++) {
    if (tiles[i - 1].id > tiles[i].id)
      return 0; //there is at least one tile in the wrong position
  }
  return freeTile == "r3c3"; //avoid the case where the 15th tile isn't on left
}

// disable tiles properties and congratulate with user; modify shuffle button
function congratulate() {
  for (var tile in tiles) {
    tiles[tile].onmouseover = "";
    tiles[tile].onmouseleave = "";
    tiles[tile].onclick = "";
  }
  var p = document.createElement("p");
  p.innerHTML =
    "Congratulations!<br>Richard is proud of you<br>for achieving the (free) javascript 15 puzzle.";
  document.getElementById("controls").appendChild(p);
  document.getElementById("shufflebutton").innerHTML = "Game over!";
  document.getElementById("shufflebutton").onclick = restart;
}

// create new game and reset the congratulation message
function restart() {
  document
    .getElementById("controls")
    .removeChild(document.querySelector("#controls p"));
  newGame();
  shuffleTiles();
}

// shuffle tiles button
function shuffleTiles() {
  var shufflingNum = parseInt(Math.random() * TILE_SIDE * PUZZLE_LENGTH);
  var tmpTiles = [...tiles];

  while (shufflingNum) {
    var movableTiles = new Array();
    for (tile in tmpTiles) {
      if (canMove(tmpTiles[tile].id)) {
        movableTiles.push(tmpTiles[tile].id);
      }
    }
    var randIndex = parseInt(Math.random() * movableTiles.length);
    var randTileID = movableTiles[randIndex];
    document.getElementById(randTileID).setAttribute("id", freeTile);
    freeTile = randTileID;
    shufflingNum--;
  }
}
