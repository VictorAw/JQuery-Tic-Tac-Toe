class View {
  constructor(game, $el) {
    this.game = game;
    this.figure = $el;
  }

  bindEvents() {
    let $grid = this.figure.children();
    let $children = $grid.children();
    this.mouseOverEvents($children);

    $children.on('click', event =>{
        const currentTarget = event.currentTarget;
        const $currentTarget = $(currentTarget);
        this.makeMove($currentTarget);
    });
  }

  mouseOverEvents($children){
    $children.on('mouseover', event => {
      const currentTarget = event.currentTarget;
      const $currentTarget = $(currentTarget);

      $currentTarget.addClass('hover');
    });

    $children.on('mouseleave', event => {
      const currentTarget = event.currentTarget;
      const $currentTarget = $(currentTarget);

      $currentTarget.removeClass('hover');
    });
  }

  makeMove($square) {
    let pos = [parseInt($square.attr('row')), parseInt($square.attr('column'))]

    try {
      this.game.playMove(pos);
      $square.removeClass('unclicked');
      $square.addClass('clicked');
      $square.addClass(this.game.currentPlayer);
      $square.html(this.game.currentPlayer);
    } catch (e) {
      console.log("invalid move");
    }

    if(this.game.isOver()){
      alert('Game over!')
    }
  }

  setupBoard() {
    const $ul = $('<ul></ul>');
    $ul.addClass('grid')

    // for(let i = 0; i < 3; i++){
    //   const $li1 = $('<li></li>');
      for(let j = 0; j < 9; j++){
        const $li = $('<li></li>');

        $li.addClass("unclicked");
        $li.addClass("square");
        $li.attr('row', `${Math.floor(j / 3)}`)
        $li.attr('column', `${j % 3}`)
        $ul.append($li);
      }
      //   $li2.addClass('unclicked');
      //   $li2.addClass('square');
      //   $li1.append($li2);
      // }
      //
      // $li1.addClass('row')
      // $ul.append($li1);
    // }

    this.figure.append($ul);
  }
}

module.exports = View;
