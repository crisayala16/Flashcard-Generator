function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.currentCardWorks = true;
	//Conditional that throws error if the cloze is not inside the full text
	if(this.text.includes(this.cloze) === false){
		console.log("This doesn't work...");
		this.currentCardWorks = false;
	}
}
//Method that returns the partial text with the cloze taken out
ClozeCard.prototype.partial = function(){
	return this.text.replace(this.cloze, "...");
}
module.exports = ClozeCard;