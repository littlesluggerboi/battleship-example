import Gameboard from "./gameboard";
import Ship from "./ship";
import layouts from "./gameboardlayouts";

class ComputerPlayer {
  constructor() {
    this.gameBoard = new Gameboard(10, 10);
  }

  #randomInteger(end){
    let x = Math.random() * end;
    return Math.floor(x);
  }
  
  // naming covnetion
  arrangeShips() {
    const layoutNumber = this.#randomInteger(layouts.length);
    const layout = layouts[layoutNumber];
    for(let shipCoordinate of layout){
        const ship = new Ship(shipCoordinate.ship_length);
        this.gameBoard.place(ship, shipCoordinate.coordinate, shipCoordinate.orientation);
    }
  }
  
  
}
