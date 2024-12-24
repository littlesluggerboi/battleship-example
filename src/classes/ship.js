export default class Ship {
  constructor(ship_id, length, orientation = 'horizontal') {
    this.length = length;
    this.hits = 0;
    this.ship_id = ship_id;
    this.orientation = orientation;
  }

  isSunk() {
    return this.hits == this.length;
  }

  hit() {
    if(!this.isSunk()){
        this.hits++;
    }
  }
  
  flip(){
    if(this.orientation === 'horizontal'){
      this.orientation = 'vertical';
    } else{
      this.orientation = 'horizontal';
    }
  }

}
