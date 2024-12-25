import CoverController from "./cover_controller";
import TableController from "./table_controller";

export default function GameController() {
  const display = document.querySelector("div.tables");
  const startButton = display.querySelector("button.start");
  const coverController = new CoverController();
  let turn = false;

  let board1 = new TableController("board1", "11");
  let board2 = new TableController("board2", "22");

  const endSequence = (winner) => {
    coverController.setMessage(winner);
    coverController.show();
  };

  const restart = () => {
    coverController.hide();
    startButton.style.visibility = "visible";
    board1.showButtons();
    board2.showButtons();
    board1 = new TableController("board1", "11");
    board2 = new TableController("board2", "22");
  };

  const changeDisplay = () => {
    if (turn) {
      board1.showDisable();
      board2.showPlay();
      board2.gameboardController.emptyShells.forEach((el) => {
        el.addEventListener("click", () => {
          const row = el.dataset.row;
          const col = el.dataset.col;
          const coordinate = { col: col, row: row };
          board2.gameboardController.gameboard.receiveAttack(coordinate);
          turn = !turn;
          changeDisplay();
        });
      });
    } else {
      board2.showDisable();
      board1.showPlay();
      board1.gameboardController.emptyShells.forEach((el) => {
        el.addEventListener("click", () => {
          const row = el.dataset.row;
          const col = el.dataset.col;
          const coordinate = { col: col, row: row };
          board1.gameboardController.gameboard.receiveAttack(coordinate);
          turn = !turn;
          changeDisplay();
        });
      });
    }
    if (board1.isDone()) {
      // end sequence
      endSequence("Board1");
    } else if (board2.isDone()) {
      // end sequence
      endSequence("Board2");
    }
  };

  startButton.addEventListener("click", (e) => {
    // gamestart sequence
    board1.hideButtons();
    board2.hideButtons();
    changeDisplay();
    startButton.style.visibility = "hidden";
  });

  coverController.getRestart().addEventListener("click", restart);
}
