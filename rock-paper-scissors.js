Router.configure({
    layoutTemplate: 'main'
});
Router.route('/player1');
Router.route('/player2');


Choices = new Mongo.Collection("choices");

if (Meteor.isClient) {
  Template.player1.events({
    "submit #p1_form": function(event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var choice;
      if (document.getElementById('rock').checked) {
        choice = document.getElementById('rock').value;
      }

      if (document.getElementById('paper').checked) {
        choice = document.getElementById('paper').value;
      }

      if (document.getElementById('scissors').checked) {
        choice = document.getElementById('scissors').value;
      }

      if (Choices.findOne({ user:"player1" }) != null) {
        Choices.update({ _id:Choices.findOne({ user:"player1" })['_id'] }, 
          { $set:{ choice:choice } });
      } else {
        Choices.insert({
          user: "player1",
          choice: choice
        });
      }

      if(Choices.findOne({ user:"player2" }) != null) {
        winner = returnWinner(Choices);
        if (winner === -1){
          document.getElementById("tied").style.visibility="visible";
        }

        if (winner === 0) {
          document.getElementById("rock_wins").style.visibility="visible";
        }

        if (winner === 1) {
          document.getElementById("paper_wins").style.visibility="visible";
        }

        if (winner === 2) {
          document.getElementById("scissors_wins").style.visibility="visible";
        }

        document.getElementById("next_game").style.visibility="visible";
        Choices.remove({ _id:Choices.findOne({ user:"player1" })['_id'] });
        Choices.remove({ _id:Choices.findOne({ user:"player2" })['_id'] });
      } else {
        document.getElementById("waiting").style.visibility="visible";
        hideWinner();
      }
    }
  });

  Template.player2.events({
    "submit #p2_form": function(event){
      // Prevent default browser form submit
      event.preventDefault();
      var choice;
      if (document.getElementById('rock').checked) {
        choice = document.getElementById('rock').value;
      }

      if (document.getElementById('paper').checked) {
        choice = document.getElementById('paper').value;
      }

      if (document.getElementById('scissors').checked) {
        choice = document.getElementById('scissors').value;
      }

      if (Choices.findOne({user:"player2"}) != null) {
        Choices.update({ _id:Choices.findOne({ user:"player2" })['_id'] }, 
          { $set:{ choice:choice } });
      } else {
        Choices.insert({
          user: "player2",
          choice: choice
        });
      }

      if (Choices.findOne({ user:"player1" }) != null) {
        winner = returnWinner(Choices);
        if (winner === -1) {
          document.getElementById("tied").style.visibility="visible";
        }

        if (winner === 0) {
          document.getElementById("rock_wins").style.visibility="visible";
        }

        if (winner === 1) {
          document.getElementById("paper_wins").style.visibility="visible";
        }

        if (winner === 2) {
          document.getElementById("scissors_wins").style.visibility="visible";
        }

        document.getElementById("next_game").style.visibility="visible";
        Choices.remove({ _id:Choices.findOne({ user:"player1" })['_id'] });
        Choices.remove({ _id:Choices.findOne({ user:"player2" })['_id'] });
      } else {
        document.getElementById("waiting").style.visibility="visible";
        hideWinner();
      }
    }
  });

  var returnWinner = function (Choices) {
    choice1 = Choices.findOne({user:"player1"});
    choice1 = convertToNumber(choice1["choice"]);

    choice2 = Choices.findOne({user:"player2"});
    choice2 = convertToNumber(choice2["choice"]);

    //if the players tied, return -1
    if (choice1 === choice2){
      return -1;
    }

    //if player 1 is the winner, return choice1
    if (((choice1 - choice2) ===  1) || 
        ((choice1 - choice2) ===  -2)) {
      return choice1;
    } else { //if player 2 is the winner, return choice2
      return choice2;
    }
  }

  var convertToNumber = function (choice) {
    if (choice === "rock") {
      return 0;
    }

    if (choice === "paper") {
      return 1;
    }

    if (choice === "scissors") {
      return 2;
    }
  }

  var hideWinner = function () {
    document.getElementById("tied").style.visibility="hidden";
    document.getElementById("rock_wins").style.visibility="hidden";
    document.getElementById("paper_wins").style.visibility="hidden";
    document.getElementById("scissors_wins").style.visibility="hidden";
    document.getElementById("next_game").style.visibility="hidden";
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

