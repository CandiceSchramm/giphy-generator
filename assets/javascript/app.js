var topics = ["bird", "cat", "dog", "turtle", "giraffe", "snail", "worm", "bird", "hippo", "kangaroo", "flamingo", "bug"]
var animal;
var queryURL;
var imageURL = still;
var still;
var animated;
var resultContainer;
var newGifContainer;
var ratingContainer;

//when the page is ready, put the buttons on the page
$(document).ready(function () {
    renderButtons();;
    console.log("pageloaded");



function renderButtons() {
    $(".button-container").empty();
    for (i = 0; i < topics.length; i++) {
        animalButton = $("<button>").text(topics[i]);
        animalButton.addClass("animal-button");
        animalButton.attr("data-animal", topics[i]);
        $(".button-container").append(animalButton);
    };
}




function displayGifs() {
    $(".gif-container").empty();
    // animal = $(this).attr("data-animal");
    console.log(animal);
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&g=&api_key=RGDtRq5rK8KjloMFoRVkIldvz1gNUh3s&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < response.data.length; i++) {
            //make containers for result, gif, rating
            resultContainer = $("<div>")
            ratingContainer = $("<p>").text("Rating: " + response.data[i].rating);
            newGifContainer = $("<img>")
            newGifContainer.addClass("gif")
            newGifContainer.attr("data-img-type", "still");
            newGifContainer.attr("data-still-url", response.data[i].images.original_still.url);
            newGifContainer.attr("data-animated-url", response.data[i].images.original.url)
            newGifContainer.attr("src", $(newGifContainer).attr("data-still-url"));
            resultContainer.append(newGifContainer);
            resultContainer.prepend(ratingContainer);
            $(".gif-container").append(resultContainer);
        }
    });
}

// when you click on the gif/image
$(document).on("click", ".gif", function () {
    //if imgType att === "still"

    if ($(this).attr("data-img-type") === "still") {
        //animate the picture
        console.log( $(this).data("animated-url"))
        $(this).attr("src", $(this).data("animated-url"));
        console.log("hello2")
        console.log($(this));
      
        //change value to animated
        $(this).attr("data-img-type", "animated");
    } else {
        $(this).attr("src", $(this).data("still-url"));
        //change it to still
        $(this).data("data-img-url", "still");
    };
});

//the imageURL for that data-val div will change to animated

//when you click on a button, it displays the gifs for you
$(document).on("click", ".animal-button", function () {
    animal = $(this).attr("data-animal")
    displayGifs()
});

//after clicking the submit button, your animal you typed is added as a button
$(document).on("click", ".add-button", function () {
    event.preventDefault();
    var animalInput = $("input[name='animal-input']").val();
    topics.push(animalInput);
    renderButtons();
});

});



