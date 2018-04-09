$(document).ready(function () {
  var puppies = ["Golden Retriever", "Shih Tzu", "Husky", "Corgi Flop", "Chow Chow", "Chihuahua", "Lhasa Apso", "West Highland Terrier"];

  function buttonMaker() {
    $("#div1").empty();

    for (var i = 0; i < puppies.length; i++) {
      var addToButton = $("<button>");
      addToButton.addClass("hvr-wobble-vertical puppyChoice");
      addToButton.attr("data-name", puppies[i]);
      addToButton.text(puppies[i]);
      $("#div1").append(addToButton);
      $('#puppy-input').val('');
    }
  }

  buttonMaker();


  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var puppy = $("#puppy-input").val().trim();
    puppies.push(puppy);
    buttonMaker();

  });

  function gifDisplay() {
    buttonMaker();
    var puppyChoice = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + puppyChoice + "&limit=15&api_key=dc6zaTOxFJmzC";
    console.log(puppyChoice);
    $("#div2").empty();
     
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      var giphyResponse = response.data;
      for (var i = 0; i < 10; i++) {
        if (giphyResponse[i].rating !=='r' && giphyResponse[i].rating !=='pg-13'){
        var gifDiv = $('<div class="giphy">');
        var ratingDisplay = $("<p>").text("Rating: " + giphyResponse[i].rating);
        var puppyIMG = $('<img data-state="still">');
        puppyIMG.attr('src', giphyResponse[i].images.fixed_height_still.url);
        puppyIMG.attr('data-animate', giphyResponse[i].images.fixed_height.url);
        puppyIMG.attr('data-still', giphyResponse[i].images.fixed_height_still.url);
        puppyIMG.attr('class', 'gif');
        gifDiv.append(ratingDisplay);
        gifDiv.append(puppyIMG);
        $('#div2').append(gifDiv);

      }
      }
    })
  
  }
  
  $(document.body).on("click", "img", function() {
   
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

$(document).on("click", ".puppyChoice", gifDisplay);












});


