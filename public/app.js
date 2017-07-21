// Grab the articles as a json
$("#scrape").on("click", function () {

  $.getJSON("/articles", function (data) {
    // For each one
    $("#articles").empty();
    for (var i = 0; i < data.length; i++) {

      // Display the apropos information on the page
      $("#articles").append("<div id='all_articles' >" + data[i].title + "<br />" + data[i].link + "<button id='save' data-id='" + data[i]._id + "'>Save Article</button></div></br></br>");

    }
  });
});

$(document).on("click", "#save", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/articles/" + thisId
  });
});

// Grab the articles as a json
$("#articles-saved").on("click", function () {
  $.getJSON("/articles", function (data) {
    $("#articles").empty();
    // For each one
    for (var i = 0; i < data.length; i++) {
      if (data[i].saved) {
        // Display the saved articles onto page
        $("#articles").append("<div id='all_articles' >" + data[i].title + "<br />" + data[i].link + "<button type='button' class='btn btn-info btn-lg'  id='article-notes' data-id='" + data[i]._id + "'>Article Notes</button><button type='button' class='btn btn-primary' data-id='" + data[i]._id + "'>Delete from Saved</button></div></br></br>");
      }
    }
  });
});

var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

$(document).on("click", "#article-notes", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articlenotes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function (data) {
      modal.style.display = "block";
      $("#noteholder").empty();
      $("#noteholder").append("<div id='saved-notes'> Notes enetered</br>" + data.note.body + "<button id='delNote' data-id='" + data.note._id + "'>Delete Note</button></div>");
      $("form").empty();
      $("form").append("<input id = 'newNote' type='text' name='newNote'>");
      $(".modal-footer").empty();
      $(".modal-footer").append("<button type = 'button' class = 'btn btn-info btn-lg' id='saveNote' data-id='" + thisId + "'>Save Note</button>");
      console.log(data.note.body);
    });
});

$(document).on("click", "#delNote", function () {
  var thisId = $(this).attr("data-id");
  alert(thisId);
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data:{
      _id:thisId,
    }
  }).done(function (data) {
    console.log(data);

  })
})

$(document).on("click", "#saveNote", function () {
  var bodyValue = $("input#newNote").val();
  alert(bodyValue);
  if (bodyValue === "") {
    bodyValue = "No notes saved";
  }
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/articlenotes/" + thisId,
    data: {
      // Value taken from note textarea
      body: bodyValue
    }

  }).done(function (data) {
    alert("ajax call completed");

    modal.style.display = "none";

  });
});
