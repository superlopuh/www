
// The textbook is stored in brackets.currentTextbook

function newTextbook() {
	var newTextbook 		= {};
	newTextbook.title 		= "Title";
	newTextbook.author 		= "Author";
	newTextbook.elements 	= [];
	return newTextbook;
}

function textbookIsWellDefined(textbook) {
	if (typeof(textbook.title) != "string") {
		return false;
	}
	else if (typeof(textbook.author) != "string") {
		return false;
	}
	else if (!(textbook.elements.isArray)) {
		return false;
	}
	else {
		var numberOfElements = textbook.elements.length;
		for (var el = 0; el < numberOfElements; el++) {
			if (!(elementIsWellDefined(textbook.elements[el]))) return false;
		}
		return true;
	}
}

function elementIsWellDefined(element) {
	// Check that element has a type that is a string
	if (typeof(element.type) != "string") {
		return false;
	}
	// Check that element has comments
	else if (!(element.comments.isArray)) {
		return false;
	}
	// Check that element has a source that is a string
	else if (typeof(element.source) != "string") {
		return false;
	}
	else {
		// Check that comments are well defined
		var numberOfComments = element.comments.length;
		for (var comm = 0; comm < numberOfComments; comm++) {
			if (!(commentIsWellDefined(element.comments[comm]))) return false;
		}
		// Check that rest is well defined for the different types of elements
		switch(element.type) {
			case 'pdfRectangle':
			case 'pdfHorizontal':
			case 'youtube':
			case 'text' :
			case 'wikipedia':
			default:
				return false;
				break;
		}	
	}
}

function commentIsWellDefined(comment) {
	// Check that comment has an author that is a string
	if (typeof(comment.author) != "string") {
		return false;
	}
	// Check that comment has a comment that is a string
	else if (typeof(comment.comment) != "string") {
		return false;
	}
	else {
		return true;
	}
}

function modifyTitle(newTitle) {
	if (newTitle.length) {
		brackets.currentTextbook.title = newTitle;
	}
}

function modifyAuthor(newAuthor) {
	if (newAuthor.length) {
		brackets.currentTextbook.author = newAuthor;
	}
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
	var newElement 		 = {};
	newElement.type 	 = "youtube";
	newElement.source 	 = source;
	newElement.startTime = startTime;
	newElement.comments  = [];
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
	newElement.type 	= "wikipedia";
	newElement.source 	= source;
	newElement.comments = [];
	brackets.currentTextbook.elements.add(newElement);
}

function previousPDFs() {
	var pdfLinks = [];
	var numberOfElements = brackets.currentTextbook.elements.length;
	for (var el = 0; el < numberOfElements; el++) {
		if (brackets.currentTextbook.elements[el].type == "pdfRectangle" || 
			brackets.currentTextbook.elements[el].type == "pdfHorizontal") {
			var tag = "PDF " + el;
			pdfLinks.append({
				tag: brackets.currentTextbook.elements[el].source;
			})
		}
	};
	return pdfLinks;
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
	if (oldPosition >= 0 && oldPosition<numberOfElements &&
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

// Comment functions below

function addComment(elementNumber,author,comment) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (elementNumber >= 0 && elementNumber<numberOfElements) {
		brackets.currentTextbook.elements[elementNumber].comments.append({
			"author"  : author,
			"comment" : comment
		});
	}
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

function getCommentAuthors() {
	var authors = [];
	var numberOfElements = brackets.currentTextbook.elements.length;
	var numberOfComments = 0;
	for (var el = 0; el < numberOfElements; el++) {
		numberOfComments = brackets.currentTextbook.elements[el].comments.length;
		for (var comm = 0; comm < numberOfComments; comm++) {
			if (!(authors.contains(brackets.currentTextbook.elements[el].comments[comm].author))) {
				authors.append(brackets.currentTextbook.elements[el].comments[comm].author);
			}
		}
	}
	return authors;
}

var contains = function(needle) {
	contains = function(needle) {
		for (var i = 0; i < this.length; i++) {
			if(this[i] === needle) {
				return true;
			}
		}
	};
	return contains.call(this, needle);
}

function noCommentTextbook() {
	var virginTextbook = {
		"title": brackets.currentTextbook.title;
		"author": brackets.currentTextbook.author;
		"elements": []
	};
	brackets.currentTextbook.elements.forEach(function(element) {
		var virginElement = element;
		virginElement.comments = [];
		virginTextbook.elements.append(virginElement);
	});
	return virginTextbook;
}
