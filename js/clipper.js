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

function generateListElement(id, source) {
  var li = document.createElement("li");
  $(li).attr("data-source", source)
    .attr("data-start", 0)
    .attr("data-end", 0);

  var input = document.createElement("input");
  $(input).attr("id", "item-"+id)
    .attr("type", "radio")
    .attr("name", "item-select")
    .attr("value", id)
    .attr("checked", "checked");

  var label = document.createElement("label");
  $(label).attr("for", "item-"+id)
    .text("PDF "+id);

  $(li).append(input).append(label);

  return li;
}

function loadSource(source) {
  $("#clipper-canvas")
    .attr("data-page", 1)
    .attr('data-source', source);

  $('#inputPDFUrl').val(source);
  $('#add-pdf').removeClass('empty');

  var canvas = document.getElementById("clipper-canvas");
  $("#clipper-control, #clipper-viewer").css("display", "none");
  $("#clipper-loading").css("display", "block");

  renderPdfClip(canvas, source, 1, 0, 0, 1, 1, function() {
    $("#clipper-control, #clipper-viewer").css("display", "block");
    $("#clipper-loading").css("display", "none");
  });
}

$('#clipper-load').click(function(e) {
  e.preventDefault();

  if ($("#inputPDFUrl").val()==="") {
    clearClipper();
    return;
  }

  loadSource($('#inputPDFUrl').val());
});

$('#clipper-recently-used-list').click('a', function(e) {
  e.preventDefault();
  loadSource(e.toElement.href);
});

$('#next-page').click(function(e) {
  var page = Number($("#clipper-canvas").attr("data-page"))+1;
  var source = $("#clipper-canvas").attr("data-source");
  $(this).addClass("disabled");

  renderPdfClip(document.getElementById("clipper-canvas"), 
    source, page, 0, 0, 1, 1, function() {
      $("#clipper-canvas").attr("data-page", page);
      $("#next-page, #previous-page").removeClass("disabled");
  });

  removeSelection();
});

$('#previous-page').click(function(e) {
  var page = Number($("#clipper-canvas").attr("data-page"))-1;
  var source = $("#clipper-canvas").attr("data-source");
  $(this).addClass("disabled");

  renderPdfClip(document.getElementById("clipper-canvas"), 
    source, page, 0, 0, 1, 1, function() {
      $("#clipper-canvas").attr("data-page", page);
      $("#next-page, #previous-page").removeClass("disabled");
  });

  removeSelection();
});

$('#clipper-canvas').mousedown(function(e) {
  e.preventDefault();
  $(this).attr('data-selecting', 'true');
  $(this).data('selected', false);

  var startX = e.offsetX/$(this).width();
  var startY = e.offsetY/$(this).height();

  $(this).attr('data-startx', startX)
    .attr('data-starty', startY);

  $('#add-clip').removeClass('disabled');
});

$('#clipper-canvas, #clipper-overlay').mouseup(function(e) {
  e.preventDefault();
  $('#clipper-canvas').attr('data-selecting', 'false');

  if (!$("#clipper-canvas").data("selected")) {
    removeSelection();
  }
});

$('#clipper-canvas').mousemove(function(e) {
  e.preventDefault();
  if ($(this).attr('data-selecting') !== 'true') {
    return;
  }

  $(this).data('selected', true);

  var endX = e.offsetX/$(this).width();
  var endY = e.offsetY/$(this).height();

  $(this).attr('data-endx', endX)
    .attr('data-endy', endY);

  setTimeout(fixOverlay, 1);
});

function fixOverlay() {
  var $canvas = $('#clipper-canvas');
  var offsetX = Number($canvas.css('margin-left').slice(0,-2)) + $canvas.position().left;
  var offsetY = Number($canvas.css('margin-top').slice(0,-2)) + $canvas.position().top;

  var startX = $canvas.attr('data-startX')*$canvas.width();
  var startY = $canvas.attr('data-startY')*$canvas.height();

  var endX = $canvas.attr('data-endX')*$canvas.width();
  var endY = $canvas.attr('data-endY')*$canvas.height();

  if (startX > endX) { var t = startX; startX = endX; endX = t; }
  if (startY > endY) { var t = startY; startY = endY; endY = t; }

  var width = endX - startX - 1;
  var height = endY - startY - 1;

  $('#clipper-overlay')
    .css('left', offsetX+startX)
    .css('top', offsetY+startY)
    .css('width', width)
    .css('height', height);
}

function addClip() {
  var $canvas = $('#clipper-canvas');
  
  var source = $canvas.attr('data-source');
  var page = Number($canvas.attr('data-page'));
  var startX = Number($canvas.attr('data-startx'));
  var startY = Number($canvas.attr('data-starty'));
  var endX = Number($canvas.attr('data-endx'));
  var endY = Number($canvas.attr('data-endy'));

  if (startX > endX) { var t = startX; startX = endX; endX = t; }
  if (startY > endY) { var t = startY; startY = endY; endY = t; }

  addPDFRectangleClip(source, page, startX, startY, endX, endY);
}

$('#add-clip').click(function(e) {
  e.preventDefault();

  addClip();
  removeSelection();
});

function removeSelection() {
  var $canvas = $('#clipper-canvas');
  $canvas.attr('data-startY', 0)
    .attr('data-endY', 0)
    .attr('data-startX', 0)
    .attr('data-endX', 0);
  fixOverlay();

  $('#add-clip').addClass('disabled');
}

function clearClipper() {
  removeSelection();
  $("#inputPDFUrl").val("");

  var pdfs = previousPDFs();
  $("#clipper-recently-used-list").empty();
  if (pdfs.length == 0) {
    $("#clipper-recently-used-list").text("Empty");
  } else {
    $.each(pdfs, function(i, val){
      $("#clipper-recently-used-list").append("<li><a href="+val+">" + val + "</a></li>");
    });
  }

  $("#clipper-control, #clipper-viewer").css("display", "none");
  $('#add-pdf').addClass('empty');
}

$("#clipper-clear").click(function(e) {
  e.preventDefault();
  clearClipper();
});
