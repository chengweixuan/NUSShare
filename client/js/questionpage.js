// Tracker.autorun(function(){
//   var postid = Session.get("selectedPost");
// 	if(Meteor.userId()){//if current user is logged in
// 		Router.go("/postpage/postid");//go to /jokes on refresh
// 	}
// });


Template.questionpage.rendered = function() {
  var id = Session.get("selectedPost");
  var qnnum = Posts.findOne( {_id: id} ).qnNumber;
  for(i = 0; i<qnnum; i++){
    var anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-green gotoQn');
    var qnLink = "/questionpage/" + id + (i+1);
    anchor.setAttribute('href', qnLink);
    anchor.innerHTML = "question " + (i+1) + "<br>";
    anchor.setAttribute('id', (i+1));
    document.getElementById("postsrc").appendChild(anchor);
  }
}



Template.questionpage.helpers({
  questions: function(){
    var id = Session.get("selectedQn");
    var questions = Questions.find({chosenQn: id},{sort: {createdAt:-1}});
    return questions;
  },

  og_post: function() {
    var id = Session.get("selectedPost");
    var og_post = Posts.findOne( {_id: id} );
    var author = og_post.author;
    var which_ques = Session.get("selectedQn");
    if (author == Meteor.user().username) { // only appears of its the orginal poster
      return og_post;
    } else {
      return false;
    }
  },

  pins: function() {
    var id = Session.get("selectedQn");
    var pins = Pinned.find({chosenQn: id},{sort: {createdAt:-1}});
    return pins;
  },

});


Template.questionpage.events({

  //"click #test": function() {
    //test block
    // var id = Session.get("selectedQn");
    // var test = Pinned.find({chosenQn: id});
    // console.log(Session.get("selectedQn"));
    // console.log(test.stats());

    // return false;
  //},

});
