var inquirer = require("inquirer");
var ClozeCard = require("./ClozeCard.js");

function ClozeDeck(maxCount){
	this.count = 0;
	//Max amount of cards to be made
	this.maxCount = maxCount;
	//This is where the cards will be stored
	this.cards = [];
}
ClozeDeck.prototype.runCloze = function(){
	var self = this;
	if(this.count < this.maxCount){
				//Asks the user what the full text and hidden text should be
				inquirer.prompt([
				{
					name: "full",
					message: "What should the full text of card #" + (this.count + 1) + " be?"
				},
				{
					name: "cloze",
					message: "What should the hidden text of card #" + (this.count + 1) + " be?"
				}
				]).then(function(response){
					//Creates the card with the user response
					var newClozeCard = new ClozeCard(response.full, response.cloze);
					//if the current card is able to be used correctly
					//then store the current card
					if(newClozeCard.currentCardWorks){
						self.cards.push(newClozeCard);
						//Increment count in order to move on to the next card
						self.count++;
						//run the method is the new count
						self.runCloze();
					}
					//if the current does not work
					//then run the method again in order for the user to correct their mistake
					else{
						self.runCloze();
					}

				});
				
			}
			else{
				//Once all the cards have been created, 
				//the user will be asked if they would like to create more cards
				inquirer.prompt([
				{
					type: "list",
					name: "moreCards",
					message: "Would you like to add more cards?",
					choices: ["Yes", "No"]
				}
				]).then(function(answer){
					if(answer.moreCards === "Yes"){
						//Asks the user how many extra cards they would like to add
						inquirer.prompt([
						{
							name: "extraCards",
							message: "How many more cards would you like to add?"
						}
						]).then(function(answer){
							//Adds the amount of extra cards to the max count
							self.maxCount = parseInt(answer.extraCards) + self.count;
							//Runs the method again with the new max count
							self.runBasic();
						});
					}
					else{
						//Once the user is done creating cards,
						//They will be asked if they would like to start reviewing the cards
						inquirer.prompt([
						{	
							type: "list",
							name: "startCards",
							message: "Would you like to review your cards?",
							choices: ["Yes", "No"]
						}
						]).then(function(answer){
							if(answer.startCards === "No"){
								//Output if the user would not like to start reviewing
								console.log("No Problem.")
							}
							else{
								console.log("Awesome, let's start reviewing!");
								var reviewCount = 0;
								var reviewMaxCount = self.cards.length;
								function reviewCards(){
									if(reviewCount < reviewMaxCount){
										//Starts reviewing the cards through inquirer
										//Presents the partial text
										//Presents the full text once the user hits "Enter" 
										inquirer.prompt([
										{
											type: "list",
											name: "cloze",
											message: self.cards[reviewCount].partial(),
											choices: ["Show full text"]
										}
										]).then(function(answer){
											console.log(self.cards[reviewCount].text);
											reviewCount++;
											reviewCards();
										})
									}
									else{
										console.log("You've reviewed all your cards.");
									}
								}
								reviewCards();
							}
						})
					};
				});
			};
		};
		module.exports = ClozeDeck;