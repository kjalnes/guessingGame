function generateWinningNumber() {
 	return Math.ceil(Math.random() * 100);
 }

function shuffle(array) {
	var remaingElements = array.length;
 	var lastElement;
 	var newIndex;

  // While there remain elements to shuffle…
	while (remaingElements) {
	    // Pick a remaining element…
	    newIndex = Math.floor(Math.random() * remaingElements--);
	    // And swap it with the current element.
	    lastElement = array[remaingElements]; // the last on in the array
	    array[remaingElements] = array[newIndex];
	    array[newIndex] = lastElement;
  	}
  return array;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber ? true : false;
}
	
Game.prototype.playersGuessSubmission = function(num) {
	if (num < 1 || num > 100 || isNaN(num)) {
		throw "That is an invalid guess.";
	} else {
		this.playersGuess = num;
		return this.checkGuess(this.playersGuess);
	}
}

Game.prototype.checkGuess = function(guess) {

	if (this.pastGuesses.indexOf(guess) > -1) {
		return "You have already guessed that number." 
	} else if (guess === this.winningNumber) {
		return 'You Win!'
	} else{
		this.pastGuesses.push(guess);
		if(this.pastGuesses.length === 5) {
			return "You Lose."
		} else if(this.difference() < 10) {
			return "You\'re burning up!";
		} else if(this.difference() < 25) {
			return "You\'re lukewarm."; 
		} else if(this.difference() < 50){
			return "You\'re a bit chilly.";
		} else if(this.difference() < 100){
			return "You\'re ice cold!"; 
		}
	}
}

function newGame() {
	return new Game;	
} 

Game.prototype.provideHint = function() {
	var hintArr = [this.winningNumber];

	while(hintArr.length < 3) {
		var randomNum = generateWinningNumber();
		if(randomNum !== this.winningNumber) {
			hintArr.push(randomNum);
		}
	}
	return shuffle(hintArr);
}

console.log('her')

$(document).ready(function() {

    var game = new Game();
    
    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });

    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);

    })
})








