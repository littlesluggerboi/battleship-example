import { experiments } from "webpack";
import Ship from "../classes/ship";

test("Ship properties", ()=>{
    const ship = new Ship(1, 3, 'vertical');
    expect(ship.ship_id).toBe(1);
    expect(ship.hits).toBe(0);
    expect(ship.orientation).toBe('vertical')
    expect(ship.length).toBe(3);
})

test("Hit Function", () => {
  const ship = new Ship(1, 3);
  expect(ship.hits).toBe(0);
  ship.hit();
  expect(ship.hits).toBe(1);
  ship.hit();
  expect(ship.hits).toBe(2);
  ship.hit();
  expect(ship.hits).toBe(3);
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("Is Sunk function", () => {
  const ship = new Ship(1, 3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Flip function", () => {
  const ship = new Ship(1, 3);
  expect(ship.orientation).toBe("horizontal");
  ship.flip();
  expect(ship.orientation).toBe("vertical");
  ship.flip();
  expect(ship.orientation).toBe("horizontal");
  ship.flip();
  expect(ship.orientation).toBe("vertical");
});
