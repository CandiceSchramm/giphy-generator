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
});


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
            resultContainer.data("imgURL", "animated");
            newGifContainer = $("<img>")
            ratingContainer = $("<p>").text("Rating: " + response.data[i].rating);
            //sets still and animated equal to the appropriate url
            still = response.data[i].images.original_still.url;
            animated = response.data[i].images.original.url

            //check if data att === still or animated and put appropriate url for Gif inside newGifContainer
            if (resultContainer.data("imgURL") === "still") {
                console.log("still");
                $(newGifContainer).attr("src", still);
            } else if (resultContainer.data("imgURL") === "animated") {
                console.log("animated");
                $(newGifContainer).attr("src", animated);
            };

            resultContainer.append(newGifContainer);
            resultContainer.prepend(ratingContainer);
            $(".gif-container").append(resultContainer);
        }
    });

}
// when you click on the resultContainer it changes the data attr imgURL
$(document).click(resultContainer, function () {
    //if data att === "still"
    if (resultContainer.data("imgURL") === "still") {
        //change value to animated
        $(newGifContainer).data("imgURL", "animated");
        //else if it's already set to animated
    } else if (resultContainer.data("imgURL") === "animated") {
        //change it to still
        $(newGifContainer).data("imgURL", "still");
    };
    displayGifs();
});

//the imageURL for that data-val div will change to animated

//when you click on a button, it displays the gifs for you
$(document).on("click", ".animal-button", function(){
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




