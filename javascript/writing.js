
var myGamePiece;
var canvas;
var platforms;
var wordList = ["cat", "dog", "bat","rat","bog","hog","yup","fun","run","ton", "zoo"];
var wordType;
var Write = {

	run : function(){
		var ctx = document.getElementById("myCanvas");
		canvas = document.getElementById("myCanvas"),
 	 	this.context = ctx.getContext("2d");
 		this.interval = setInterval(updateGameArea, 20);
 		platforms = [];
 		var topW;
 		var topH;
 		for(var x = 0; x < 5; x++){
 			for(var y = 0; y < 5; y++){
 				topW = x * 90 + 10;
 				topH = y * 90 + 10;

 				platforms.push(new createPlat(80,80, topW, topH));

 			}
 		}

	},
	clear : function() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

}

function startGame() {
	Write.run();
	myGamePiece = new PC();
}

function createPlat(width, height, x, y){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "blue";
	ctx.fillRect(this.x, this.y, this.width,this.height);
	this.update = function(){
		ctx = Write.context;
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y,this.width,this.height);
	}

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
	for(var i = 0; i < wordList.length; i++){
		
	}
}
function updateGameArea(){
	Write.clear();
	for(var x = 0; x < platforms.length; x++){
 				platforms[x].update();
 	}
 	myGamePiece.update();
}