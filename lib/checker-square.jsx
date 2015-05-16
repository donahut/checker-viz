import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap'

//this exports a reference to a React class as the default export
export default React.createClass({

  /**
   * In React state is maintained by the component itself.
   * @returns {{}} The initial state
   */
  getInitialState() {
    return {};
  },
  
  /**
   * This must return a JSX element.
   * @returns {XML}
   */
  render() {
    //this will set the CSS style of the div we're returning.
    //this.props are injected by the entity that instantiated
    //this react class.
    let style = {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.props.color
    };

    let arrowStyle = {
      width: this.props.size,
      height: this.props.size,
      color: 'yellow',
      backgroundColor: this.props.color,
      fontSize: '24pt',
      textAlign: 'center',
      lineHeight: this.props.size + 'px'
    };

    let direction = this.props.direction;

    //To set a div's class in React you must use the 'className' attribute, instead of the
    //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
    if (this.props.direction != null) {
      return <div className='square' ref='square' style={style}>
          <div style={arrowStyle}>
            <Glyphicon glyph={direction} />
          </div>
        </div>;
    } else {
      return <div className='square' ref='square' style={style} />;
    }
  },

  /**
   * After a component mounts (ie the component is added to the DOM), this
   * function is called. Here you can get a reference to the DOMElement by
   * using reacts ref mechanism.
   */
  componentDidMount() {
    //checker is a reference to a DOMElement.
    let checker = React.findDOMNode(this.refs.square);
  }
});
