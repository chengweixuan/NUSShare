Template.threadpage.rendered = function() {

}

Template.threadpage.helpers({
  posts: function() {
    var id = Session.get("selectedThread");
    var posts = Posts.find({chosenThread: id},{sort: {createdAt: -1}});
    return posts;
  },
});
