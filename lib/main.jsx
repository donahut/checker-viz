//all import statements must go at the top of the file.
import React from 'react';
import Board from './checker-board';
import Controls from './play-controls';
import Alert from './alert';
import Game from './game';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

//This is a React class. It's main methods are 'getInitialState', and 'render'.
let Main = React.createClass({

    getInitialState() {
        return this._initGame(this.props.size);
    },

    render() {
        return (<div>
                <Controls control={this} 
                          active={this.state.active}
                          reset={this.state.gameOver} />
                <Alert show={this.state.gameOver} 
                       alert={this.state.alertInfo} />
                <Board size={this.state.size} 
                       squareSize={this.state.squareSize}
                       game={this.state.game}
                       active={this.state.active}
                       gameOver={this.state.gameOver}/>
                </div>);
    },
    
    // State/Game initialization
    _initGame(size, squareSize=this.props.squareSize) {
        let game = new Game(size);
        return {
            size: size,
            squareSize: squareSize,
            game: game,
            active: false,
            gameOver: false,
            alert: null
        }; 
    },
    
    // Visualize / playback the path solution
    _playback(pathItr) {
        console.log('Game loop active...');
        this.state.game.updateBoardModel(this.state.game.activeSquare,
                                         'path');
        let step = pathItr.next();  // iterator will notify when path
                                    // is complete
        if (!step.done) { // if more steps on path
            let square = step.value.split(",");
            this.state.game.updateBoardModel(square, 'active');
        } else { // if end of path
            this.state.game.updateBoardModel(this.state.game.activeSquare,
                                             'end');         
            this.state.alertInfo = this.state.game.getAlertInfo();
            this.state.gameOver = true;
            this.stop();
        }
        this.setState(this.state);
    },
    
    // Solve for path and replay (square per second)
    _startGameLoop() {        
        this.state.active = true;
        let path = this.state.game.solve();
        let pathItr = path[Symbol.iterator]();
        this.state.gameLoop = setInterval(this._playback, 1000, pathItr);
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

    setSize(size) {
        //we update our internal state.
        let gameData = this._initGame(size);
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
