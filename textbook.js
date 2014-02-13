
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
	newElement.type 	= "pdfRectangle";
	newElement.source 	= source;
	newElement.startX 	= startX;
	newElement.startY 	= startY;
	newElement.endX 	= endX;
	newElement.endY 	= endY;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

function addPDFHorizontalClip(source,startY,endY) {
	var newElement 		= {};
	newElement.type 	= "pdfHorizontal";
	newElement.source 	= source;
	newElement.startY 	= startY;
	newElement.endY 	= endY;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

function addYouTubeVid(source,startTime) {
	var newElement 		= {};
	newElement.type 	= "youtube";
	newElement.source 	= source;
	newElement.startTime 	= startTime;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

function addText(text) {
	var newElement 		= {};
	newElement.type 	= "text";
	newElement.text 	= text;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

function addWiki(source) {
	var newElement 		= {};
	newElement.type 	= "wiki";
	newElement.source 	= source;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

// If within range, delete. Else skip
function deleteElement(clipNumber) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (clipNumber >= 0 && clipNumber<numberOfElements) {
		var newElements = [];
		for (var el = 0; el < clipNumber; el++) {
			newElements.append(brackets.currentTextbook.elements[el]);
		}
		for (var el = clipNumber+1; el < numberOfElements; el++) {
			newElements.append(brackets.currentTextbook.elements[el]);
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
			newElements.append(brackets.currentTextbook.elements[el]);
		}
		// If move up the page
		if (oldPosition > newPosition) {
			newElements.append(brackets.currentTextbook.elements[oldPosition]);
			for (var el = newPosition; el < oldPosition; el++) {
				newElements.append(brackets.currentTextbook.elements[el]);
			}
			for (var el = oldPosition+1; el < numberOfElements; el++) {
				newElements.append(brackets.currentTextbook.elements[el]);
			}
			brackets.currentTextbook.elements = newElements;
		}
		// If move down the page
		else {
			for (var el = oldPosition+1; el <= newPosition; el++) {
				newElements.append(brackets.currentTextbook.elements[el]);
			}
			newElements.append(brackets.currentTextbook.elements[oldPosition]);
			for (var el = newPosition+1; el < numberOfElements; el++) {
				newElements.append(brackets.currentTextbook.elements[el]);
			}
			brackets.currentTextbook.elements = newElements;
		}
	};
}

function addComment(elementNumber,comment,author) {
	brackets.currentTextbook.elements.comments.append({
		"author"  = author,
		"comment" = comment
	});
}

function deleteComment(elementNumber,commentNumber) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (elementNumber >= 0 && elementNumber<numberOfElements) {
		var numberOfComments = brackets.currentTextbook.elements[elementNumber].comments.length;
		if (commentNumber >= 0 && commentNumber<numberOfComments) {
			var newComments = [];
			for (var comm = 0; comm < commentNumber; el++) {
				newElements.add(brackets.currentTextbook.elements[elementNumber].comments[comm]);
			}
			for (var comm = commentNumber+1; comm < numberOfElements; el++) {
				newElements.add(brackets.currentTextbook.elements[elementNumber].comments[comm]);
			}
			brackets.currentTextbook.elements[elementNumber].comments = newComments;
		}
	}
}
