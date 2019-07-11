// Tracker.autorun(function(){
//   var postid = Session.get("selectedPost");
// 	if(Meteor.userId()){//if current user is logged in
// 		Router.go("/postpage/postid");//go to /jokes on refresh
// 	}
// });


Template.postpage.rendered = function() {
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



Template.postpage.helpers({
  post: function() {
    var id = Session.get("selectedPost");
    var post = Posts.findOne( {_id: id} );
    return post;
  },
  comments: function(){
    var id = Session.get("selectedPost");
    var comments = Comments.find({chosenPost: id},{sort: {upvoted:-1, downvoted:1}});
    return comments;
  }

});


Template.postpage.events({
  "click #testing": function() {
    var id = Session.get("selectedThread");
    console.log(id);
  },

  "click #testcreate": function() {
    console.log(Meteor.userId());
  },

  "click .gotoQn": function() {
    var id = Session.get("selectedPost");
    var qnno = event.target.id;
    var qnid = id+qnno;
    Session.set("selectedQn", qnid);
  },

  "click #upvoteComment" : function(){
    Bert.alert("You Clicked Upvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisComment = Comments.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisUser);
    //console.log(thisComment);
    var commentAuthor = Comments.findOne({_id: this._id}).userId;
    //console.log(commentAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisCommentVotes = Comments.findOne({_id: this._id}, {upvoted: {$in: thisUser}}).upvoted;
    var thisCommentDownvotes = Comments.findOne({_id: this._id}).downvoted;
    //console.log(thisCommentVotes);
    if(thisCommentVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == commentAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{

      if(thisCommentDownvotes.indexOf(thisUser) > -1){
        //current user has downvoted before
        Meteor.call("upvoteComment", thisComment, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointPlusTwo", commentAuthor);
      }else{
        Meteor.call("upvoteComment", thisComment, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointPlusOne", commentAuthor);
      }


      //not in the array, add name to array?
      //Meteor.call("upvoteComment", thisComment, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Upvoted Comment!", "success", "growl-top-right");
    }
  },

  "click #downvoteComment" : function(){
    Bert.alert("You Clicked downvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisComment = Comments.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisQn);
    var commentAuthor = Comments.findOne({_id: this._id}).userId;
    //console.log(qnAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisCommentVotes = Comments.findOne({_id: this._id}, {downvoted: {$in: thisUser}}).downvoted;
    var thisCommentsUpvotes = Comments.findOne({_id: this._id}).upvoted;
    //console.log(thisQnVotes);
    if(thisCommentVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == commentAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{

      if(thisCommentsUpvotes.indexOf(thisUser) > -1){
        Meteor.call("downvoteComment", thisComment, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointMinusTwo", commentAuthor);
      }else{
        Meteor.call("downvoteComment", thisComment, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointMinusOne", commentAuthor);
      }


      //not in the array, add name to array?
      //Meteor.call("downvoteComment", thisComment, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Downvoted Comment!", "success", "growl-top-right");
    }
  },

  "click #upvote" : function(){
    Bert.alert("You Clicked Upvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisPost = Posts.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisPost);
    var postAuthor = Posts.findOne({_id: this._id}).userId;
    //console.log(postAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisPostsVotes = Posts.findOne({_id: this._id}, {upvoted: {$in: thisUser}}).upvoted;
    var thisPostsDownvotes = Posts.findOne({_id: this._id}).downvoted;
    //console.log(thisPostsVotes);
    if(thisPostsVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == postAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{

      if(thisPostsDownvotes.indexOf(thisUser) > -1){
        //current user has downvoted before
        Meteor.call("upvotePost", thisPost, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointPlusTwo", postAuthor);
      }else{
        Meteor.call("upvotePost", thisPost, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointPlusOne", postAuthor);
      }

      //not in the array, add name to array?
      //Meteor.call("upvotePost", thisPost, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Upvoted Post!", "success", "growl-top-right");
    }
  },

  "click #downvote" : function(){
    Bert.alert("You Clicked downvote", "success", "growl-top-right");
    var thisUser = Meteor.userId();
    var thisPost = Posts.findOne({_id: this._id})._id;//the "this" in this._id refers to the object in the current context in this case is current joke
    //console.log(thisPost);
    var postAuthor = Posts.findOne({_id: this._id}).userId;
    //console.log(postAuthor);
    //var Name = Meteor.user().username;
    //console.log(Name);
    var thisPostsVotes = Posts.findOne({_id: this._id}, {downvoted: {$in: thisUser}}).downvoted;
    var thisPostsUpvotes = Posts.findOne({_id: this._id}).upvoted;
    //console.log(thisPostsVotes);
    if(thisPostsVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == postAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{

      if(thisPostsUpvotes.indexOf(thisUser) > -1){
        Meteor.call("downvotePost", thisPost, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointMinusTwo", postAuthor);
      }else{
        Meteor.call("downvotePost", thisPost, thisUser);//method to add voterid to upvoted
        Meteor.call("userPointMinusOne", postAuthor);
      }

      //not in the array, add name to array?
      Meteor.call("downvotePost", thisPost, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Downvoted Post!", "success", "growl-top-right");
    }
  },
});
