function newTextbook() {
	var newTextbook 		= {};
	newTextbook.title 		= "Title";
	newTextbook.author 		= "Author";
	newTextbook.elements 	= [];
	return newTextbook;
}

function addPDFRectangleClip(textbook,source,startX,startY,endX,endY) {
	var newElement 		= {};
	newElement.type 	= "pdf";
	newElement.source 	= source;
	newElement.startX 	= startX;
	newElement.startY 	= startY;
	newElement.endX 	= endX;
	newElement.endY 	= endY;
	textbook.elements[] = newElement;
	// return textbook;
}



function addYouTubeVid(textbook,source,offset) {}

function addText(textbook,text) {}

function addWiki(textbook,source) {}

function deleteElement(textbook, clipNumber) {}

function moveElement(textbook,oldPosition,newPosition) {}

function saveTextbook() {
    brackets.fs.showSaveDialog("title2","","proposed_filename.lima", function(err,fp) {
    	brackets.fs.writeFile(fp, JSON.stringify(brackets.currentTextbook), "utf8", function(){});
    });
}