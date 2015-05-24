import React from 'react';
//notice we use the relative path syntax when loading local files
import Square from './checker-square'

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    //this example just creates a row of squares. Use CSS styling to
    //get the checkers into a mxm size board
    
    //create a new array of squares
    let squares = [];
    let activeSquare = this.props.game.activeSquare;
    for(let i = 0; i < this.props.size; i++) {
      for(let j = 0; j < this.props.size; j++) {
        let active = (activeSquare[0] == i && activeSquare[1] == j);
        squares.push(<Square key={this.props.game.board[i][j].ref}
                             size={this.props.squareSize} 
                             color={this.props.game.board[i][j].color}
                             background={this.props.game.board[i][j].background}
                             glyph={this.props.game.board[i][j].glyph}
                             active={active}/>
        );
      }
    }
    let size = (this.props.squareSize + 2) * this.props.size;
    let style = {
      width: size,
      height: size
    };
    return (
      <div style={style}>
        {squares}
      </div>
    );
  },

  componentDidUpdate() {
    console.log('Board updated');
    if (this.props.gameOver && this.props.game.endState != null) {
      if (this.props.game.endState === 'cycle') {
        let end = new Audio('./sounds/chime_bell_ding.wav'); 
        end.play();
      } else {
        let end = new Audio('./sounds/chime_bell_dong.wav'); 
        end.play();
      }
    } else if (this.props.active) {
      let checker = new Audio('./sounds/pop_drip.wav'); 
      checker.play();
    }
  }

});
