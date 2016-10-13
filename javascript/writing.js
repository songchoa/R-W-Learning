
var myGamePiece;
var canvas;
var platforms;
var wordList = ["cat", "dog", "bat","rat","bog","hog","yup","fun","run","ton", "zoo"];
var wordType;
var sBoard;
var timer;
var curTile;
var wordTile;
var playerIMG =  new Image();
var tileIMG = new Image();
var tileTime;
var backIMG = new Image();
var score = 0;
var tileLife;
var gameInt
var Write = {

	run : function(){
		var ctx = document.getElementById("myCanvas");
		canvas = document.getElementById("myCanvas"),
 	 	this.context = ctx.getContext("2d");
 	 	
 	 	if(gameInt === undefined){
 	 		gameInt = setInterval(updateGameArea, 20);
 			tileLife = setInterval(reduceTime,2000);
 		}
 		else{
 	 		clearInterval(gameInt);
 	 		clearInterval(tileLife);
 	 		gameInt = setInterval(updateGameArea, 20);
 			tileLife = setInterval(reduceTime,2000);
 	 	}
 		platforms = [];
 		wordType = new createWord(0,0,0,0);
 		playerIMG.src = "../res/smallHat.jpg";
 		tileIMG.src = "../res/platform.png";
 		backIMG.src = "../res/backGround.png";
 		sBoard = new scoreBoard();
 		score = 0;
 		tileTime = 20;
 		curTile = 3;
 		var topW;
 		var topH;
 		for(var x = 0; x < 5; x++){
 			for(var y = 0; y < 5; y++){
 				topW = x * 90 + 10;
 				topH = y * 90 + 10;

 				platforms.push(new createPlat(80,80, topW, topH));

 			}
 		}
 		placeWord();

	},
	clear : function() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

}

function startGame() {
	Write.run();
	myGamePiece = new PC();
}

function createWord(width, height, x, y){
	this.width = "30px";
	this.height = "Consolas";
	this.x = x;
	this.y = y;
	this.text = "Hello";
	ctx = canvas.getContext("2d");
	this.update = function(){
		ctx.font = this.width + " " + this.height;
		ctx.fillStyle = "black";
		ctx.fillText(this.text, this.x, this.y);
	}
}

function createPlat(width, height, x, y){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.time = 20;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "blue";
	ctx.fillRect(this.x, this.y, this.width,this.height);
	this.update = function(){
		ctx = Write.context;
		ctx.drawImage(tileIMG,this.x,this.y);
	}

}

function scoreBoard(){
	this.x = 465;
	this.y = 15;
	this.update = function(){
		ctx = Write.context;
		ctx.fillStyle = "tan";
		ctx.fillRect(this.x,this.y,130,300);
		ctx.fillStyle = "black";
		ctx.font = "40px Arial";
		ctx.fillText("Score: ", this.x + 5,this.y + 45);
		ctx.fillText(score,this.x + 5, this.y + 90);
		ctx.fillText("Time: ", this.x + 5,this.y + 130);
		if(tileTime > 10){
			ctx.fillStyle = "green";
			ctx.fillText(tileTime,this.x + 5, this.y + 170);
		}
		else if(tileTime > 4){
			ctx.fillStyle = "yellow";
			ctx.fillText(tileTime,this.x + 5, this.y + 170);
		}
		else{
			ctx.fillStyle = "red";
			ctx.fillText(tileTime,this.x + 5, this.y + 170);;
		}
	}
}


function playerAnswer(){
	var answer = document.getElementById("userIn").value;
	if(answer == wordType.text){
		myGamePiece.x = wordType.x - 5;
		myGamePiece.y = wordType.y - 40;
		console.log("curTile = " + curTile);
		console.log("wordTile = " + wordTile);
		if(curTile != undefined){
			if(platforms[curTile].time < 4){
				platforms.splice(curTile,1);
			}
			curTile = wordTile;
		}else{
			curTile = wordTile
		}
		score++;
		placeWord();
		document.getElementById("userIn").text = "";
		document.getElementById("userIn").value = "";
		//timer = setInterval(,1000);
	}
}

function reduceTime(){
	if(curTile != undefined){
		platforms[curTile].time--;
		tileTime = platforms[curTile].time;
		if(platforms[curTile].time <= 0){
			clearInterval(gameInt);
			clearInterval(tileLife);
			ctx = Write.context;
			Write.clear();
			ctx.drawImage(backIMG, -20, -20);
			ctx.fillStyle = "tan";
			ctx.fillRect(40,40,370,250);
			ctx.fillStyle = "black";
			ctx.font = "45px Arial";
			ctx.fillText("Game Over!", 55,90);
			ctx.font = "35px Arial";
			ctx.fillText("Your score was: ", 55, 160);
			ctx.fillText(score + "!",55, 200);
			ctx.fillText("Press start new game", 55,240);
			ctx.fillText("to beat your score!", 55,280);
		}
	}
}

function PC(){
	this.width = 50;
	this.height = 50;
	this.x = 200;
	this.y = 200;
	ctx =  Write.context;
	ctx.fillStyle = "red";

	//ctx.fillRect(this.x, this.y, this.width, this.height);
	this.update = function(){
        ctx = Write.context;
        //ctx.fillStyle = "red";
        ctx.drawImage(playerIMG,this.x, this.y);
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function placeWord(){
	if(platforms.length < 2){
		alert("Game Over Start New Game");
		Write.clear();
		clearInterval(gameInt);
		return;
	}

	rand = Math.floor((Math.random() * 10) + 1);
	var step;
	//console.log(rand);
	wordType.text = wordList[rand];
	wordTile = Math.floor((Math.random() * 10) + 1);
	while(wordTile == curTile){
		wordTile = Math.floor((Math.random() * platforms.length) + 1);
	}
	step = platforms[wordTile];
	wordType.x = step.x + 15 ;
	wordType.y = step.y + 55;
}
function updateGameArea(){
	Write.clear();
	ctx = Write.context;
		ctx.drawImage(backIMG, -20, -20);
	for(var x = 0; x < platforms.length; x++){
 				platforms[x].update();
 	}
 	sBoard.update();
 	myGamePiece.update();
 	wordType.update();
}

function showInst(){
	Write.run();
	if(gameInt === undefined){
	}
 	else{
 		clearInterval(gameInt);
 		clearInterval(tileLife);
 	}
 	Write.clear();
	ctx = Write.context;
	ctx.drawImage(backIMG, -20, -20);
	ctx.fillStyle = "tan";
	ctx.fillRect(40,40,400,350);
	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.fillText("Instructions", 45,95);
	ctx.font = "25px Arial";
	ctx.fillText("Goal: Type as many correct words", 45, 130);
	ctx.fillText("as possible before loosing",45, 170);
	ctx.fillText("Winning/Loosing: You loose when", 45, 210);
	ctx.fillText("the tile you are on runs out of", 45, 250);
	ctx.fillText("time or when you run out of tiles",45, 290);
	ctx.fillText("to jump to.", 45,330);

}