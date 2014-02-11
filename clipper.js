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

$('#source-load').click(function(e) {
  e.preventDefault();

  var id = $("#source-list ul").children().length+1;
  var source = $("#source-url").val();
  var elem = generateListElement(id, source);

  $("#source-url").val("");

  $('#source-list ul').append(elem);

  $("canvas").attr("data-page", 1);
  renderPdfClip("clipper-viewer-canvas", source, 1, 0, 1);
});

$(document).on('change', 'input:radio', function(e) {
  var source = $('input:radio:checked').parents('li').attr('data-source');
  $("canvas").attr("data-source", source)
    .attr("data-page", 1);

  renderPdfClip("clipper-viewer-canvas", source, 1, 0, 1);
});

//renderPdfClip("clipper-viewer-canvas", "sv1.pdf", 1, 0, 1);
$('#next-page').click(function(e) {
  var page = Number($("canvas").attr("data-page"))+1;
  var source = $("canvas").attr("data-source");
  $("canvas").attr("data-page", page);
  renderPdfClip("clipper-viewer-canvas", source, page, 0, 1);
});

$('#previous-page').click(function(e) {
  var page = Number($("canvas").attr("data-page"))-1;
  var source = $("canvas").attr("data-source");
  if (page < 1) page = 1;
  $("canvas").attr("data-page", page);
  renderPdfClip("clipper-viewer-canvas", source, page, 0, 1);
});
