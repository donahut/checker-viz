class Game {
    constructor(size) {
        this.size = size;
        this._initGame();
        this.path = {};
    }
    
    _initGame() {
        this._placeChecker();
        this._createBoard();
        this._initBoard();
    }

    _placeChecker() {
        let row = Math.floor((Math.random() * this.size));
        let col = Math.floor((Math.random() * this.size));
        this.activeSquare = [row, col];
    }

    _createBoard() {
        this.board = new Array(this.size);
        for (let i = 0; i < this.size; i++){
            this.board[i] = new Array(this.size);
        }
    }

    _initBoard() {        
        let ref = 0;
        let row = this.activeSquare[0]
        let col = this.activeSquare[1]
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let active = (i == row && j == col) ? true : false;
                ref++;
                let background = ref % 2 == 0 ? '#F7F7F7' : '#6B656E';          
                let rand = Math.floor((Math.random() * 4) + 1);
                let direction = null;
                switch(rand) {
                case 1:
                    direction = 'up';
                    break;
                case 2:
                    direction = 'right';
                    break;
                case 3:
                    direction = 'down';
                    break;
                case 4:
                    direction = 'left';
                    break;
                }
                this.board[i][j] = {
                    ref: ref,
                    glyph: 'arrow-' + direction,
                    direction: direction,
                    color: active ? '#92D18B' : '#BABABA',
                    background: background
                };
            }
        }       
    }

    /*
      Playback / visualization related functions
    */

    updateBoardModel(square, state) {
        square = [parseInt(square[0]),
                  parseInt(square[1])];
        switch (state) {
        case 'path':
            this._applyPathState(square);
            break;
        case 'active':
            this.activeSquare = square;
            this._applyActiveState(square);
            break;
        case 'end':
            this._applyEndState(square);
            break;
        }
    }

    _applyPathState(square) {
        let direction = this._getBoardAttribute(square, 'direction');
        let ref = this._getBoardAttribute(square, 'ref');
        let background = ref % 2 == 0 ? '#F7F7F7' : '#6B656E';          
        this._setBoardAttribute(square, 'glyph',
                               'arrow-' + direction);
        this._setBoardAttribute(square, 'color', '#92D18B');
        this._setBoardAttribute(square, 'background', background);
    }

    _applyActiveState(square) {
        this._setBoardAttribute(square, 'glyph', 'record');
        this._setBoardAttribute(square, 'color', '#6B656E');
        this._setBoardAttribute(square, 'background', '#92D18B');       
    }

    _applyEndState(square) {
        if (this.endOff) {
            this._setBoardAttribute(square, 'glyph', 'remove');
            this._setBoardAttribute(square, 'color', '#F7F7F7');
            this._setBoardAttribute(square, 'background', '#FD5E66');
        } else {
            this._setBoardAttribute(square, 'glyph', 'repeat');
            this._setBoardAttribute(square, 'color', '#F7F7F7');
            this._setBoardAttribute(square, 'background', '#92D18B');
        }
    }

    _setBoardAttribute(square, key, value) {
        let r = square[0];
        let c = square[1];
        this.board[r][c][[key]] = value;
    }

    _getBoardAttribute(square, key) {
        let r = square[0];
        let c = square[1];
        return this.board[r][c][[key]];
    }

    /*
      Solving related functions
    */

    _checkSquare(square) {
        let r = square[0];
        let c = square[1];
        
        if ((r < 0 || r >= this.size) ||
            (c < 0 || c >= this.size)) {
            return true;
        }
        return false;
    }

    _containsCycle(square) {
        if (Object.keys(this.path).length > 0) {
            if (this.path[square] !== undefined) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    
    _move(square) {
        let r = square[0];
        let c = square[1];
        let direction = this.board[r][c].direction;
        switch(direction) {
        case 'up':
            r--;
            break;
        case 'right':
            c++;
            break;
        case 'down':
            r++;
            break;
        case 'left':
            c--;
            break;
        }
        return [r, c];
    }

    _solver(square, i) {
        if (this._checkSquare(square)) {
            this.endOff = true;
            return;
        } else if (this._containsCycle(square)) {
            this.endOff = false;
            return;
        } else {
            this.path[square] = i;
            i++;
        }
        this._solver(this._move(square), i);
    }

    solve() {
        this._solver(this.activeSquare, 0);
        return Object.keys(this.path);
    }
}

module.exports = Game;
