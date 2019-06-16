Template.threadpage.rendered = function() {

}

Template.threadpage.helpers({
  posts: function() {
    var id = Session.get("selectedThread");
    var posts = Posts.find({chosenThread: id},{sort: {createdAt: -1}});
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
  }

});
