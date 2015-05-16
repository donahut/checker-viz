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
      fontSize: '24pt'
    }

    let rand = Math.floor((Math.random() * 4) + 1);
    let direction = null;

    //console.log('RAND: ' + rand);

    if (rand == 1) {
      direction = 'arrow-up';
    } else if (rand == 2) {
      direction = 'arrow-right';
    } else if (rand == 3) {
      direction = 'arrow-down';
    } else {
      direction = 'arrow-left';
    }


    /* let classString = 'Glyphicon' + {direction} */
    //console.log('DIRECTION: ' + direction);

    //To set a div's class in React you must use the 'className' attribute, instead of the
    //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
    return <div className='square' ref='square' style={style}>
  <Button className='disabled' style={arrowStyle}>
    <Glyphicon glyph={direction} />
  </Button>
    </div>;
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
