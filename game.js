userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$("h1").on("mouseover", function() {

  if (!started) {
    //        $("h1").text("Level "+level);
    
    nextSequence();
    started = true;
  }
})


$(document).keydown(function(event) {

  if (!started) {
    //        $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
})


$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  createSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  //  buttonAnimation(userChosenColour);
});


function nextSequence() {
  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  createSound(randomChosenColour);
}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    createSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, press any key to restart");
    startOver();  }
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 120);
}



function createSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animateOver() {

}


function startOver() {

  gamePattern = [];

  started = false;

  level = 0;

}
