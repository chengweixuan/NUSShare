Template.jokes.rendered = function(){//when Meteor renderes the profile page then...
  }

Template.jokes.helpers({//to retrieve jokes from Jokes database
  posts: function(){
    var posts = Posts.find({},{sort: {createdAt:-1}});
    return posts;
  }
});