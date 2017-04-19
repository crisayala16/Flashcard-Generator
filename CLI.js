var inquirer = require("inquirer");
var BasicDeck = require("./BasicDeck.js");

var ClozeCard = require("./ClozeCard.js");
var basicCardsArr = [];

inquirer.prompt([
{
	type: "list",
	name: "flashcardType",
	message: "What kind of flashcards would you like to make?",
	choices: ["Basic", "Cloze"]
},
{
	name: "amountOfCards",
	message: "How many cards would you like to make?"
}
]).then(function(answer){
	if(answer.flashcardType === "Basic"){
		var theBasicDeck = new BasicDeck(answer.amountOfCards);
		theBasicDeck.runBasic();
	}
	else if(answer.flashcardType === "Cloze"){
		console.log("coming soon");
	}

});
