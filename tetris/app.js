/* =========== Wecome back ====================================================
This was a project you worked on with a youtube tutorial to build a tetris game.
Throughout this project we learned how to use javascript to interact with CSS and HTLM objects, 
as they appear on a webpage. We used div to generate 200 individual sections on html, you can tell that by the long block of 
<div></div> with the class grid. We then used CSS to modify the style of all of those sections. Our CSS file outlines the basic
color scheme of our game. We also modify the style throughout the script, to give each piece their own flair, and to reset the 
board. You can find out how to modify the style by searching ".style.". 
	More specifically, what we learned in javascript helped expand our horizons. This was the first time I used event listener 
to interact with the web page. Even from our first line. We learned a different way of viewing our arrays, by turning them into Tetrominos. 
Everything seemed to make more sense as we built it. We used an additional listener to take keyboard input with keycodes. These are the 
keycode in the standard library that was labeled in the HTML file. utf8. The rest of the magic is in manipulating and making variations
of the square array in the beginnning. We went over a new format for looping. The arrow notation. I'd look at the documentation for 
more on that. 
*/
//event Listener. Part of the document methods. A listener is a sort of hearing object in a web page that listens for a certain type
//of input on the web page. 
// DOMContentLoaded - DOM stands for document object model, and is a standard for outlining documents as to be recieved by programs.
// This listener is listening for the entire contents of the document to load before running the scripts on this page. 
//Otherwise the script will run whenever it is called in the HTML document. 
document.addEventListener('DOMContentLoaded',() => {
  //using document methods to find css tags.
  const grid = document.querySelector('.grid');
  //make an array using array of our 200 squares
  let squares = Array.from(document.querySelectorAll('.grid div'));
  //using query selector from document
  const ScoreDisplay = document.querySelector('#score');
  const StartButton = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerID;
  let score = 0;
  const colors = ['orange','red','green','blue','purple']


//drawing the shape of the tetromino using the index as its place	
  const lTetromino = [
	[0,1,width,width*2],
	[0,1,2, width+2],
	[1,width+1,width*2,width*2+1],
	[0,width, width+1, width+2]
  ];
  const zTetromino = [
	[0,width,width+1,width*2+1],
	[width+1,width+2,width*2,width*2+1],
	[0,width,width+1,width*2+1], 
	[width+1,width+2,width*2,width*2+1]
  ];
  const oTetromino = [
	[0,1,width,width+1],
	[0,1,width,width+1],
	[0,1,width,width+1],
	[0,1,width,width+1]  
  ];
  const tTetromino = [
	[1,width,width+1,width+2],
	[1,width+1,width+2,width*2+1],
	[width,width+1,width+2,width*2+1],
	[1,width,width+1,width*2+1]
  ];
  const iTetromino = [
	[1,width+1,width*2+1,width*3+1],
	[width, width+1, width+2, width+3],
	[1,width+1,width*2+1,width*3+1],
	[width, width+1, width+2, width+3],
  ];  
  
const theTetrominoes = [iTetromino,tTetromino,oTetromino,zTetromino,lTetromino];

let currentPosition = 2;
let currentRotation = 0;

//randomly select the starting position
let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];


console.log(squares);
//draw tetromino
//
function draw(){
	current.forEach(index =>{
	  squares[currentPosition + index].classList.add('tetromino');
	  squares[currentPosition + index].style.backgroundColor = colors[random] ;
	})
}
function undraw(){
	current.forEach(index =>{
	  squares[currentPosition + index].classList.remove('tetromino');
	  squares[currentPosition + index].style.backgroundColor = '';
	})
}


//make the tetrormino move down every second
//timerID = setInterval(moveDown, 1000)
//assign function to key Codes

function control(e){
	if(e.keyCode === 37){
		moveLeft();
	}else if (e.keyCode === 38){
		rotate()
	}else if (e.keyCode === 39){
		moveRight();
	}else if (e.keyCode === 40){
		moveDown();
	}
}

document.addEventListener('keyup',control)

function moveDown(){
	undraw();
	currentPosition += width;
	draw();
	freeze();
}
//Introduction to .some method. When using this over an array, you can check if the contents
//of an array are true some of the time. 
function freeze(){
	//If some block, in the next shape, + 1 width (the next block down) is listed as taken,
	if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
		current.forEach(index => squares[currentPosition + index].classList.add('taken'))
		//nextPiece
		random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
		current = theTetrominoes[random][currentRotation];
		currentPosition = 4;
		draw()
		displayShape()
		addScore()
		gameOver()
	}
	
}

//Move the tetro left 
function moveLeft(){
	undraw()
	const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
	
	if(!isAtLeftEdge) currentPosition -=1;
	
	if(current.some(index => squares[currentPosition + index].classList.contains('taken')))  {
		currentPosition += 1;
	}
	draw()
}
//move the tetro right
function moveRight(){
	undraw()
	const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
	if(!isAtRightEdge) currentPosition += 1;
	
	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
		currentPosition -= 1;
	}
	draw();
}

function rotate(){
	undraw()
	currentRotation ++
	if(currentRotation === current.length){ //If we get to the last sprite, reset the sprite interval
		currentRotation = 0
	}
	current = theTetrominoes[random][currentRotation]
	draw()
}

//Mini Grid info
const displaySquares = document.querySelectorAll('.minigrid div')
const displayWidth = 4;
const displayIndex = 0;

/*
the Tetrominos without rotation in the same order there in the following constant 

const theTetrominoes = [iTetromino,tTetromino,oTetromino,zTetromino,lTetromino];
*/

const upNextTetromino= [
	[1,displayWidth+1,displayWidth*2+1,displayWidth*3+1], //I
	[1,displayWidth,displayWidth+1,displayWidth+2], //T
	[0,1,displayWidth,displayWidth+1], //O
	[0,displayWidth,displayWidth+1,displayWidth*2+1], //Z
	[0,1,displayWidth,displayWidth*2] //L
]

function displayShape(){
	//undraw for the minigrid
	displaySquares.forEach(square => {
		square.classList.remove('tetromino');
		square.style.backgroundColor = '';
	})
	upNextTetromino[nextRandom].forEach(index => {
		displaySquares[displayIndex + index].classList.add('tetromino')	
		displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
	})
}
//add functionality to the start button

StartButton.addEventListener('click', () => {
	if(timerID){
		clearInterval(timerID)
		timerID = null
	}else{
		draw()
		timerID = setInterval(moveDown, 1000)
		nextRandom = Math.floor(Math.random()*theTetrominoes.length)
		displayShape()
	}
})


function addScore(){
	for(let i = 0; i < 199; i += width){
		//The We've been declaring a row in this by length of the width.
		//The constant of Row is how the computer would actually identify the row, when i = (width * i) in the starting position.
		//tldr - this is every block in one row. 
		const row = [i,i+1,i+2,i+3,i+4,i+5, i+6, i+7, i+8, i+9]
		
		if(row.every(index => squares[index].classList.contains('taken'))){
				score += 10
				ScoreDisplay.innerHTML = score
				row.forEach(index => {
					squares[index].classList.remove('taken');
					squares[index].classList.remove('tetromino');
					squares[index].style.backgroundColor = '';
				})
			const squaresRemoved = squares.splice(i, width)
			squares = squaresRemoved.concat(squares)
			squares.forEach(cell => grid.appendChild(cell))
		}
	}
}


function gameOver(){
	if(current.some(index => squares[currentPosition + index+1].classList.contains('taken'))){
		ScoreDisplay.innerHTML = 'end'
		clearInterval(timerID)
	}
};


})