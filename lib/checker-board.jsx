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
    for(let i = 0; i < this.props.size; i++) {
      for(let j = 0; j < this.props.size; j++) {
        squares.push(<Square key={this.props.board[i][j].ref}
                             size={this.props.squareSize} 
                             color={this.props.board[i][j].color}
                             background={this.props.board[i][j].background}
                             glyph={this.props.board[i][j].glyph}/>
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
  }
});
