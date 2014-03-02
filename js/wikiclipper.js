/* Copyright 2014 Group Lima
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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