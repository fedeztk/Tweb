const TILE_SIDE = 100;
const SQUARE_LENGTH = 4;
var free_tile = "r3c3";
window.onload = function () {
  var squares = document.querySelectorAll("#puzzlearea div");
  initializeSquares(squares);
};

function initializeSquares(squares) {
  for (var i = 0; i < SQUARE_LENGTH * SQUARE_LENGTH - 1; i++) {
    var x = Math.trunc(i / SQUARE_LENGTH);
    var y = Math.trunc(i % SQUARE_LENGTH);
    setPosition(squares[i], x, y);
    setImg(squares[i], x, y);
  }
}

function setPosition(tile, x, y) {
  var tile_pos = "r" + x + "c" + y;
  tile.setAttribute("id", tile_pos);
}

function setImg(tile, x, y) {
  var tile_img = String(-(y * 100)) + "px " + String(-(x * 100)) + "px";
  tile.style.backgroundPosition = tile_img;
}
// myString = myString.replace(/\D/g,'');
