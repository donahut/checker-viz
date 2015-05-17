//all import statements must go at the top of the file.
import React from 'react';
import Board from './checker-board';
import Controls from './play-controls';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

//This is a React class. It's main methods are 'getInitialState', and 'render'.
let Main = React.createClass({

    getInitialState() {
        return this._initGame(this.props.size);
    },

    render() {
        return (<div>
                <Controls control={this}/>
                <Board size={this.state.size} 
                squareSize={this.state.squareSize}
                arrows={this.state.arrows}
                activeSquare={this.state.activeSquare} />
                </div>);
    },

    _initGame(size, squareSize=this.props.squareSize) {
        let boardData = this._initBoard(size, squareSize);
        return {
            size: size,
            squareSize: squareSize,
            arrows: boardData[0],
            activeSquare: boardData[1],
            previous: [],
        }; 
    },

    _initBoard(size, squareSize) {
        let arrows = new Array(size);
        for (let i = 0; i < size; i++){
            arrows[i] = new Array(size);
        }

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let rand = Math.floor((Math.random() * 4) + 1);
                let direction = null;
                
                switch(rand) {
                case 1:
                    direction = 'arrow-up';
                    break;
                case 2:
                    direction = 'arrow-right';
                    break;
                case 3:
                    direction = 'arrow-down';
                    break;
                default:
                    direction = 'arrow-left';
                    break;
                }
                arrows[i][j] = direction;
            }
        }

        let row = Math.floor((Math.random() * size));
        let col = Math.floor((Math.random() * size));
        let activeSquare = [row, col];
        console.log("AS: " + [col, row]);
        
        return [arrows, activeSquare];
    },

    _tryMove() {
        let r = this.state.activeSquare[0];
        let c = this.state.activeSquare[1];
        let direction = this.state.arrows[r][c];

        console.log('DIR: ' + direction);
        switch(direction) {
        case 'arrow-up':
            r--;
            break;
        case 'arrow-right':
            c++;
            break;
        case 'arrow-down':
            r++;
            break;
        case 'arrow-left':
            c--;
            break;
        default:
            console.log('Invalid direction...');
        }
        console.log('R: ' + c + ' C: ' + r);
        return [r, c];
    },

    _checkSquare(square) {
        let r = square[0];
        let c = square[1];
        
        if ((r < 0 || r >= this.state.size) ||
            (c < 0 || c >= this.state.size)) {
            return false;
        }
        return true;
    },

    _containsCycle(square) {
        if (this.state.previous.length > 0) {
            return this.state.previous.every(
                function(element, index, array) {
                    if (element[0] === square[0] &&
                        element[1] === square[1]) {
                        return false;
                    }
                    return true;
                });
        }
        return true;
    },

    _move() {
        let possibleSquare = this._tryMove();

        if (!this._containsCycle(possibleSquare)){
            return 'cycle';
        }
        if (this._checkSquare(possibleSquare)) {
            this.state.previous.push(this.state.activeSquare);
            let arrows = this.state.arrows;
            let r = this.state.activeSquare[0];
            let c = this.state.activeSquare[1];
            arrows[r][c] = 'flag';
            this.state.arrows = arrows;
            this.state.activeSquare = possibleSquare;
            return 'move';
        } else { 
            return 'off';
        }
    },

    _play() {
        console.log('Game loop active...');
        let result = this._move();
        switch(result) {
        case 'cycle':
            this.stop();
            alert('Checker has entered a cycle, it will never go off the board');
            break;
        case 'off':
            this.stop();
            alert('The checker went off the board...  :(');
            break;
        default:
            this.setState(this.state);
        }        
    },

    play() {        
        console.log("Play");
        this.state.gameLoop = setInterval(this._play, 2000);
    },

    stop() {
        console.log("Stop");
        clearInterval(this.state.gameLoop);
        console.log('Game loop stopped...');
    },

    reset() {
        console.log("Reset");
        let gameData = this._initGame(this.state.size);
        this.setState(gameData);
    },

    setSize() {
        //we update our internal state.
        let gameData = this._initGame(7);
        //setting our state forces a rerender, which in turn will call the render() method
        //of this class. This is how everything gets redrawn and how you 'react' to user input
        //to change the state of the DOM.
        this.setState(gameData);
    }
});

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<Main squareSize={80} size={5}/>, content, () => {
    console.log("Rendered!");
});
