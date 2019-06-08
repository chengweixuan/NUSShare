Template.postForm.rendered = function(){//when Meteor renderes the profile page then...
  }

Template.postForm.helpers({//to retrieve jokes from Jokes database
  threads: function(){
    var threads = Threads.find({},{sort: {createdAt:-1}});
    return threads;
  }
});
