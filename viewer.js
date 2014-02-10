/*
    viewer.js (dj311)
    =================
    This file contains all procedures related to the rendering of textbook files within a page.

    If you have a textbook object already, use renderTextbook(), otherwise loadJsonTextbook() will 
    generate one for you from a JSON source file.

    This is contains much code from https://github.com/mozilla/pdf.js/tree/master/examples/helloworld 
    within the function renderPdfClip.

    Requirements
    ------------
    This file requires the jQuery library and pdf.js to be included in the page to function correctly.
*/

/*Note: the 'container' variable refers to an actual DOM element, not its ID*/
function loadJsonTextbook(container, source) {
    // Loads JSON textbook, calls inline function on success
    $.getJSON( source, function(textbook) {
        renderTextbook(container, textbook);
    });
}

/*Note the 'container' variable refers to an actual DOM element, not its ID*/
function renderTextbook(container, textbook) {
    container.className += " textbook_container";
    
    var title = document.createElement('h1');
    title.textContent = textbook.title;
    container.appendChild(title);

    var author = document.createElement('span');
    author.textContent = 'By '+textbook.author;
    author.className += "author";
    container.appendChild(author);

    $.each(textbook.elements, function( index, element ) {
        //Create element container
        var element_container = document.createElement('div');
        element_container.id = container.id+'_'+index;
        container.appendChild(element_container);
        //Render if we know how
        switch (element.type) {
            case 'pdf': 
                renderPdfElement(element_container, element.source, element.start, element.end);
                break;
            default:
                break;
        }
    });
}

function renderPdfElement(container, pdf_url, start, end) {
    //Unpack start and end variables
    var start_page = Math.floor(start);
    var start_y = start-start_page;
    var end_page = Math.floor(end);
    var end_y = end-end_page;
    //Loop through, creating a new canvas for each page
    for (var i = start_page; i <= end_page; i++) {
        var canvas = document.createElement('canvas');
        canvas.id = container.id+'_page_'+i;
        container.appendChild(canvas);
        switch(i) {
            case start_page:
                renderPdfClip(canvas.id, pdf_url, i, start_y, 1);
                break;
            case end_page:
                renderPdfClip(canvas.id, pdf_url, i, 0, end_y);
                break;
            default:
                renderPdfClip(canvas.id, pdf_url, i, 0, 1);
        }
    };
}

/*
renderPdfClip
-------------
Aim of this is to render a snippet of a PDF on a page. Seems to work mostly.... 
This is done based on a start_y, and en_y of a page, on a page by page basis. 
These are used as fractions of the whole page (.

This is done by modifying the height and width of the canvas element that pdf.js renders to. It 
then using canvas.translate to move to the correct section of the page.
*/
function renderPdfClip(canvas_id, pdf_url, page_no, y1, y2) {
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
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext('2d');

        // Displacement and clipping of pages
        canvas.height = viewport.height*(y2-y1);
        canvas.width = viewport.width;
        context.translate(0,-(viewport.height*y1));

        // Render PDF page into canvas context
        page.render({canvasContext: context, viewport: viewport});
      });
    });

}