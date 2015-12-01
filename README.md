# Checker-Viz
Consider a checkerboard of unknown size. On each square is an arrow that randomly points either up, down, 
left, or right. A checker is placed on a random square. Each turn the checker moves one square in the direction 
of the arrow. Visualize an algorithm that determines if the checker moves off the edge of the board.

## Prerequisites
Install [io.js](https://iojs.org/en/index.html) on your system.

## Running

This project's runtime is [Electron](http://electron.atom.io/). Electron is sort of like Chrome and io.js combined 
into one runtime. It allows developers to create desktop applications using web technologies.

### Method 1

Install electron globally

`npm install electron-prebuilt -g`

Go to the project root and run `electron .`

### Method 2

Go to the prject root and run `iojs bin/launch.js`.

#### Originally part of a Jibo programming challenge
