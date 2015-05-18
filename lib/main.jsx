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
                <Controls control={this} active={this.state.active}/>
                <Board size={this.state.size} 
                squareSize={this.state.squareSize}
                board={this.state.board}
                activeSquare={this.state.activeSquare}
                active={this.state.active}/>
                </div>);
    },

    _initGame(size, squareSize=this.props.squareSize) {
        let boardData = this._initBoard(size, squareSize);
        return {
            size: size,
            squareSize: squareSize,
            board: boardData[0],
            activeSquare: boardData[1],
            previous: [],
            active: false
        }; 
    },

    _initBoard(size, squareSize) {
        let row = Math.floor((Math.random() * size));
        let col = Math.floor((Math.random() * size));
        let activeSquare = [row, col];
        console.log("AS: " + [col, row]);

        let key = 0;
        let board = new Array(size);
        for (let i = 0; i < size; i++){
            board[i] = new Array(size);
        }

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let active = (i == row && j == col) ? true : false;
                let color = key++ % 2 == 0 ? '#F7F7F7' : '#6B656E';          

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

                board[i][j] = {
                    glyph: direction,
                    direction: direction,
                    color: color,
                    highlight: active ? '#92D18B' : '#BABABA'
                };
            }
        }
        
        return [board, activeSquare];
    },

    _tryMove() {
        let r = this.state.activeSquare[0];
        let c = this.state.activeSquare[1];
        let direction = this.state.board[r][c].direction;

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
        let r = this.state.activeSquare[0];
        let c = this.state.activeSquare[1];
        let pr = possibleSquare[0];
        let pc = possibleSquare[1];

        if (!this._containsCycle(possibleSquare)){
            this.state.board[r][c].glyph = 'repeat';
            this.state.board[r][c].highlight = '#92D18B';
            return 'cycle';
        }
        if (this._checkSquare(possibleSquare)) {
            this.state.previous.push(this.state.activeSquare);
            this.state.board[pr][pc].highlight = '#92D18B';
            this.state.activeSquare = possibleSquare;
            return 'move';
        } else { 
            this.state.board[r][c].glyph = 'remove';
            this.state.board[r][c].highlight = '#FD5E66';
            return 'off';
        }
    },

    _play() {
        console.log('Game loop active...');
        let result = this._move();
        switch(result) {
        case 'cycle':
            this.stop();
            this.setState(this.state);
            alert('Checker has entered a cycle, it will never go off the board.');
            break;
        case 'off':
            this.stop();
            this.setState(this.state);
            alert('The checker went off the board.');
            break;
        default:
            this.setState(this.state);
        }        
    },

    _startGameLoop() {        
        this.state.active = true;
        this.state.gameLoop = setInterval(this._play, 2000);
    },

    play() {        
        console.log("Play");
        if (!this.state.active) {
            this._startGameLoop();
        } else {
            console.log('Game in progress...');
        }
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
