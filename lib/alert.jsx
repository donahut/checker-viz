import React from 'react';
//this syntax is called obejct destructing.
import {Alert} from 'react-bootstrap'

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    if (this.props.show) {
    return (
        <Alert bsStyle={this.props.alert.style}>
          <strong>Game Over!</strong> <br />
          {this.props.alert.msg} <br />
          Click <strong>Reset</strong> above to start another game.
        </Alert>);
    } else {
      return null;
    } 
  },
});
