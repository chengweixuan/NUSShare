// Tracker.autorun(function(){
//   var postid = Session.get("selectedPost");
// 	if(Meteor.userId()){//if current user is logged in
// 		Router.go("/postpage/postid");//go to /jokes on refresh
// 	}
// });


Template.postpage.rendered = function() {

}



Template.postpage.helpers({
  post: function() {
    var id = Session.get("selectedPost");
    var post = Posts.findOne( {_id: id} );
    return post;
  },
  comments: function(){
    var id = Session.get("selectedPost");
    var comments = Comments.find({chosenPost: id},{sort: {createdAt:-1}});
    return comments;
  }

});


Template.postpage.events({
  "click #testing": function() {
    var id = Session.get("selectedThread");
    console.log(id);
  },
});
