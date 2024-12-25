import Gameboard from "../classes/gameboard";
import BoardController from "./board_controller";
import Ship from "../classes/ship";
export default function TableController(id, tableId) {
  const gameboard = new Gameboard(10, 10);
  const table_id = parseInt(tableId);
  this.gameboardController = new BoardController(gameboard, tableId);
  const display = document.getElementById(id);
  const editButton = display.querySelector("button.edit");
  const hideButton = display.querySelector("button.hide");

  const initalizeBoard = () => {
    const ship1 = new Ship(table_id + 1, 2, "horizontal");
    const pos1 = { row: 0, col: 0 };
    const ship2 = new Ship(table_id + 2, 4, "vertical");
    const pos2 = { row: 2, col: 0 };
    const ship3 = new Ship(table_id + 3, 2, "horizontal");
    const pos3 = { row: 7, col: 0 };
    const ship4 = new Ship(table_id + 4, 3, "vertical");
    const pos4 = { row: 0, col: 3 };
    const ship5 = new Ship(table_id + 5, 4, "horizontal");
    const pos5 = { row: 0, col: 6 };
    const ship6 = new Ship(table_id + 6, 3, "horizontal");
    const pos6 = { row: 2, col: 5 };
    const ship7 = new Ship(table_id + 7, 2, "vertical");
    const pos7 = { row: 2, col: 9 };
    const ship8 = new Ship(table_id + 8, 2, "vertical");
    const pos8 = { row: 5, col: 5 };
    const ship9 = new Ship(table_id + 9, 3, "vertical");
    const pos9 = { row: 5, col: 9 };
    const ship10 = new Ship(table_id + 10, 6, "horizontal");
    const pos10 = { row: 9, col: 4 };
    gameboard.place(ship1, pos1);
    gameboard.place(ship2, pos2);
    gameboard.place(ship3, pos3);
    gameboard.place(ship4, pos4);
    gameboard.place(ship5, pos5);
    gameboard.place(ship6, pos6);
    gameboard.place(ship7, pos7);
    gameboard.place(ship8, pos8);
    gameboard.place(ship9, pos9);
    gameboard.place(ship10, pos10);
  };
  this.isDone = ()=>{
    return gameboard.isFinish();
  }
  this.showEdit = () => {
    this.gameboardController.edit();
  };
  this.showPlay = () => {
    this.gameboardController.play();
  };
  this.showDisable = () => {
    this.gameboardController.disable();
  };

  this.hideButtons = () => {
    editButton.style.visibility = "hidden";
    hideButton.style.visibility = "hidden";
  };

  this.showButtons = () => {
    editButton.style.visibility = "visible";
    hideButton.style.visibility = "visible";
  };

  editButton.addEventListener("click", (e) => {
    this.showEdit();
  });
  hideButton.addEventListener("click", (e) => {
    this.showDisable();
  });

  initalizeBoard();
  this.showEdit();
}
