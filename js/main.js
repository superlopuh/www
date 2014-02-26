$(window).load(function () {
	if (typeof (brackets.currentTextbook) != "undefined") {
		renderTextbook(document.getElementById('textbook'), brackets.currentTextbook);
	}
});

function openEditMode() {
	$("#edit-button").html("View");
	$('#textbook').sortable();
	$("body").addClass("edit-mode");
	$('#bookTitle').attr("contenteditable", true);
	$('#bookAuthor').attr("contenteditable", true);
}

function openViewMode() {
	$("#edit-button").html("Edit");
	$("#textbook").sortable("option", "disabled", true);
	$("body").removeClass("edit-mode");
	$('#bookTitle').attr("contenteditable", false);
	$('#bookAuthor').attr("contenteditable", false);
}
$(document).ready(function () {
	$('#edit-button').data('toggleState', true);
	$('#edit-button').click(function () {
		state = $(this).data('toggleState');
		if (state) {
			openEditMode();
		} else {
			openViewMode();
		}
		$(this).data('toggleState', !state);
	});
	brackets.app.getPendingFilesToOpen(function (err, files) {
		if (files.length > 0) {
			loadTextbook(files[0]);
		}
	});
});

function openTextbook() {
	brackets.fs.showOpenDialog(false, false, "Open a Textbook...", "", null, function (err, fp) {
		if (fp == "") return;
		loadTextbook(fp);
	});
}

function loadTextbook(filename) {
	$('#edit-button').removeClass("disabled");
	$("#textbook").empty();
	$.getJSON("file:///" + filename, function (textbook) {
		brackets.currentTextbook = textbook;
		brackets.textbookContainer = document.getElementById('textbook');
		$("#clipper-recently-used-list").empty();
		var pdfs = previousPDFs();
		console.log(pdfs);
		for (var i = 0; i < pdfs.length; i++) {
			$("#clipper-recently-used-list").append("<li><a href=" + pdfs[i] + ">" + pdfs[i] + "</a></li>");
		}
		renderTextbook(document.getElementById('textbook'), textbook);
		clearClipper();
		openViewMode();
	});
}

function saveTextbook() {
	modifyTitle($('#bookTitle').html());
	modifyAuthor($('#bookAuthor').html());
	var proposed_filename = $("#bookTitle").text();
	proposed_filename = proposed_filename.replace(/[\/:\*\?\"<>|]/g, "");
	proposed_filename = proposed_filename.replace(/\s+/g, "_");
	brackets.fs.showSaveDialog("title2", "", proposed_filename + ".lima", function (err, fp) {
		brackets.fs.writeFile(fp, JSON.stringify(brackets.currentTextbook), "utf8", function () {});
	});
}

function renderNewTextbook() {
	$('#edit-button').removeClass("disabled");
	brackets.textbookContainer = document.getElementById('textbook');
	brackets.currentTextbook = createNewTextbook();
	$("#textbook").empty();
	renderTextbook(document.getElementById('textbook'), brackets.currentTextbook);
	$("#empty-textbook").show();
	clearClipper();
	openEditMode();
}

function putPdf() {
	addPDFHorizontalClip($("#inputPdfUrl").val(), $("#pdfStart").val(), $("#pdfEnd").val());
}

function putYouTube() {
	var url = $("#inputYouTubeUrl").val();
	//Extract ID
	var id = "";
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
		id = match[2];
	} else {
		console.log("Could not process given youtube url");
	}
	//Get start and end times if possible
	var start = $("#ytStart").val();
	var end = $("#ytEnd").val();
	if ((start == null) || (end == null)) {
		addYouTubeVid(id);
	} else {
		addYouTubeVid(id, start, end);
	}
	renderElement(brackets.textbookContainer, newElement);
}

function putImage() {
	addImage($("#inputImageUrl").val());
}

function putWikipedia() {
	addWiki(
		$("#inputWikipediaUrl").val(),
		wikiSelectStart,
		wikiSelectEnd
	);
	wiki_cont_jq.innerHTML = 'Loading page...';
	modal_jq.modal('hide');
}

function putText() {
	addText($("#inputText").val());
}
$("form").on("submit", function (e) {
	e.preventDefault();
});
$(document).on("click", ".wrapper .deleteButton", function (e) {
	var $target = $(e.target).closest(".wrapper")
	var index = $target.parent().children(".wrapper").index($target);
	$.confirm({
		text: "Are you sure you want to delete this element?",
		confirm: function () {
			$target.slideUp(function () {
				if ($target.parent().children(".wrapper").length === 1) {
					$("#empty-textbook").css("display", "block");
				}
				$target.detach();
				deleteElement(index);
			});
		}
	});
});