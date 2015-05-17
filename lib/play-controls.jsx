import React from 'react';
//this syntax is called obejct destructing.
import {Panel, Button, ButtonToolbar, Glyphicon, Alert, Form, Input} from 'react-bootstrap'

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <Panel>
        <ButtonToolbar>
          <Button bsStyle="success" onClick={this.onPlay}><Glyphicon
            glyph='play' /> Play</Button>
          <Button bsStyle="danger" onClick={this.onStop}><Glyphicon
            glyph='stop' /> Stop</Button>
          <Button bsStyle="primary" onClick={this.onReset}><Glyphicon
            glyph='refresh' /> Reset</Button>
          <Button onClick={this.onSetSize}>Set Size</Button>
        </ButtonToolbar>
      </Panel>)
  },

  onPlay() {
    this.props.control.play();
  },
  

  onStop() {
    this.props.control.stop();
  },
  
  
  onReset() {
    this.props.control.reset();
  },

  onSetSize() {
    this.props.control.setSize();
  }
});
