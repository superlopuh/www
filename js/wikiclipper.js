var modal_jq = $('#wikiPreviewModal');
var wiki_cont_jq = $('#wikiPreview');
var title_input_jq = $('#inputWikipediaUrl');
var wikiSelectStart, wikiSelectEnd;


modal_jq.on('shown.bs.modal', function (e) {
	var page_title = title_input_jq.val().split("/").slice(-1)[0];;
    $.ajax({
        url: "http://en.wikipedia.org/w/index.php?action=render&title="+page_title,
        cache: false
    }).done(function(html) {
        wiki_cont_jq.html(html);
        wiki_cont_jq.find('a').contents().unwrap();
        wiki_cont_jq.find('img').attr('src', function(index, src) { return 'http:' + src; });
        wiki_cont_jq.addClass('wikipedia wrapper');
    }).fail(function() {
        alert("Error fetching wikipedia page: "+page_title);
    });
});

wiki_cont_jq.mouseup(function(e) {
    var selection = wiki_cont_jq.selection();
	wikiSelectStart = selection.start;
    wikiSelectEnd = selection.end;
});