Template.profile.rendered = function(){//when Meteor renderes the profile page then...
  $("#profile-link").addClass('selected');//manipulating html classes content
  $("#jokes-link").removeClass('selected');
  $("#rankings-link").removeClass('selected');
  $("#search-link").removeClass('selected');
  $("#login-link").removeClass('selected');

}
Template.profile.helpers({
  email: function(){
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else {
      return Meteor.user().emails[0].address;
    }
  },

  username: function(){
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else {
      return Meteor.user().username;
    }
  },

  realname: function() {
    return Meteor.user().profile.realname;
  },

  bio: function() {
    return Meteor.user().profile.bio;
  },

  points: function(){
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else {
      return Meteor.user().profile.points;
    }
  },

  rank: function(){
    var noob = "noob";
    if(!Meteor.user()){
      Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
      return false;
    }else if(Meteor.user().profile.points < 0) {
      return "Leech";
    }else if(Meteor.user().profile.points == 0) {
      return "New Kid";
    }else if(Meteor.user().profile.points > 0 && Meteor.user().profile.points <= 5) {
      return "Handy Man";
    }else if(Meteor.user().profile.points == 0) {
      return "Answer Prince";
    }else if(Meteor.user().profile.points == 0) {
      return "Lobang King";
    }
  },

  userJokes: function(){
    var username = Meteor.user().username;
    var userId = Meteor.userId();
    var userJokes = Posts.find({userId: userId}, {sort: {createdAt: -1}});//grab all the jokes posted by userId with most recent one on top
    return userJokes;
  },

  userLaughScore: function(){
    return Meteor.user().profile.laughScore;
  },
  userFrownScore: function(){
    return Meteor.user().profile.frownScore;
  },
  userPukeScore: function(){
    return Meteor.user().profile.pukeScore;
  },

  UserImages: function(){
    var username = Meteor.user().username;
    var userId = Meteor.userId();
    var URL = UserImages.findOne({username: username}, {userId: userId});//field-variable {query},{projection} search using username
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

  status: function() {
    if (Meteor.user().profile.reveal == true) {
      return "On";
    } else {
      return "Off";
    }
  },

  og_profile: function() {
    var id = Session.get("selectedProfile");
    var og_profile = Meteor.user().profile.reveal;

    if (og_profile == true) {
      return true;
    } else {
      return false;
    }
  },

  og_anon: function() {
    var og_anon = Meteor.user().profile.anon;

    if (og_anon == true) {
      return true;
    } else {
      return false;
    }
  },

  has_anon: function() {
    return anon = Meteor.user().profile.realname;
  },


});

Template.profile.events({
  "click #delete-joke" : function(){
    Meteor.call("removeJoke", this._id); //to call a method from server side to delete joke with id: _id submitted by userId
    Bert.alert("Your Joke was Deleted", "success", "growl-top-right");
  },

  "submit .edit-profile": function(event){
    var file = $("#profileImage").get(0). files[0];

    if(file){
      fsFile = new FS.File(file);//making a new FS file corresponding with the gridfs package
      ProfileImages.insert(fsFile, function(err, result){
        if(err){
          throw new Meteor.Error(err);
        }else{
          var imageLoc = "/cfs/files/ProfileImages/" + result._id;

          UserImages.insert({
            userId: Meteor.userId(),
            username: Meteor.user().username,
            image: imageLoc,
          });
          Bert.alert("profile update successful", "success", "growl-top-right");
        }
      });
    }
    return false;//prevent submit
  },

  "submit .edit-picture": function(event){
    var file = $("#editImage").get(0). files[0];

    if(file){
      fsFile = new FS.File(file);//making a new FS file corresponding with the gridfs package
      ProfileImages.update(fsFile, function(err, result){
        if(err){
          throw new Meteor.Error(err);
        }else{
          var imageLoc = "/cfs/files/ProfileImages/" + result._id;

          // ProfileImages.update({_id: Meteor.user()._id}, {$set:{"image": imageLoc}});

          UserImages.update({
            userId: Meteor.userId(),
            username: Meteor.user().username,
            image: imageLoc,
          });
          Bert.alert("picture update successful", "success", "growl-top-right");
        }
      });
    }
    return false;//prevent submit
  },

  "click #toggle": function() {
    var user = Meteor.user();

    if (Meteor.user().profile.reveal == true) {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.reveal": false}});
    } else {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.reveal": true}});
    }

    Bert.alert("Public Comments Status Changed", "success", "growl-top-right");
  },

  "click #toggle-anon": function() {
    var user = Meteor.user();

    if (Meteor.user().profile.anon == true) {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.anon": false}});
    } else {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.anon": true}});
    }

    Bert.alert("Anon Setting Changed", "success", "growl-top-right");
  },

});
