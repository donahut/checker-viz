import React from 'react';
import {Alert} from 'react-bootstrap'

export default React.createClass({
  getInitialState() {
    return {};
  },

  /* 
     Displays an alert that:
     - notifys user game is over
     - outcome of the game
     - information to proceed
   */
  render() {
    if (this.props.show) {
    return (
        <Alert bsStyle={this.props.alert.style}>
          <strong>Game Over! {this.props.alert.verdict}</strong> <br />
          {this.props.alert.msg} <br />
          Click <strong>Reset</strong> above to start another game.
        </Alert>);
    } else {
      return null;
    } 
  },
});
