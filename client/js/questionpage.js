// Tracker.autorun(function(){
//   var postid = Session.get("selectedPost");
// 	if(Meteor.userId()){//if current user is logged in
// 		Router.go("/postpage/postid");//go to /jokes on refresh
// 	}
// });


Template.questionpage.rendered = function() {
  var id = Session.get("selectedPost");
  var qnnum = Posts.findOne( {_id: id} ).qnNumber;
  for(i = 0; i<qnnum; i++){
    var anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-green gotoQn');
    var qnLink = "/questionpage/" + id + (i+1);
    anchor.setAttribute('href', qnLink);
    anchor.innerHTML = "question " + (i+1) + "<br>";
    anchor.setAttribute('id', (i+1));
    document.getElementById("postsrc").appendChild(anchor);
  }
}



Template.questionpage.helpers({
  questions: function(){
    var id = Session.get("selectedQn");
    var questions = Questions.find({chosenQn: id},{sort: {upvoted:-1, downvoted:1}});
    return questions;
  },

  og_post: function() {
    var id = Session.get("selectedPost");
    var og_post = Posts.findOne( {_id: id} );
    var author = og_post.author;
    var which_ques = Session.get("selectedQn");
    if (author == Meteor.user().username) { // only appears of its the orginal poster
      return og_post;
    } else {
      return false;
    }
  },

  pins: function() {
    var id = Session.get("selectedQn");
    var pins = Pinned.find({chosenQn: id},{sort: {createdAt:-1}});
    return pins;
  },

});


Template.questionpage.events({

  //"click #test": function() {
    //test block
    // var id = Session.get("selectedQn");
    // var test = Pinned.find({chosenQn: id});
    // console.log(Session.get("selectedQn"));
    // console.log(test.stats());

    // return false;
  //},

  "click #upvoteQn" : function(){
    Bert.alert("You Clicked Upvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisQn = Questions.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisUser);
    //console.log(thisQn);
    var qnAuthor = Questions.findOne({_id: this._id}).userId;
    //console.log(qnAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisQnVotes = Questions.findOne({_id: this._id}, {upvoted: {$in: thisUser}}).upvoted;
    //console.log(thisQnVotes);
    if(thisQnVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == qnAuthor){
      Bert.alert("you cannot vote for your own joke", " danger" ,"growl-top-right");
    }else{
      //not in the array, add name to array?
      Meteor.call("upvoteQn", thisQn, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Upvoted Comment!", "success", "growl-top-right");
    }
  },

  "click #downvoteQn" : function(){
    Bert.alert("You Clicked downvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisQn = Questions.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisQn);
    var qnAuthor = Questions.findOne({_id: this._id}).userId;
    //console.log(qnAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisQnVotes = Questions.findOne({_id: this._id}, {downvoted: {$in: thisUser}}).downvoted;
    //console.log(thisQnVotes);
    if(thisQnVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == qnAuthor){
      Bert.alert("you cannot vote for your own joke", " danger" ,"growl-top-right");
    }else{
      //not in the array, add name to array?
      Meteor.call("downvoteQn", thisQn, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Downvoted Post!", "success", "growl-top-right");
    }
  },

});
