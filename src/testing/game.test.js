import GameLogic from '../js/game';
import Player from '../js/player';

const player1 = Player('Player 1', 'x');
const tokens = ['x', 'o', '#', '$', '@', '!'];

test('update the tokens list by removing selected player token', () => {
  expect(GameLogic.updateTokens(player1.token, tokens)).toEqual(['o', '#', '$', '@', '!']);
});

test('player should have a name and token', () => {
  expect(player1).toHaveProperty('name', 'Player 1');
  expect(player1).toHaveProperty('token', 'x');
});

test('return false if the cell is selected already', () => {
  const element = jest.spyOn(document, 'getElementById');
  const cell = document.createElement('div');
  window.alert = jest.fn();
  cell.id = '0';
  cell.innerHTML = 'x';
  element.mockReturnValue(cell);
  window.alert.mockReturnValue('Please, select another cell');
  GameLogic.playerInput(0);
  expect(GameLogic.playerInput(0)).toBeFalsy();
});

test('return undefined if the cell is not selected yet', () => {
  const element1 = jest.spyOn(document, 'getElementById');
  const cell2 = document.createElement('div');
  cell2.id = '1';
  cell2.innerHTML = 'x';
  element1.mockReturnValue(cell2);
  GameLogic.playerInput();
  expect(GameLogic.playerInput()).toBeUndefined();
});

test('return true if the end game and there is a winner', () => {
  const currentPlayer = player1;
  const message = jest.spyOn(document, 'querySelector');

  const messageContainer = document.createElement('div');
  messageContainer.id = 'instructions';
  message.mockReturnValue(messageContainer);

  const boardArray = ['x', '', '', '', 'x', '', '', '', 'x'];
  GameLogic.endGame(boardArray, currentPlayer, currentPlayer.name);
  expect(GameLogic.endGame(boardArray, currentPlayer, currentPlayer.name)).toBeTruthy();
});