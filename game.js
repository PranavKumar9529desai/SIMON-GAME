// An array of the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// An empty array to store the game pattern
var gamePattern = [];

// An empty array to store the user's clicked pattern
var userClickedPattern = [];

// A variable to check if the game has started or not
var started = false;

// A variable to store the current level
var level = 0;

// Event listener for when a key is pressed
$(document).keypress(function() {

  // If the game hasn't started yet
  if (!started) {
    
    // Update the level title with the current level
    $("#level-title").text("Level " + level);

    // Start the next sequence
    nextSequence();

    // Set started to true
    started = true;
  }
});

// Event listener for when a button is clicked
$(".btn").click(function() {

  // Get the color of the button that was clicked
  var userChosenColour = $(this).attr("id");

  // Add the color to the user's clicked pattern array
  userClickedPattern.push(userChosenColour);

  // Play the sound associated with the color
  playSound(userChosenColour);

  // Animate the button press
  animatePress(userChosenColour);

  // Check if the answer is correct
  checkAnswer(userClickedPattern.length-1);
});

// Function to check if the user's answer is correct
function checkAnswer(currentLevel) {

    // If the current level of the game pattern matches the user's clicked pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      // If the user's clicked pattern is the same length as the game pattern
      if (userClickedPattern.length === gamePattern.length){

        // Wait for a second, then start the next sequence
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      // If the answer is incorrect, play the "wrong" sound, add the "game-over" class to the body, update the level title with "Game Over, Press Any Key to Restart", and start over
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// Function to start the next sequence
function nextSequence() {

  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increase the level
  level++;

  // Update the level title with the new level
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Get the random color from the button colors array
  var randomChosenColour = buttonColours[randomNumber];

  // Add the random color to the game pattern array
  gamePattern.push(randomChosenColour);

  // Animate the button with the random color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound associated with the random color
  playSound(randomChosenColour);
}

// Function to animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play the sound associated with a


// Plays a sound associated with a given color
function playSound(name) {
    // create a new Audio object with the appropriate sound file
    var audio = new Audio("sounds/" + name + ".mp3");
    // play the sound
    audio.play();
  }
  
  // Resets the game to its initial state
  function startOver() {
    // set the level back to 0
    level = 0;
    // clear the game pattern
    gamePattern = [];
    // set the game to not started
    started = false;
  }
  
