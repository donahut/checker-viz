import React from 'react';
//this syntax is called obejct destructing.
import {Panel, Button, ButtonToolbar, Glyphicon, DropdownButton, MenuItem} from 'react-bootstrap'

export default React.createClass({
  getInitialState() {
    return {};
  },

  /*
     Note: see this bug - https://github.com/react-bootstrap/react-bootstrap/issues/299
     for why all the buttons are wrapped in "btn-group" divs
   */
  render() {
    return (
      <Panel>
        <ButtonToolbar>
          <div className="btn-group">
            <Button bsStyle="success" onClick={this.onPlay} disabled={this.props.active}><Glyphicon
              glyph='play' /> Play</Button></div>
          <div className="btn-group">
            <Button bsStyle="danger" onClick={this.onStop} disabled={this.props.reset}><Glyphicon
              glyph='stop' /> Stop</Button></div>
          <div className="btn-group">
            <Button bsStyle="primary" onClick={this.onReset}><Glyphicon
              glyph='refresh' /> Reset</Button></div>
          <DropdownButton bsStyle="default" title="Set Size">
            <MenuItem eventKey='1' onSelect={this.onSetSize}>1x1</MenuItem>
            <MenuItem eventKey='3' onSelect={this.onSetSize}>3x3</MenuItem>
            <MenuItem eventKey='5' onSelect={this.onSetSize}>5x5</MenuItem>
            <MenuItem eventKey='7' onSelect={this.onSetSize}>7x7</MenuItem>
            <MenuItem eventKey='9' onSelect={this.onSetSize}>9x9</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey='11' onSelect={this.onSetSize}>11x11</MenuItem>
            <MenuItem eventKey='13' onSelect={this.onSetSize}>13x13</MenuItem>
            <MenuItem eventKey='15' onSelect={this.onSetSize}>15x15</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </Panel>);
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

  onSetSize(e) {
    this.props.control.setSize(e);
  }
});
