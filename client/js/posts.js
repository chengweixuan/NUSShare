Template.jokes.rendered = function(){//when Meteor renderes the profile page then...
  }

Template.jokes.helpers({//to retrieve jokes from Jokes database
  posts: function(){
    var subbedthreads = Meteor.user().profile.subscriptions;
    var posts = Posts.find({chosenThread:{$in: subbedthreads}},{sort: {createdAt:-1}});
    return posts;
  },
  subscriptions: function(){
    var subbedthreads = Meteor.user().profile.subscriptions;
    var subscriptions = Threads.find({_id: {$in: subbedthreads}},{sort: {createdAt:-1}});
    return subscriptions;
  }
});

Template.jokes.events({
  'click': function() {
    Session.set("selectedThread", this._id);
  },
});
