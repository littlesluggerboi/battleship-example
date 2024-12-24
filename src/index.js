import Gameboard from "./classes/gameboard";
import Ship from "./classes/ship";
import BoardController from "./controller/board_controller";
import "./styles.css";

let selected = null;

const ships = document.querySelectorAll("div.ship");
for (let ship of ships) {
  ship.addEventListener("dragstart", (e) => {
    selected = e.target.id;
  });
  ship.addEventListener("dragend", (e) => {
    const shipUI = document.getElementById(selected);
    shipUI.classList.remove("selected");
  });
}

function canPlace() {
  return true;
}

const cells = document.querySelectorAll("td");
for (let cell of cells) {
  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
    const shipUI = document.getElementById(selected);
    if (shipUI != e.target && canPlace()) {
      shipUI.classList.add("selected");
      e.target.append(shipUI);
    }
  });

  cell.addEventListener("drop", (e) => {
    const shipUI = document.getElementById(selected);
    shipUI.classList.remove("selected");
    if (e.target != shipUI) {
      e.target.append(shipUI);
    }
  });
}
// cannot rely on the id since the board implements a map.
// if cannot insert then make the dragged element visible
// if can insert make the dragged element visible and highlight the places where the ship can be placed.

const gameboard = new Gameboard(10, 10);
const ship1 = new Ship(1, 3);
const ship2 = new Ship(2, 4, "vertical");
gameboard.place(ship1, { row: 0, col: 0 });
gameboard.place(ship2, { row: 2, col: 0 });
const gameboardController = new BoardController(gameboard);
gameboardController.showPlayingMode();
console.log(gameboard);
