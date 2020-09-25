import GameBoard from '../js/board';

test('return an empty array', () => {
  GameBoard.resetMovesArray();
  expect(GameBoard.getMovesArray()).toEqual(['', '', '', '', '', '', '', '', '']);
});

test('update movesArray variable to have selected to be filled with current players token', () => {
  GameBoard.resetMovesArray();
  GameBoard.updateMovesArray(1, 'x');
  expect(GameBoard.getMovesArray()).toEqual(['', 'x', '', '', '', '', '', '', '']);
});