// Tracker.autorun(function(){
//   var postid = Session.get("selectedPost");
// 	if(Meteor.userId()){//if current user is logged in
// 		Router.go("/postpage/postid");//go to /jokes on refresh
// 	}
// });


Template.postpage.rendered = function() {
  var id = Session.get("selectedPost");
  var qnnum = Posts.findOne( {_id: id} ).qnNumber;
  for(i = 0; i<qnnum; i++){
    var anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-green');
    var qnLink = "/questionpage/id" + (i+1);
    anchor.setAttribute('href', qnLink);
    anchor.innerHTML = "question " + (i+1) + "<br>";
    document.getElementById("postsrc").appendChild(anchor);
  }
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

  "click #testcreate": function() {
    var anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-green');
    anchor.setAttribute('href', '/rankings');
    anchor.innerHTML = "question here";
    document.getElementById("postsrc").appendChild(anchor);
  },
});
