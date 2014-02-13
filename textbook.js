
// The textbook is stored in brackets.currentTextbook


function newTextbook() {
	var newTextbook 		= {};
	newTextbook.title 		= "Title";
	newTextbook.author 		= "Author";
	newTextbook.elements 	= [];
	return newTextbook;
}

function addPDFRectangleClip(source,startX,startY,endX,endY) {
	var newElement 		= {};
	newElement.type 	= "pdf";
	newElement.source 	= source;
	newElement.startX 	= startX;
	newElement.startY 	= startY;
	newElement.endX 	= endX;
	newElement.endY 	= endY;
	brackets.currentTextbook.elements[] = newElement;
	// return textbook;
}



function addYouTubeVid(textbook,source,offset) {}

function addText(textbook,text) {}

function addWiki(textbook,source) {}

function deleteElement(textbook, clipNumber) {}

// Move element at index oldPosition in between element at index NewPosition and the element at index (newPosition+1)
function moveElement(textbook,oldPosition,newPosition) {}