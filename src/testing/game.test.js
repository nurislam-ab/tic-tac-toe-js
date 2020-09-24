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