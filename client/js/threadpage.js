Template.threadpage.rendered = function() {

}

Template.threadpage.helpers({
  all_post: function() {
    var id = Session.get("selectedThread");
    var posts = Posts.find({chosenThread:{$in: id}},{sort: {createdAt: -1}});
    return posts;
  },
});
