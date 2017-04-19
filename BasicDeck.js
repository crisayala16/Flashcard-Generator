var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

function BasicDeck(maxCount){
	this.count = 0;
	this.maxCount = maxCount;
	this.cards = [];
};
console.log(this.cards)
BasicDeck.prototype.runBasic = function(){
	var self = this;
			if(this.count < this.maxCount){
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
					var newBasicCard = new BasicCard(response.front, response.back);
					self.cards.push(newBasicCard);
					self.count++;
					self.runBasic();
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