/*
    pdfclipviewer
    =============
    Aim of this is to render a snippet of a PDF on a page. Seems to work mostly.... Co-ordinates 
    (x1,y1) give top left corner, (x2,y2) give bottom right corner. These are used as fractions of 
    the whole page (I thought this would be useful for scaling later..?).

    This is done by modifying the height and width of the canvas element that pdf.js renders to. It 
    then uses canvas.translate to move to the correct section of the page.

    This is almost 100% the code from https://github.com/mozilla/pdf.js/tree/master/examples/helloworld 
    with a couple of changes of my own.
*/


function renderPdfSource(container_id, pdf_url, start_page, start_y, end_page, end_y) {
    var container = document.getElementById(container_id);
    for (var i = start_page; i <= end_page; i++) {
        var canvas = document.createElement("canvas");
        canvas.id = container_id+"page_"+i;
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
function renderPdfClip(canvas_id, pdf_url, page_no, y1, y2) {
    //
    // NOTE:
    // Using a PDF from another server will likely *NOT* work. Because of browser
    // security restrictions, we have to use a file server with special headers
    // (CORS) - most servers don't support cross-origin browser requests.
    //

    //
    // Disable workers to avoid yet another cross-origin issue (workers need the URL of
    // the script to be loaded, and dynamically loading a cross-origin script does
    // not work)
    //
    PDFJS.disableWorker = true;

    //
    // Asynchronous download PDF as an ArrayBuffer
    //
    PDFJS.getDocument(pdf_url).then(function getClipViewer(pdf) {
      //
      // Fetch the first page
      //
      pdf.getPage(page_no).then(function getPageClipViewer(page) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext('2d');

        //The code I (Dan) actually wrote... solid 3 lines....
        canvas.height = viewport.height*(y2-y1);
        canvas.width = viewport.width;
        context.translate(0,-(viewport.height*y1));

        //
        // Render PDF page into canvas context
        //
        page.render({canvasContext: context, viewport: viewport});
      });
    });

}