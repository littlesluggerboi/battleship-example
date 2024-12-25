export default function BoardController(board, tableId) {
  this.gameboard = board;
  this.tableId = tableId;
  this.selected = null;
  this.emptyShells = [];
  const crossSVG = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "2.7rem");
    svg.setAttribute("height", "2.7rem");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const line1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    line1.setAttribute("x1", "0rem");
    line1.setAttribute("y1", "0rem");
    line1.setAttribute("x2", "2.7rem");
    line1.setAttribute("y2", "2.7rem");

    const line2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    line2.setAttribute("x1", "0rem");
    line2.setAttribute("y1", "2.7rem");
    line2.setAttribute("x2", "2.7rem");
    line2.setAttribute("y2", "0rem");
    svg.append(line1, line2);
    return svg;
  };

  const createShipElement = (ship) => {
    const shipElement = document.createElement("div");
    shipElement.id = ship.ship_id;
    shipElement.className = "ship";
    shipElement.draggable = "true";
    const width = "100%";
    const height =
      "calc(" + ship.length * 100 + "% + " + (ship.length - 1) + "px)";
    if (ship.orientation == "vertical") {
      shipElement.style.width = width;
      shipElement.style.height = height;
    } else {
      shipElement.style.height = width;
      shipElement.style.width = height;
    }
    return shipElement;
  };
  this.edit = () => {
    const boardDisyplay = document.getElementById(tableId);
    const table = document.createElement("table");
    table.id = this.tableId;
    const theads = document.createElement("tr");
    theads.append(document.createElement("th"));
    for(let i = 0; i < 10; i++){
        const th = document.createElement("th");
        th.innerHTML = String.fromCharCode(65+i);
        theads.append(th);
    }
    table.append(theads);
    for (let row = 0; row < this.gameboard.board.length; row++) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.innerHTML = row;
      th.style.padding = "1rem"
      tr.append(th);
      for (let col = 0; col < this.gameboard.board[0].length; col++) {
        const td = document.createElement("td");
        td.dataset.row = row;
        td.dataset.col = col;
        td.addEventListener("dragover", (e) => {
          e.preventDefault();

          const shipUI = document.getElementById(this.selected);
          if (
            e.target.dataset.col != null &&
            e.target.dataset.row != null &&
            shipUI != e.target
          ) {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            const coordinate = { row: row, col: col };
            if (this.gameboard.canMove(this.selected, coordinate)) {
              shipUI.classList.add("selected");
              e.target.append(shipUI);
              this.gameboard.move(this.selected, coordinate);
            }
          }
        });
        if (this.gameboard.board[row][col] > 0) {
          const shipPositon = this.gameboard.boats.get(
            this.gameboard.board[row][col]
          );
          const position = shipPositon.position;
          if (position.row == row && position.col == col) {
            // append an element
            const ship = shipPositon.ship;
            const shipElement = createShipElement(ship);
            shipElement.addEventListener("click", (e) => {
              const boatId = parseInt(e.target.id);
              if (this.gameboard.canFlip(boatId)) {
                this.gameboard.flip(boatId);
                this.edit();
              }
            });

            shipElement.addEventListener("dragstart", (e) => {
              this.selected = parseInt(e.target.id);
            });

            shipElement.addEventListener("dragend", (e) => {
              const shipUI = document.getElementById(this.selected);
              shipUI.classList.remove("selected");
              this.edit();
            });
            td.append(shipElement);
          }
        }
        tr.append(td);
      }
      table.append(tr);
    }
    boardDisyplay.replaceWith(table);
  };

  this.play = () => {
    this.emptyShells = [];
    const boardDisyplay = document.getElementById(tableId);
    const table = document.createElement("table");
    table.id = this.tableId;
    const theads = document.createElement("tr");
    theads.append(document.createElement("th"));
    for(let i = 0; i < 10; i++){
        const th = document.createElement("th");
        th.innerHTML = String.fromCharCode(65+i);
        theads.append(th);
    }
    table.append(theads);
    for (let row = 0; row < this.gameboard.board.length; row++) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.innerHTML = row;
      th.style.padding = "1rem"
      tr.append(th);
      for (let col = 0; col < this.gameboard.board[0].length; col++) {
        const td = document.createElement("td");
        td.dataset.row = row;
        td.dataset.col = col;
        if (this.gameboard.board[row][col] == -1) {
          // hit with no ship
          td.classList.add("miss");
        } else if (this.gameboard.board[row][col] == -2) {
          // hit with a ship underneath
          td.append(crossSVG());
        } else{
          this.emptyShells.push(td);
        }

        tr.append(td);
      }
      table.append(tr);
    }
    for (let shipPosition of this.gameboard.boats.values()) {
      const ship = shipPosition.ship;
      const position = shipPosition.position;
      if (ship.isSunk()) {
        // show the mother fucker
        const shipElement = createShipElement(ship);
        const cell = table.querySelector(`td[data-row='${position.row}'][data-col='${position.col}']`);
        cell.append(shipElement);
      }
    }
    boardDisyplay.replaceWith(table);
  };

  this.disable = () =>{
    const boardDisyplay = document.getElementById(tableId);
    const table = document.createElement("table");
    table.id = this.tableId;
    const theads = document.createElement("tr");
    theads.append(document.createElement("th"));
    for(let i = 0; i < 10; i++){
        const th = document.createElement("th");
        th.innerHTML = String.fromCharCode(65+i);
        theads.append(th);
    }
    table.append(theads);
    for (let row = 0; row < this.gameboard.board.length; row++) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.innerHTML = row;
      th.style.padding = "1rem"
      tr.append(th);
      for (let col = 0; col < this.gameboard.board[0].length; col++) {
        const td = document.createElement("td");
        td.dataset.row = row;
        td.dataset.col = col;
        if (this.gameboard.board[row][col] == -1) {
          // hit with no ship
          td.classList.add("miss");
        } else if (this.gameboard.board[row][col] == -2) {
          // hit with a ship underneath
          td.append(crossSVG());
        }
        tr.append(td);
      }
      table.append(tr);
    }
    for (let shipPosition of this.gameboard.boats.values()) {
      const ship = shipPosition.ship;
      const position = shipPosition.position;
      if (ship.isSunk()) {
        const shipElement = createShipElement(ship);
        const cell = table.querySelector(`td[data-row='${position.row}'][data-col='${position.col}']`);
        cell.append(shipElement);
      }
    }
    table.style.backgroundColor = "white";
    boardDisyplay.replaceWith(table);
  }

}
