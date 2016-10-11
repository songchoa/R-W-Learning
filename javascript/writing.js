
var myGamePiece;
var canvas;
var platforms;
var wordList = ["cat", "dog", "bat","rat","bog","hog","yup","fun","run","ton", "zoo"];
var wordType;
var timer;
var cutTile;
var Write = {

	run : function(){
		var ctx = document.getElementById("myCanvas");
		canvas = document.getElementById("myCanvas"),
 	 	this.context = ctx.getContext("2d");
 		this.interval = setInterval(updateGameArea, 20);
 		platforms = [];
 		wordType = new createWord(0,0,0,0);
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
	var time = 20;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "blue";
	ctx.fillRect(this.x, this.y, this.width,this.height);
	this.update = function(){
		ctx = Write.context;
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y,this.width,this.height);
	}

}

function playerAnswer(){
	var answer = document.getElementById("userIn").value;
	if(answer == wordType.text){
		myGamePiece.x = wordType.x + 10;
		myGamePiece.y = wordType.y- 70;
		platforms.splice(curTile,1);
		placeWord();
		document.getElementById("userIn").text = "";
		//timer = setInterval(,1000);
	}
}

function reduceTime(){

}

function PC(){
	this.width = 50;
	this.height = 50;
	this.x = 200;
	this.y = 200;
	ctx =  Write.context;
	ctx.fillStyle = "red";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	this.update = function(){
        ctx = Write.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function placeWord(){
	rand = Math.floor((Math.random() * 10) + 1);
	var step;
	//console.log(rand);
	wordType.text = wordList[rand];
	curTile = Math.floor((Math.random() * platforms.length) + 1);
	step = platforms[curTile];
	wordType.x = step.x ;
	wordType.y = step.y + 80;
}
function updateGameArea(){
	Write.clear();
	for(var x = 0; x < platforms.length; x++){
 				platforms[x].update();
 	}
 	myGamePiece.update();
 	wordType.update();
}