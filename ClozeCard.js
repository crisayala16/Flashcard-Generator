function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
}
ClozeCard.prototype.partial = function(){
	return this.text.replace(this.cloze, "...");
}
ClozeCard.prototype.logErr = function(){
	var stringCheck = this.partial();
	if(stringCheck.charAt(0) !== "."){
		console.log("This doesn't work ...");
	}
}
module.exports = ClozeCard;