Template.jokes.rendered = function(){//when Meteor renderes the profile page then...
  }

Template.jokes.helpers({//to retrieve jokes from Jokes database
  posts: function(){
    var subbedthreads = Meteor.user().profile.subscriptions;
    var posts = Posts.find({chosenThread:{$in: subbedthreads}},{sort: {createdAt:-1}});
    return posts;

  }
});
