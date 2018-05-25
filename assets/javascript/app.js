var topics = ["bird", "cat", "dog", "turtle", "giraffe", "snail", "worm", "bird", "hippo", "kangaroo", "flamingo", "bug"]
console.log(topics);
for (i = 0; i < topics.length; i++){
    var animalButton = $("<div>").text(topics[i]);
    console.log(animalButton);
    $(animalButton).addClass("animal-button");
    $(".button-container").append(animalButton);
}