var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

function BasicDeck(maxCount){
	this.count = 0;
	//the maximum amount of cards to be created
	this.maxCount = maxCount;
	//where the cards will be stored
	this.cards = [];
};
//Method to create cards and review them
BasicDeck.prototype.runBasic = function(){
	var self = this;
	if(this.count < this.maxCount){
				//Starts asking what the front and back of the card should be
				inquirer.prompt([
				{
					name: "front",
					message: "What should the front of card #" + (this.count + 1) + " be?"
				},
				{
					name: "back",
					message: "What should the back of card #" + (this.count + 1) + " be?"
				}
				]).then(function(response){
					//creates the card with the user response
					var newBasicCard = new BasicCard(response.front, response.back);
					//stores the card in the array
					self.cards.push(newBasicCard);
					//Increments the count
					self.count++;
					//Runs the method with the new incremented count
					self.runBasic();
				});
				
			}
			else{
				//Once all cards are done, asks the user if they would like to add more cards
				inquirer.prompt([
				{
					type: "list",
					name: "moreCards",
					message: "Would you like to add more cards?",
					choices: ["Yes", "No"]
				}
				]).then(function(answer){
					//Asks how many extra cards the user would like to add
					if(answer.moreCards === "Yes"){
						inquirer.prompt([
						{
							name: "extraCards",
							message: "How many more cards would you like to add?"
						}
						]).then(function(answer){
							//adds the amount to the max amount of cards
							self.maxCount = parseInt(answer.extraCards) + self.count;
							//runs the method again with the new max count
							self.runBasic();
						});
					}
					else{
						//asks if the user is ready to start reviewing the cards
						inquirer.prompt([
						{	
							type: "list",
							name: "startCards",
							message: "Would you like to review your cards?",
							choices: ["Yes", "No"]
						}
						]).then(function(answer){
							if(answer.startCards === "No"){
								//Output when the user doesn't want to review the cards
								console.log("No Problem.")
							}
							else{
								//starts reviewing the cards
								console.log("Awesome, let's start reviewing!");
								var reviewCount = 0;
								var reviewMaxCount = self.cards.length;
								function reviewCards(){
									if(reviewCount < reviewMaxCount){
										//Reviews the cards through inquirer
										//It first presents the front of the card
										//Then shows the back of the card once the user hits "Enter"
										inquirer.prompt([
										{
											type: "list",
											name: "question",
											message: self.cards[reviewCount].front,
											choices: ["Show back of card"]
										}
										]).then(function(answer){
											console.log(self.cards[reviewCount].back);
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
		module.exports = BasicDeck;