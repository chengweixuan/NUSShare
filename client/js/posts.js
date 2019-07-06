Template.jokes.rendered = function(){//when Meteor renderes the profile page then...
  }

Template.jokes.helpers({//to retrieve jokes from Jokes database
  posts: function(){
    var subbedthreads = Meteor.user().profile.subscriptions;

    var posts = Posts.find({chosenThread:{$in: subbedthreads}},{sort: {upvoted:-1, downvoted:1}});
    return posts;
  },
  subscriptions: function(){
    var subbedthreads = Meteor.user().profile.subscriptions;
    var subscriptions = Threads.find({_id: {$in: subbedthreads}},{sort: {createdAt:-1}});
    return subscriptions;
  },


});

Template.jokes.events({
  'click': function() {
    Session.set("selectedThread", this._id);
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
    //console.log(thisPostsVotes);
    if(thisPostsVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == postAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{
      //not in the array, add name to array?
      Meteor.call("upvotePost", thisPost, thisUser);//method to add voterid to upvoted
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
    //console.log(thisPostsVotes);
    if(thisPostsVotes.indexOf(thisUser) > -1){
      Bert.alert("you cannot vote twice", "danger", "growl-top-right");
      // In the array!, means user has voted
    }else if(thisUser == postAuthor){
      Bert.alert("you cannot vote for your own post", " danger" ,"growl-top-right");
    }else{
      //not in the array, add name to array?
      Meteor.call("downvotePost", thisPost, thisUser);//method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Bert.alert("Downvoted Post!", "success", "growl-top-right");
    }
  },
});
