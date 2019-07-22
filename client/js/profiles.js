Template.profiles.rendered = function(){//when Meteor renderes the profile page then...
  $("#profile-link").addClass('selected');//manipulating html classes content
  $("#jokes-link").removeClass('selected');
  $("#rankings-link").removeClass('selected');
  $("#search-link").removeClass('selected');
  $("#login-link").removeClass('selected');

}

Template.profiles.helpers({
  email: function() {
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else {
      var id = Session.get("selectedProfile");
      return Meteor.users.findOne({_id: id}).emails[0].address;
    }
  },

  username: function(){
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else {
      var id = Session.get("selectedProfile");
      return Meteor.users.findOne({_id: id}).username;
    }
  },

  realname: function() {
    var id = Session.get("selectedProfile");
    return Meteor.users.findOne({_id: id}).profile.realname;
  },

  bio: function() {
    var id = Session.get("selectedProfile");
    return Meteor.users.findOne({_id: id}).profile.bio;
  },

  userJokes: function(){
    var userId = Session.get("selectedProfile");
    var userJokes = Posts.find({userId: userId}, {sort: {createdAt: -1}});//grab all the jokes posted by userId with most recent one on top
    return userJokes;
  },

  UserImages: function(){
    var id = Session.get("selectedProfile");
    var username = Meteor.users.findOne({_id: id}).username;
    var URL = UserImages.findOne({username: username}, {userId: id});//field-variable
    return URL;
  },

  testImage: function() {
    Meteor.call('getPicture', null, (err, picture) => {
      if (err) {
        console.log(err);
      } else {
        console.log(picture);
      }
    });
  },

  og_profile: function() {
    var id = Session.get("selectedProfile");
    var og_profile = Meteor.users.findOne({_id: id}).profile.reveal;

    if (og_profile == true) {
      return true;
    } else {
      return false;
    }
  },

  yourProfile: function() {
    var id = Session.get("selectedProfile");

    if (id == Meteor.user()._id) {
      return true;
    } else {
      return false;
    }
  },

});

Template.profiles.events({


});
