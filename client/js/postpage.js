Template.postpage.rendered = function() {

}

Template.postpage.helpers({
  post: function() {
    var id = Session.get("selectedPost");
    var post = Posts.findOne( {_id: id} );
    return post;
  },

});


Template.postpage.events({
  "click #testing": function() {
    var id = Session.get("selectedThread");
    console.log(id);
  },
});
