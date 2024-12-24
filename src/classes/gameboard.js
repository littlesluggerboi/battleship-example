// zero mean unnoccupied/ then
export default class Gameboard {
  constructor(width, height) {
    this.board = [];
    for (let i = 0; i < height; i++) {
      const x = [];
      for (let j = 0; j < width; j++) {
        x.push(0);
      }
      this.board.push(x);
    }
    this.boats = new Map();
  }

  // key == id,
  // value{
  // position: coordinate{row, col}
  // ship: ship
  // }

  canPlace(ship, coordinate) {
    if (ship.orientation === "vertical") {
      let startRow = coordinate.row;
      let endRow = coordinate.row + ship.length;
      if (
        startRow < 0 ||
        startRow >= this.board.length ||
        coordinate.col < 0 ||
        coordinate.col >= this.board[0].length
      ) {
        return false;
      }
      for (let row = startRow; row < endRow; row++) {
        if (this.board[row][coordinate.col] !== 0) {
          return false;
        }
      }
    } else {
      let startCol = coordinate.col;
      let endCol = startCol + ship.length;

      if (
        startCol < 0 ||
        startCol >= this.board[0].length ||
        coordinate.row < 0 ||
        coordinate.row >= this.board.length
      ) {
        return false;
      }

      for (let col = startCol; col < endCol; col++) {
        if (this.board[coordinate.row][col] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // return true or false? if placed successfully?
  place(ship, coordinate) {
    if (this.canPlace(ship, coordinate)) {
      this.boats.set(ship.ship_id, {
        position: coordinate,
        ship: ship,
      });
      if (ship.orientation === "vertical") {
        for (
          let row = coordinate.row;
          row < coordinate.row + ship.length;
          row++
        ) {
          this.board[row][coordinate.col] = ship.ship_id;
        }
      } else {
        for (
          let col = coordinate.col;
          col < coordinate.col + ship.length;
          col++
        ) {
          this.board[coordinate.row][col] = ship.ship_id;
        }
      }
    }
  }

  //
  receiveAttack(coordinate) {
    const boatId = this.board[coordinate.row][coordinate.col];
    if (boatId == 0) {
      this.board[coordinate.row][coordinate.col] = -1;
    } else if (boatId < 0) {
      return false;
    } else {
      const ship = this.boats.get(boatId).ship;
      ship.hit();
      this.board[coordinate.row][coordinate.col] = -2;
    }
    return true;
  }

  canMove(ship_id, coordinate) {
    const shipPosition = this.boats.get(ship_id);
    const ship = shipPosition.ship;
    if (ship.orientation === "vertical") {
      let startRow = coordinate.row;
      let endRow = coordinate.row + ship.length;
      if (
        startRow < 0 ||
        startRow >= this.board.length ||
        coordinate.col < 0 ||
        coordinate.col >= this.board[0].length
      ) {
        return false;
      }
      for (let row = startRow; row < endRow; row++) {
        if (
          row >= this.board.length ||
          (this.board[row][coordinate.col] !== 0 &&
            this.board[row][coordinate.col] != ship_id)
        ) {
          return false;
        }
      }
    } else {
      let startCol = coordinate.col;
      let endCol = startCol + ship.length;

      if (
        startCol < 0 ||
        startCol >= this.board[0].length ||
        coordinate.row < 0 ||
        coordinate.row >= this.board.length
      ) {
        return false;
      }

      for (let col = startCol; col < endCol; col++) {
        if (
          col >= this.board[0].length ||
          (this.board[coordinate.row][col] !== 0 &&
            this.board[coordinate.row][col] != ship_id)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  #removeFromArry(ship, prevCoor) {
    if (ship.orientation === "vertical") {
      for (let row = prevCoor.row; row < prevCoor.row + ship.length; row++) {
        this.board[row][prevCoor.col] = 0;
      }
    } else {
      for (let col = prevCoor.col; col < prevCoor.col + ship.length; col++) {
        this.board[prevCoor.row][col] = 0;
      }
    }
  }

  move(ship_id, coordinate) {
    if (this.canMove(ship_id, coordinate)) {
      // set array values into zero
      const ship = this.boats.get(ship_id).ship;
      const prevCoor = this.boats.get(ship_id).position;
      this.#removeFromArry(ship, prevCoor);

      // place function
      this.place(ship, coordinate);
    }
  }

  canFlip(ship_id) {
    const shipPosition = this.boats.get(ship_id);
    const ship = shipPosition.ship;
    const coordinate = shipPosition.position;
    ship.flip();
    let bool;
    if (this.canMove(ship_id, coordinate)) {
      bool = true;
    } else {
      bool = false;
    }
    ship.flip();
    return bool;
  }

  flip(ship_id) {
    if (this.canFlip(ship_id)) {
      const shipPos = this.boats.get(ship_id);
      const ship = shipPos.ship;
      const coordinate = shipPos.position;
      this.#removeFromArry(ship, coordinate);
      ship.flip();
      this.place(ship, coordinate);
    }
  }

  isFinish() {
    for (let shipPos of this.boats.values()) {
      const ship = shipPos.ship;
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
