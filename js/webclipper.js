var web_modal_jq = $('#webPreviewModal');
var web_cont_jq = $('#webPreview');
var web_title_input_jq = $('#inputWebUrl');
var webSelectStart, webSelectEnd;


web_modal_jq.on('shown.bs.modal', function (e) {
	var url = web_title_input_jq.val();
    $.ajax({
        url: url,
        cache: false
    }).done(function(html) {
        web_cont_jq.html(html);
        web_cont_jq.find('a').contents().unwrap();
        web_cont_jq.find('img').attr('src', function(index, src) { return 'http:' + src; });
        web_cont_jq.addClass('web wrapper');
    }).fail(function() {
        alert("Error fetching webpage: "+page_title);
    });
});

web_cont_jq.mouseup(function(e) {
    var selection = web_cont_jq.selection();
	webSelectStart = selection.start;
    webSelectEnd = selection.end;
});