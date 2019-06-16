Template.jokes.rendered = function(){//when Meteor renderes the profile page then...
  $("#jokes-link").addClass('selected');//manipulating html classes content
  $("#profile-link").removeClass('selected');
  $("#rankings-link").removeClass('selected');
  $("#search-link").removeClass('selected');
  $("#login-link").removeClass('selected');
  }

Template.jokes.helpers({//to retrieve jokes from Jokes database
  jokes: function(){
    var jokes = Jokes.find({},{sort: {createdAt:-1}});
    return jokes;
  }
});


Template.jokes.events({
  /*"click #laugh" : function(){
    Bert.alert("you clicked laugh", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisJoke = Jokes.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisJoke);
    var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
    var Name = Meteor.user().username;
    var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;
    //console.log(thisJokesVotes);
    if(thisJokesVotes.indexOf(Name) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else{
      //not in the array, add name to array?
      Meteor.call("countVote", thisJoke, Name);//method to add name to votees
      Meteor.call("userPointLaugh", jokeAuthor);
      Meteor.call("laughVote", thisUser, thisJoke);
      Bert.alert("your vote was placed!", "success", "growl-top-right");
    }

    if(Name == thisJokesVotes){
      Bert.alert("you cannot vote for your own joke", " danger" ,"growl-top-right");
    }
  },

  "click #frown" : function(){
    Bert.alert("you clicked frown", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisJoke = Jokes.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisJoke);
    var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
    var Name = Meteor.user().username;
    var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;
    //console.log(thisJokesVotes);
    if(thisJokesVotes.indexOf(Name) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else{
      //not in the array, add name to array?
      Meteor.call("countVote", thisJoke, Name);//method to add name to votees
      Meteor.call("userPointFrown", jokeAuthor);
      Meteor.call("frownVote", thisUser, thisJoke);
      Bert.alert("your vote was placed!", "success", "growl-top-right");
    }

    if(Name == thisJokesVotes){
      Bert.alert("you cannot vote for your own joke", " danger" ,"growl-top-right");
    }
  },

  "click #puke" : function(){
    Bert.alert("you clicked puke", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisJoke = Jokes.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisJoke);
    var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
    var Name = Meteor.user().username;
    var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;
    //console.log(thisJokesVotes);
    if(thisJokesVotes.indexOf(Name) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else{
      //not in the array, add name to array?
      Meteor.call("countVote", thisJoke, Name);//method to add name to votees
      Meteor.call("userPointPuke", jokeAuthor);
      Meteor.call("pukeVote", thisUser, thisJoke);
      Bert.alert("your vote was placed!", "success", "growl-top-right");
    }

    if(Name == thisJokesVotes){
      Bert.alert("you cannot vote for your own joke", " danger" ,"growl-top-right");
    }

  },*/

  "click #redirect": function() {
    Session.set("selectedPost", this._id);
  },

});
