
// The textbook is stored in brackets.currentTextbook

function createNewTextbook() {
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
		// For each of the elements, see if they are well defined
		// If one of them is not, then the whole textbook is not, so return false
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

	else {
		// Check that comments are well defined
		var numberOfComments = element.comments.length;
		for (var comm = 0; comm < numberOfComments; comm++) {
			if (!(commentIsWellDefined(element.comments[comm]))) return false;
		}
		// Check that rest is well defined for the different types of elements
		switch(element.type) {
			case 'pdfRectangle':
				// Check that element has a source that is a string
				if (typeof(element.source) != "string") {
					return false;
				}
				// Check that element has all coordinates
				else if (typeof(element.startX) != "number" ||
						 typeof(element.startY) != "number" ||
						 typeof(element.endX) != "number" ||
						 typeof(element.endY) != "number" ||
						 typeof(element.page) != "number") {
					return false;
				}
				// Check that end is after start
				else if (element.startX >= element.endX ||
						 element.startY >= element.endY) {
					return false;
				}
				else {
					return true;
				}
			case 'pdfHorizontal':
				// Check that element has a source that is a string
				if (typeof(element.source) != "string") {
					return false;
				}
				// Check that element has all coordinates
				else if (typeof(element.startY) != "number" ||
						 typeof(element.endY) != "number") {
					return false;
				}
				// Check that end is after start
				else if (element.startY >= element.endY) {
					return false;
				}
				else {
					return true;
				}
			case 'youtube':
				// Check that element has a source that is a string
				if (typeof(element.source) != "string") {
					return false;
				}
				// Check that element has all coordinates
				else if (typeof(element.startTime) != "number") {
					return false;
				}
				// Check that startTime is after 0
				else if (element.startTime >= 0) {
					return false;
				}
				else {
					return true;
				}
			case 'text' :
				// Check that element has a text field
				if (typeof(element.text) != "string") {
					return false;
				}
				else {
					return true;
				}
			case 'wikipedia':
				// Check that element has a source that is a string
				if (typeof(element.source) != "string") {
					return false;
				}
				else {
					return true;
				}
			case 'image':
				// Check that element has a source that is a string
				if (typeof(element.source) != "string") {
					return false;
				}
				else {
					return true;
				}
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
	newElement.page		= Math.floor(startX);
	newElement.startX 	= startX;
	newElement.startY 	= startY;
	newElement.endX 	= endX;
	newElement.endY 	= endY;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addPDFRectangleClip(source,page,startX,startY,endX,endY) {
	var newElement 		= {};
	newElement.type 	= "pdfRectangle";
	newElement.source 	= source;
	newElement.page		= page;
	newElement.startX 	= startX;
	newElement.startY 	= startY;
	newElement.endX 	= endX;
	newElement.endY 	= endY;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addPDFHorizontalClip(source,startY,endY) {
	var newElement 		= {};
	newElement.type 	= "pdfHorizontal";
	newElement.source 	= source;
	newElement.startY 	= startY;
	newElement.endY 	= endY;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addYouTubeVid(source) {
	var newElement 		 = {};
	newElement.type 	 = "youtube";
	newElement.source 	 = source;
	newElement.comments  = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}
function addYouTubeVid(source, start, end) {
	var newElement 		 = {};
	newElement.type 	 = "youtube";
	newElement.source 	 = source;
	newElement.start 	 = start;
	newElement.end 		 = end;
	newElement.comments  = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addText(text) {
	var newElement 		= {};
	newElement.type 	= "text";
	newElement.text 	= text;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addWiki(source) {
	var newElement 		= {};
	newElement.type 	= "wikipedia";
	newElement.source 	= source;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
    renderElement(brackets.textbookContainer, newElement);
}

function addImage(source) {
	var newElement 		= {};
	newElement.type 	= "image";
	newElement.source 	= source;
	newElement.comments = [];
	brackets.currentTextbook.elements.push(newElement);
	renderElement(brackets.textbookContainer, newElement);
}

function previousPDFs() {
	var pdfLinks = [];
	var numberOfElements = brackets.currentTextbook.elements.length;
	for (var el = 0; el < numberOfElements; el++) {
		if (brackets.currentTextbook.elements[el].type == "pdfRectangle" ||
			brackets.currentTextbook.elements[el].type == "pdfHorizontal") {
			if ($.inArray(brackets.currentTextbook.elements[el].source, pdfLinks) == -1) {
				pdfLinks.push(brackets.currentTextbook.elements[el].source);
			}
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
			newElements.push(brackets.currentTextbook.elements[el]);
		}
		for (var el = clipNumber+1; el < numberOfElements; el++) {
			newElements.push(brackets.currentTextbook.elements[el]);
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
			newElements.push(brackets.currentTextbook.elements[el]);
		}
		// If move up the page
		if (oldPosition > newPosition) {
			newElements.push(brackets.currentTextbook.elements[oldPosition]);
			for (var el = newPosition; el < oldPosition; el++) {
				newElements.push(brackets.currentTextbook.elements[el]);
			}
			for (var el = oldPosition+1; el < numberOfElements; el++) {
				newElements.push(brackets.currentTextbook.elements[el]);
			}
			brackets.currentTextbook.elements = newElements;
		}
		// If move down the page
		else {
			for (var el = oldPosition+1; el <= newPosition; el++) {
				newElements.push(brackets.currentTextbook.elements[el]);
			}
			newElements.push(brackets.currentTextbook.elements[oldPosition]);
			for (var el = newPosition+1; el < numberOfElements; el++) {
				newElements.push(brackets.currentTextbook.elements[el]);
			}
			brackets.currentTextbook.elements = newElements;
		}
	}
}

// Comment functions below

function addComment(elementNumber,author,comment) {
	var numberOfElements = brackets.currentTextbook.elements.length;
	if (elementNumber >= 0 && elementNumber<numberOfElements) {
		brackets.currentTextbook.elements[elementNumber].comments.push({
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
				authors.push(brackets.currentTextbook.elements[el].comments[comm].author);
			}
		}
	}
	return authors;
}

function contains(array, needle) {
	for (var i = 0; i < array.length; i++) {
		if(array[i] === needle) {
			return true;
		}
	}
}

function noCommentTextbook() {
	var virginTextbook = {
		"title": brackets.currentTextbook.title,
		"author": brackets.currentTextbook.author,
		"elements": []
	};
	brackets.currentTextbook.elements.forEach(function(element) {
		var virginElement = element;
		virginElement.comments = [];
		virginTextbook.elements.push(virginElement);
	});
	return virginTextbook;
}

function describeTextbook() {
	var textbookString = brackets.currentTextbook.name;
	textbookString += " by " + brackets.currentTextbook.author + "\n";
	var numberOfElements = brackets.currentTextbook.elements.length;
	for (var i = 0; i < length; i++) {
		textbookString += "\n" + i + ": ";
		switch(brackets.currentTextbook.elements[i].type) {
			case 'pdfRectangle':
				textbookString += "Rectangle from " + brackets.currentTextbook.elements[i].source;
			case 'pdfHorizontal':
				textbookString += "Horizontal clip from  " + brackets.currentTextbook.elements[i].source;
			case 'youtube':
				textbookString += "YouTube clip from  " + brackets.currentTextbook.elements[i].source;
			case 'text' :
				textbookString += "Some text";
			case 'wikipedia':
				textbookString += "Wikipedia clip from  " + brackets.currentTextbook.elements[i].source;
			case 'image':
				textbookString += "Image from  " + brackets.currentTextbook.elements[i].source;
			default:
				textbookString += "Undefined type";
		}
	} 
}
