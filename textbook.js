
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
	newElement.comments = [];
	brackets.currentTextbook.elements[] = newElement;
}



function addYouTubeVid(source,startTime) {
	var newElement 		= {};
	newElement.type 	= "youtube";
	newElement.source 	= source;
	newElement.startTime 	= startTime;
	newElement.comments = [];
	brackets.currentTextbook.elements[] = newElement;
}

function addText(text) {
	var newElement 		= {};
	newElement.type 	= "text";
	newElement.text 	= text;
	newElement.comments = [];
	brackets.currentTextbook.elements[] = newElement;
}

function addWiki(source) {
	var newElement 		= {};
	newElement.type 	= "wiki";
	newElement.source 	= source;
	newElement.comments = [];
	brackets.currentTextbook.elements[] = newElement;
}

// If within range, delete. Else skip
function deleteElement(clipNumber) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (clipNumber >= 0 && clipNumber<numberOfElements) {
		var newElements = [];
		for (var el = 0; el < clipNumber; el++) {
			newElements[] = brackets.currentTextbook.elements[el]
		}
		for (var el = clipNumber+1; el < numberOfElements; el++) {
			newElements[] = brackets.currentTextbook.elements[el]
		}
		brackets.currentTextbook.elements = newElements;
	}
}

// Move element at index oldPosition in between element at index newPosition and the element at index (newPosition+1)
function moveElement(oldPosition,newPosition) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (oldPosition >= 0 && oldPosition<numberOfElements
		newPosition >= 0 && newPosition<numberOfElements) {
		// If no change then return
		if (oldPosition == newPosition) {return;}
		// Copy everything that's not going to be changed
		var newElements = [];
		var firstChange = Math.min(oldPosition,newPosition);
		for (var el = 0; el < firstChange; el++) {
			newElements[] = brackets.currentTextbook.elements[el];
		}
		// If move up the page
		if (oldPosition > newPosition) {
			newElements[] = brackets.currentTextbook.elements[oldPosition];
			for (var el = newPosition; el < oldPosition; el++) {
				newElements[] = brackets.currentTextbook.elements[el]
			}
			for (var el = oldPosition+1; el < numberOfElements; el++) {
				newElements[] = brackets.currentTextbook.elements[el]
			}
			brackets.currentTextbook.elements = newElements;
		}
		// If move down the page
		else {
			for (var el = oldPosition+1; el <= newPosition; el++) {
				newElements[] = brackets.currentTextbook.elements[el]
			}
			newElements[] = brackets.currentTextbook.elements[oldPosition];
			for (var el = newPosition+1; el < numberOfElements; el++) {
				newElements[] = brackets.currentTextbook.elements[el]
			}
			brackets.currentTextbook.elements = newElements;
		}
	};
}

function addComment(elementNumber,comment,author) {
	brackets.currentTextbook.elements.comments[] = {
		"author"  = author,
		"comment" = comment
	};
}

function deleteComment(elementNumber,commentNumber) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (elementNumber >= 0 && elementNumber<numberOfElements) {
		var numberOfComments = brackets.currentTextbook.elements[elementNumber].comments.length;
		if (brackets.currentTextbook.elements[elementNumber]comments.length > commentNumber) {       // Fix this also fix array.append() vs array[]
			var newComments = [];
			for (var comm = 0; comm < commentNumber; el++) {
				newElements[] = brackets.currentTextbook.elements[elementNumber].comments[comm];
			}
			for (var comm = commentNumber+1; comm < numberOfElements; el++) {
				newElements[] = brackets.currentTextbook.elements[elementNumber].comments[comm];
			}
			brackets.currentTextbook.elements[elementNumber].comments[commentNumber];
		}
	}
	
}