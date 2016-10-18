const View = require('./ttt-view.js')
const Game = require('./game.js')

$( () => {
  let game = new Game();
  let $figure = $('.ttt');
  let view = new View(game, $figure);
  view.setupBoard();
  view.bindEvents();
});
