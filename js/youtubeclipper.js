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

function setupYoutubeClipper(container, video_id, start_input, end_input) {
	// Add markup for the sliders etc
	container.innerHTML = "<div class='youtube-slider'><div class='youtube-range'></div>"+
	"<div class='col-md-6 youtube-preview start'></div><div class='col-md-6 youtube-preview end'></div>"+
	"<strong>Start:</strong> <span class='youtube-preview start-val' id='"+start_input+"'></span> <strong>End:</strong> <span class='youtube-preview end-val' id='"+end_input+"'></span></div>";
	// Load youtube video
	var duration = null;
	$.getJSON('https://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=jsonc', function (video) {
		duration = video['data']['duration'];
		$(container).find('.start-val').text(0);
		$(container).find('.end-val').text(duration);
		$(container).find('.youtube-range').slider({
			range: true,
			min: 0,
			max: duration,
			values: [ 0, duration ],
			slide: function( event, ui ) {
				$(container).find('.start-val').text(ui.values[0]);
				$(container).find('.end-val').text(ui.values[1]);
			}
	    });
	})
}

function extractYouTubeId(url) {
	var id = "";
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
		id = match[2];
	} else {
		console.log("Could not process given youtube url");
	}
	return id;
}