/*
    viewer.js
    =========
    This file contains all procedures related to the rendering of textbook files within a page.

    If you have a textbook object already, use renderTextbook(), otherwise loadJsonTextbook() will 
    generate one for you from a JSON source file.

    This is contains much code from https://github.com/mozilla/pdf.js/tree/master/examples/helloworld 
    within the function renderPdfClip.

    Requirements
    ------------
    This file requires the jQuery library, showdown.js and pdf.js to be included in the page to function correctly.
*/


var mdconverter = new Showdown.converter();

/*Note the 'container' variable refers to an actual DOM element, not its ID*/
function renderTextbook(container, textbook) {
    container.className += " textbook_container";
    
    var header = document.createElement('header');
    container.appendChild(header);

    var title = document.createElement('h1');
    title.textContent = textbook.title;
    title.id = "bookTitle"
    header.appendChild(title);

    var author = document.createElement('span');
    var author_wrapper = document.createElement('span');
    author_wrapper.textContent = 'By ';
    author_wrapper.className += "author";

    author.id = "bookAuthor";
    author.textContent = textbook.author;
    author_wrapper.appendChild(author);
    header.appendChild(author_wrapper);

    var empty_textbook = document.createElement("div");
    empty_textbook.className += "bs-callout bs-callout-info";
    empty_textbook.id = "empty-textbook";
    empty_textbook.innerHTML = "<h4>This textbook is empty</h4>"
      + "<p>You can add new content in Edit mode.</p>";
    $(empty_textbook).hide();
    container.appendChild(empty_textbook);


    $.each(textbook.elements, function( index, element ) { 
	renderElement(container, element); 
	renderComments(container, element); 
    });
}

function renderComments(container, element) {
    if (typeof element.comments !== 'undefined') { 
        $.each(element.comments, function( index, comment ) { 
            var comment_container = document.createElement('div');
            comment_container.className += "comment viewer";
			
	    var delete_button = document.createElement('span');
	    delete_button.className = "deleteButton";
	    comment_container.appendChild(delete_button);
			
            var author = document.createElement('span');
            author.textContent = comment.author;
            author.className += "author";
            comment_container.appendChild(author);

            var text = document.createElement('p');
            text.textContent = comment.text;
            comment_container.appendChild(text);

            container.appendChild(comment_container);
        });
    }
}

function renderElement(container, element, callback) {
        //Create element container
        var element_container = document.createElement('div');
        element_container.className += "wrapper";
		
	var delete_button = document.createElement('span');
	delete_button.className = "deleteButton";
	element_container.appendChild(delete_button);
		
        container.appendChild(element_container);
        //Render if we know how
        switch (element.type) {
            case 'pdfHorizontal': 
                element_container.className += " pdfHorizontal";
                renderPdfHorizontal(element_container, element, callback);
                break;
            case 'pdfRectangle': 
                element_container.className += " pdfRectangle";
                renderPdfRectangle(element_container, element, callback);
                break;				
            case 'youtube':
                element_container.className += " youtube";
                renderYoutubeElement(element_container, element);
                break;
            case 'wikipedia':
                element_container.className += " wikipedia";
                renderWikipediaElement(element_container, element);
                break;
            case 'image':
                element_container.className += " image";
                renderImageElement(element_container, element);
                break;
            case 'text':
                element_container.className += " text";
                renderTextElement(element_container, element);
                break;
            default:
                break;
        }

}

function renderYoutubeElement(container, element) {
    var tag = "";
    if ((typeof element.start === 'undefined')|(typeof element.end === 'undefined')) {
        tag = "<iframe class='yt_player' type='text/html' src='http://www.youtube.com/embed/"+element.source+"' frameborder='0'></iframe>";
    } else {
        tag = "<iframe class='yt_player' type='text/html' src='http://www.youtube.com/embed/"+element.source+"?start="+element.start+"&end="+element.end+"' frameborder='0'></iframe>";
    }
    $(container).append(tag);
}

function renderImageElement(container, element) {
    var image = document.createElement('img');
    image.src = element.source;
    container.appendChild(image);
}

function renderWikipediaElement(container, element) {
    $.ajax({
        url: "http://en.wikipedia.org/w/index.php?action=render&title="+element.page,
        cache: false
    }).done(function( html ) {
        var tmp_cont = document.createElement('div');
        tmp_cont.id = "wiki_tmp_cont_to_delete";
        tmp_cont.innerHTML = html;
        container.appendChild(tmp_cont);
        $(container).find('a').contents().unwrap();
        $(container).find('img').attr('src', function(index, src) { return 'http:' + src; });
        if ((typeof element.start === 'number')&(typeof element.end === 'number')) {
            $('#wiki_tmp_cont_to_delete').selection(element.start, element.end);
            container.appendChild(document.getSelection().getRangeAt(0).extractContents());
            $('#wiki_tmp_cont_to_delete').remove();
        }
    }).fail(function() {
        console.log("Error fetching wikipedia page: "+element.page);
    });
}

function renderTextElement(container, element) {
    $(container).append(mdconverter.makeHtml(element.text));
}

function renderPdfHorizontal(container, element) {
    //Unpack start and end variables
    var start_page = Math.floor(element.startY);
    var start_y = element.startY-start_page;
    var end_page = Math.floor(element.endY);
    var end_y = element.endY-end_page;
    //If is just a single page
    if (start_page==end_page) {
        var canvas = document.createElement('canvas');
        container.appendChild(canvas);
        renderPdfClip(canvas, element.source, start_page, 0, start_y, 1, end_y);
    } else {
        //Else loop through, creating a new canvas for each page
        for (var i = start_page; i <= end_page; i++) {
            var canvas = document.createElement('canvas');
            container.appendChild(canvas);
            switch(i) {
                case start_page:
                    renderPdfClip(canvas, element.source, i, 0, start_y, 1, 1);
                    break;
                case end_page:
                    renderPdfClip(canvas, element.source, i, 0, 0, 1, end_y);
                    break;
                default:
                    renderPdfClip(canvas, element.source, i, 0, 0, 1, 1);
            }
        }  
    }
}

function renderPdfRectangle(container, pdfRect, callback) {
    // Check for valid inputs
    if ((pdfRect.startX>1)|(pdfRect.endX>1)|(pdfRect.startY>1)|(pdfRect.endY>1)|
        (pdfRect.startX<0)|(pdfRect.endX<0)|(pdfRect.startY<0)|(pdfRect.endY<0)) {
        console.log("Could not render pdfRectangle ('"+pdfRect.source+'). These can not extend outside of page boundaries. So startX, startY, endX, and endY parameters must to between 0 and 1.');
        return;
    }

    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    renderPdfClip(canvas, pdfRect.source, pdfRect.page, pdfRect.startX, pdfRect.startY, pdfRect.endX, pdfRect.endY, callback);
}

/*
renderPdfClip
-------------
Aim of this is to render a snippet of a PDF on a page. Seems to work mostly.... 
This is done based on a start_y, and end_y of a page, on a page by page basis. 
These are used as fractions of the whole page (.

This is done by modifying the height and width of the canvas element that pdf.js renders to. It 
then using canvas.translate to move to the correct section of the page.
*/
function renderPdfClip(canvas, pdf_url, page_no, startX, startY, endX, endY, callback) {
    // NOTE:
    // Using a PDF from another server will likely *NOT* work. Because of browser
    // security restrictions, we have to use a file server with special headers
    // (CORS) - most servers don't support cross-origin browser requests.
    // ----> why we're making a locally run web application.

    // Disable workers to avoid yet another cross-origin issue (workers need the URL of
    // the script to be loaded, and dynamically loading a cross-origin script does
    // not work)
    PDFJS.disableWorker = true;

    // Asynchronous download PDF as an ArrayBuffer
    PDFJS.getDocument(pdf_url).then(function getClipViewer(pdf) {
      // Fetch the first page
      pdf.getPage(page_no).then(function getPageClipViewer(page) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var context = canvas.getContext('2d');

        // Displacement and clipping of pages
        // Displacement and clipping of pages
        canvas.height = viewport.height*(endY-startY);
        canvas.width = viewport.width*(endX-startX);
        context.translate(-(viewport.width*startX),-(viewport.height*startY));

        // Render PDF page into canvas context
	if (typeof callback === "undefined") {
	  page.render({canvasContext: context, viewport: viewport});
	} else {
	  page.render({canvasContext: context, viewport: viewport})
	    .then(callback);
	}
      });
    });

}
