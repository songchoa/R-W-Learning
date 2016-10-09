var Reading = {

//Used to store needed variables
Model : {

},

//Used to create Elements in the HTML
View : {

},

//Used for Elements functions that will be called on lick
Controller : {

},

//Called on load to creat objects
run : function(){

},

//formating to add to screen
displayElement : function (element) {
  var s = "<input ";
  s += " id=\"" + element.id + "\"";
  s += " type=\"" + element.type + "\"";
  s += " value= \"" + element.value + "\"";
  s += " onclick= \"" + element.onclick + "\"";
  s += ">";
  return s;

},

display : function(){
	var s;

	return s;
},

attachHandlers : function(){
	
}

}