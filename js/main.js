playerNum = document.querySelector('.playerNum');
buttonX = document.querySelector('#X');
buttonO = document.querySelector('#O');
symbol = document.querySelector('.symbol');
table = document.querySelector('.table');
boxes = document.querySelectorAll('.box');
winnerBox = document.querySelector('.winner');
winnerName = document.querySelector('#name');
replay =document.querySelector('.replay');

var player1, player2, winner, noOfMoves=0, mode;
var whichSymbol, whichMode;
var playerXBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var playerOBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function reset(){
	playerXBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	playerOBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	for(var i=0; i<9; i++){
		boxes[i].textContent = "";
	}
	winner=undefined;
	mode = undefined;
	noOfMoves=0;
}

document.getElementById('single').addEventListener('click', clickSingleMulti);
document.getElementById('multi').addEventListener('click',  clickSingleMulti);


function clickSingleMulti(n) {
	whichMode = n;
	n.target.style.boxShadow = "0 0 10px 1px #D61A46";
	setTimeout(()=>{playerNum.style.display = "none";
					symbol.style.display = "block"}, 200);
	setTimeout(() => whichMode.target.style.boxShadow = "none", 200);

	mode = (n.target.textContent == 'Single Player')? "single" : "multi";
}

buttonX.addEventListener('click', clickOX);
buttonO.addEventListener('click', clickOX);

function clickOX(e){
	console.log(e);
	whichSymbol = e;
	if(e.target.textContent == 'X'){
		player1 = 'X';
		player2 = 'O';
	}
	else{
		player1 = 'O';
		player2 = 'X';
	}
	player = player1;
	e.target.style.boxShadow = "0 0 10px 1px #D61A46";
	setTimeout(changeScreen, 200);
	setTimeout(() => whichSymbol.target.style.boxShadow = "none", 200);
}

function changeScreen() {
	symbol.style.display = "none";
	table.style.display = "block";
}

for(var i=0; i<9; i++){
	boxes[i].addEventListener('click', clickBox);
}

function clickBox(boxInfo) {
	var boxId = boxInfo.target.id;
	console.log(boxId);
	console.log(boxInfo);
	if(boxInfo.target.textContent != "") return;
	boxInfo.target.style.cssText = 'color: #FC7307; font-size: 70px';
	boxInfo.target.textContent= player;

	if(player == 'X'){
		playerXBoxes[boxId-1] = 1;
		console.log(playerXBoxes);
		checkXWinner();
	}
	else{
		playerOBoxes[boxId-1] = 1;
		console.log(playerOBoxes);
		checkOWinner();
	}
	noOfMoves++;
	if(noOfMoves == 9)
		gameTie();
	player = player=='O'?'X':'O';
	if(mode=='single' && noOfMoves <= 7){
		setTimeout(botMove, 500);
	}
}

function botMove() {
	var botBoxId;
	do{
		botBoxId = Math.floor(Math.random()*9) +1;
		console.log(document.getElementById(botBoxId));
	}while(document.getElementById(botBoxId) != null && document.getElementById(botBoxId).textContent != "");
	console.log(botBoxId);
	botBox = document.getElementById(botBoxId)
	console.log(document.getElementById(botBoxId));
	botBox.style.cssText = 'color: #559E54; font-size: 70px';
	botBox.textContent= player;

	console.log(player);
	if(player == 'X'){
		playerXBoxes[botBoxId-1] = 1;
		console.log(playerXBoxes);
		checkXWinner();
	}
	else{
		playerOBoxes[botBoxId-1] = 1;
		console.log(playerOBoxes);
		checkOWinner();
	}
	noOfMoves++;
	if(noOfMoves == 9)
		gameTie();
	player = player=='O'?'X':'O';

}

function checkXWinner() {	
  if(playerXBoxes[0]+playerXBoxes[1]+playerXBoxes[2]==3 ||
		playerXBoxes[3]+playerXBoxes[4]+playerXBoxes[5]==3 ||
		playerXBoxes[6]+playerXBoxes[7]+playerXBoxes[8]==3 ||
		playerXBoxes[0]+playerXBoxes[3]+playerXBoxes[6]==3 ||
		playerXBoxes[1]+playerXBoxes[4]+playerXBoxes[7]==3 ||
		playerXBoxes[2]+playerXBoxes[5]+playerXBoxes[8]==3 ||
		playerXBoxes[0]+playerXBoxes[4]+playerXBoxes[8]==3 || 
		playerXBoxes[2]+playerXBoxes[4]+playerXBoxes[6]==3){
			winner = 'X';
			setTimeout(winnerFound , 500);
		}
}

function checkOWinner() {

if(playerOBoxes[0]+playerOBoxes[1]+playerOBoxes[2]==3 ||
		playerOBoxes[3]+playerOBoxes[4]+playerOBoxes[5]==3 ||
		playerOBoxes[6]+playerOBoxes[7]+playerOBoxes[8]==3 ||
		playerOBoxes[0]+playerOBoxes[3]+playerOBoxes[6]==3 ||
		playerOBoxes[1]+playerOBoxes[4]+playerOBoxes[7]==3 ||
		playerOBoxes[2]+playerOBoxes[5]+playerOBoxes[8]==3 ||
		playerOBoxes[0]+playerOBoxes[4]+playerOBoxes[8]==3 || 
		playerOBoxes[2]+playerOBoxes[4]+playerOBoxes[6]==3){
			winner = 'O';
			setTimeout(winnerFound , 500);
		}
}

function gameTie() {
	winnerName.textContent = "It's a tie!";
	setTimeout(()=>{}, 500);
	table.style.display = 'none';
	winnerBox.style.display = 'block';
	replay.style.display = 'block';
}

function winnerFound() {
	console.log(winner);
	if((winner == 'X' && player1 == 'X') || (winner == 'O' && player1 == 'O')) {
    if(mode == "single") {
      winner = "Congrats! You won!";
    }
    else {
      winner = "Player 1 has won!";
    }
  }
	else {
    if(mode == "single") {
      winner = "Better Luck Next Time!";
    }
    else {
      winner = "Player 2 has won!";
    }
  }
	winnerName.textContent = winner;
	
	table.style.display = 'none';
	winnerBox.style.display = 'block';
	replay.style.display = 'block';

}

replay.addEventListener('click', toReplay);
function toReplay(e) {
	e.target.style.boxShadow = "0 0 10px 1px #F7D4DC";
	setTimeout(changeScreenToStart, 200);
}

function changeScreenToStart() {
	winnerBox.style.display = 'none';
	replay.style.display = 'none';
	playerNum.style.display = "block";
	reset();
	setTimeout(()=>replay.style.boxShadow='none', 200);
}