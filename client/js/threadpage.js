Template.threadpage.rendered = function() {

}

Template.threadpage.helpers({
  posts: function() {
    var id = Session.get("selectedThread");
    var posts = Posts.find({chosenThread: id},{sort: {upvoted:-1, downvoted:1}});
    return posts;
  },

  single_thread: function() {
    var id = Session.get("selectedThread");
    var single_thread = Threads.findOne( {_id: id } );
    return single_thread;
  },
});


Template.threadpage.events({
  "click #testing": function() {
    var id = Session.get("selectedThread");
    console.log(id);
  },

  "click #redirect": function() {
    Session.set("selectedPost", this._id);
  },

  "click #upvoteThread" : function(){
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
      //method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Meteor.call("updateRankUpvote", postAuthor);
      var int=setInterval('check()', 500);
      Bert.alert("Upvoted Post!", "success", "growl-top-right");
    }
  },

  "click #downvoteThread" : function(){
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
      //method to add voterid to upvoted
      // Meteor.call("profileUpvotes", jokeAuthor);//add post id to upvoted posts in profile
      // Meteor.call("upvoteCount", thisUser, thisJoke);//update upvote count to be displayed on the post
      Meteor.call("updateRankDownvote", postAuthor);
      var int=setInterval('check()', 500);
      Bert.alert("Downvoted Post!", "success", "growl-top-right");
    }
  },

  "click #profile_direct": function(){
    Session.set("selectedProfile", this.userId);
  },

  "click #subThread" : function(){
		//Bert.alert("You Clicked Subscribe", "success", "growl-top-right");
		var thisUser = Meteor.userId();
    //console.log(thisUser);
		var thisThread = this._id;//the "this" in this._id refers to the object in the current context in this case is current joke
		//console.log(thisThread);
		var Name = Meteor.user().username;
		//console.log(Name);
		var thisThreadsSubs = Threads.findOne({_id: this._id}, {subscribers: {$in: thisUser}}).subscribers;
		//console.log(thisThreadsSubs);
		if(thisThreadsSubs.indexOf(thisUser) > -1){
			Bert.alert("You Are Already Subscribed", "danger", "growl-top-right");
			// In the array!, means user has voted
		}else{
			//not in the array, add name to array?
			Meteor.call("countSub", thisThread, thisUser);
			Meteor.call("profileSubs",thisUser, thisThread);
			Bert.alert("You Subscribed to the Thread", "success", "growl-top-right");
		}

		if(Name == thisThreadsSubs){
			Bert.alert("you cannot subscribe to your own thread", " danger" ,"growl-top-right");
		}
	},

  "click #unsubThread" : function(){
		//Bert.alert("You Clicked Subscribe", "success", "growl-top-right");
		var thisUser = Meteor.userId();
    console.log(thisUser);
		var thisThread = this._id;//the "this" in this._id refers to the object in the current context in this case is current joke
		console.log(thisThread);
		var Name = Meteor.user().username;
		console.log(Name);
		var thisThreadsSubs = Threads.findOne({_id: this._id}, {subscribers: {$in: thisUser}}).subscribers;
		console.log(thisThreadsSubs);
		if(thisThreadsSubs.indexOf(thisUser) > -1){
			//Bert.alert("You Are Already Subscribed", "danger", "growl-top-right");
			// In the array!, means user has voted
      Meteor.call("countUnSub", thisThread, thisUser);
      Meteor.call("profileUnSubs", thisUser, thisThread);
      Bert.alert("You Unsubscribed to the Thread", "success", "growl-top-right");
		}else{
			//not in the array, add name to array?
			//Meteor.call("countSub", thisThread, thisUser);
			//Meteor.call("profileSubs",thisUser, thisThread);
			Bert.alert("You are not Subscribed to the Thread", "danger", "growl-top-right");
		}

		if(Name == thisThreadsSubs){
			Bert.alert("you cannot subscribe to your own thread", " danger" ,"growl-top-right");
		}
	},
});
