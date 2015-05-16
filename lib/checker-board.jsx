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
    let key = 0;
    let color = null;
    let arrow = null;    
    for(let i = 0; i < this.props.size; i++) {
      for(let j = 0; j < this.props.size; j++) {
        key++;
        if (this.props.arrows != null){    
          arrow = this.props.arrows[i][j];
        }
        color = key % 2 == 0 ? '#333333' : '#BBBBBB';          
        if (this.props.activeSquare != null &&
            i == this.props.activeSquare[0] &&
            j == this.props.activeSquare[1]){
          color = '#FF0000';
        }
        squares.push(<Square key={key} 
                             size={this.props.squareSize} 
                             color={color} 
                             direction={arrow}/>);
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
