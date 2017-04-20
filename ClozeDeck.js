var inquirer = require("inquirer");
var ClozeCard = require("./ClozeCard.js");

function ClozeDeck(maxCount){
	this.count = 0;
	this.maxCount = maxCount;
	this.cards = [];
}
ClozeDeck.prototype.runCloze = function(){
		var self = this;
			if(this.count < this.maxCount){
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
					var newClozeCard = new ClozeCard(response.full, response.cloze);
					self.cards.push(newClozeCard);
					self.count++;
					self.runCloze();
				});
				
			}
			else{
				inquirer.prompt([
				{
					type: "list",
					name: "moreCards",
					message: "Would you like to add more cards?",
					choices: ["Yes", "No"]
				}
				]).then(function(answer){
					if(answer.moreCards === "Yes"){
						inquirer.prompt([
						{
							name: "extraCards",
							message: "How many more cards would you like to add?"
						}
						]).then(function(answer){
							self.maxCount = parseInt(answer.extraCards) + self.count;
							self.runBasic();
						});
					}
					else{
						inquirer.prompt([
						{	
							type: "list",
							name: "startCards",
							message: "Would you like to review your cards?",
							choices: ["Yes", "No"]
						}
						]).then(function(answer){
							if(answer.startCards === "No"){
								console.log("No Problem.")
							}
							else{
								console.log("Awesome, let's start reviewing!");
								var reviewCount = 0;
								var reviewMaxCount = self.cards.length;
								function reviewCards(){
									if(reviewCount < reviewMaxCount){
										inquirer.prompt([
											{
												name: "cloze",
												message: self.cards[reviewCount].partial(),
												choices: ["Show full text"]
											}
											]).then(function(answer){
												console.log(self.cards[reviewCount].text);
												self.
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