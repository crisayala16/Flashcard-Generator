function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	if(this.text.includes(this.cloze) === false){
		console.log("This doesn't work...");
	}
}
ClozeCard.prototype.partial = function(){
	return this.text.replace(this.cloze, "...");
}
module.exports = ClozeCard;