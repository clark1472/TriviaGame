//load questions and choices and correct answers
var allQuestions = [{
    question: "Who was the leader of SG-1 for the first 8 seasons?",
    choices: ["General Hammond", "Jack O'Neill","Sam Carter", "Cameron Mitchell"],
    correctAnswer: 1
  },{
    question: "How many symbols need to be 'dialed' to connect to a planet?",
    choices: [ "seven", "six", "nine", "three"],
    correctAnswer: 0
  },{
    question: "What is the name of the mountain in which the Stargate is situated?",
    choices: ["Rocky Mountains", "Mount Everest", "Cheyenne Mountain", "Grand Teton"],
    correctAnswer: 2
  }];

var currentquestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var c=30;
var t;

//set up of questions and choices 
function setupOptions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  //set up of radio buttons
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" id="option' + i + '"><label for="option' + i + '">' +
      allQuestions[currentquestion].choices[i] + '</label></div><br/>';
  }
  //set up of correct answers
  $('#form').html(formHtml);
  $("#option0").prop('checked', true);
};

//compare answer to correctAnswer
function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers++;
  };
};

function EndGame()
  {
      $(".jumbotron").hide();
      $("#result").html("You correctly answered " + correctAnswers + " out of " + allQuestions.length + " questions! ").hide();
      $("#result").show();
      c=185;    
      return false;
}

//document is ready to push start button
$(document).ready(function() {

  $(".jumbotron").hide();
  $('#start').click(function() {
    $(".jumbotron").show();
    $(this).hide();
    timedCount();
  });

//set up
setupOptions();

//changed to the next question
$("#next").click(function() {
  event.preventDefault();
  checkAns();
  currentquestion++;

//all questions answered
  if (currentquestion < allQuestions.length) {
    setupOptions();
    if (currentquestion == allQuestions.length - 1) {

      //submit correctAnswers
      $('#next').html("Submit");
      $('#next').click(function() {
        EndGame();
      });

    };

  };
});

function timedCount()
  {
    if(c == 185)
    {
      return false;
    }
    var hours = parseInt( c / 3600 ) % 24;
    var minutes = parseInt( c / 60 ) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds <
    10 ? "0" + seconds : seconds);
    $('#timer').html(result);
    if(c == 0 )
    {
      //timeing out
      EndGame();
      return false;
    }
      c = c - 1;
	  	t = setTimeout(function()
	  	{
			  timedCount()
		  },1000);
	}
	

});





