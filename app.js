var name;


function Player() {
	this.init = function(playerName) {
		console.log("here");
		this.playerName = playerName;
	}
	
	/**
		Abstract method for making a move.
		Returns a index for either paper, rock or scissors. E.g 0,1 or 2.
		The aiMoves parameter is an array sent by the game engine which tells the player the history of the ai moves
	*/
	this.makeMove = function(aiMoves) {
	};

}

function sleep(milliseconds){
 var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function DefaultPlayer() {
	this.makeMove = function(aiMoves) {
		return Math.floor((Math.random()*2));
	};
}

$( document ).ready(function() {
    $('#AI-name').hide("slide", {direction: "right" }, 1000);
    $('#Player-name').hide("slide", {direction: "left" }, 1000);
    name=prompt("Enter Your Name, Please.","name");
});


DefaultPlayer.prototype = new Player();

function init() {
var mess=document.getElementById("mess");
mess.innerHTML="";
var player;
	try
  {
	player = document.getElementById('customImpl').value;

	if (typeof player === 'undefined') {
		player = new DefaultPlayer();
		player.init('Default');
	} else {
		player += " CustomPlayer.prototype = new Player(); function getInstance() { return new CustomPlayer();}"
		var xyz = document.getElementById('xyz');
		if(xyz !== undefined){

		xyz.parentNode.removeChild(xyz);
	}	
		var script = document.createElement("script");
		script.id = 'xyz';
        script.innerHTML = player;
        document.body.appendChild(script);
		//CustomPlayer.prototype = new Player();
		player = getInstance();
		player.init('olle');

	}

	runGame(player);

	}catch(err)
  {
  	
  	document.getElementById("textbox").style.borderColor='#000000';;
  	mess.innerHTML= err + ".";
  	


  }
}

function runGame(player) {
	$(function() {
	var counter = 1;
	var score = 0;
	var leftHandOption = [$('#paper-leftside'), $('#rock-leftside'), $('#scissors-leftside')];
	var rightHandOption = [$('#paper-rightside'), $('#rock-rightside'), $('#scissors-rightside')];
	var moves = [];
	var currentLeftHandSelected;
	var currentRightHandSelected;
	$('#Player-name').html(name).show("slide", {direction: "left" }, 500);
	$('#AI-name').html("Ai").show("slide", {direction: "right" }, 500);
	var i = 1;
	var cb = setInterval(function() {
		var code = name.charCodeAt(i++ % 10);
		if (typeof currentLeftHandSelected !== 'undefined') {
			currentLeftHandSelected.removeClass('selected');
			currentLeftHandSelected.addClass('unselected');
		}
		var currentMove = code % 3;
		currentLeftHandSelected = leftHandOption[currentMove];
		currentLeftHandSelected.removeClass('unselected');
		currentLeftHandSelected.addClass('selected');
		var playerMove = player.makeMove(moves);

		if (typeof currentRightHandSelected !== 'undefined') {
			currentRightHandSelected.removeClass('selected');
			currentRightHandSelected.addClass('unselected');
		}
		currentRightHandSelected = rightHandOption[playerMove];
		currentRightHandSelected.removeClass('unselected');
		currentRightHandSelected.addClass('selected');
		//console.log("ai move: " + currentMove);
		//console.log("player move: " + playerMove);

		if (playerMove == 0 && currentMove == 1) {
			score++;
		} else if (playerMove == 1 && currentMove == 2) {
			score++;
		} else if (playerMove == 2 && currentMove == 0) {
			score++;
		}
		moves.push(currentMove);

		var progress = document.getElementById("progressbar");

		$('#progressbar').progressbar('option', 'value', score);
		$('#score').html("Score: " + score + " %");
		counter++;
		if (counter > 100) {
			clearInterval(cb);
		}
	}, 60);
	
});
}

