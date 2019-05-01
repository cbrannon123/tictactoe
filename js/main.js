/*----- constants -----*/
// Define required constants:
const colors = {
  '1': "red",
  '-1': "blue",
  'null':'white'

   
    

};
// winning combos
  const Combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


/*----- app's state (variables) -----*/ 
var board;
var turn;
var winner;


/*----- cached element references -----*/ 
var squares = document.querySelectorAll("td");
var message = document.getElementById('msg');

/*----- event listeners -----*/ 
document.querySelector('table').addEventListener("click", move)
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/

init()

//finds sum of winning combos from 1 or -1 click, convert to + num with abs.Math
function getWinner(){
for(var i = 0; i < Combos.length; i++) {
   if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0]; 
   if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
   if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
   if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
   if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
   if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
   if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
   if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
   //if board is null after winner, return null to stop from selecting null squares 
   if (board.includes(null)) return null; 
    return 'T'
  }
}



  
  

function move(evt) {
  //takes the id and replaces the 'sq' with nothing and converst into number via parseInt
  var marker = evt.target;
  var box = parseInt(marker.id.replace('sq', ''));
  //if board = box return
  if (board[box]) return;
  //if winner return
  if (winner) return;
  // when board box is full board box = turns
  board[box] = turn;
  //turn 1 is then * by -1 = -1(player 2)
  turn *= -1;
  //winner calls get winner funtion
  winner = getWinner();
  render();
}



function render() {
  //display the bord
  //forEach callBack is invokes with val,idx or array
  board.forEach(function(sq, sqIdx) {
    //grab correct div in table
    //style the background of the empty squares=td color, 1 or -1 via sq=value
  squares[sqIdx].style.backgroundColor = colors[sq];
  });


  //display message
  if(winner === 'T') {
    message.innerHTML = "TIE";
  } else if (winner) {
    message.innerHTML = `${colors[winner].toUpperCase()} has won!`;
  } else {
    message.innerHTML = `${colors[turn].toUpperCase()}'s turn`
  }
  
  
}


//Initialize the state variables:

//resets game board and array

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    winner = null;
    turn = 1;
    render();
}

