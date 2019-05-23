Template.rankings.rendered = function(){//when Meteor renderes the profile page then...
  $("#rankings-link").addClass('selected');//manipulating html classes content
  $("#profile-link").removeClass('selected');
  $("#jokes-link").removeClass('selected');
  $("#search-link").removeClass('selected');
  $("#login-link").removeClass('selected');

}


Template.rankings.helpers({
  laughKing: function(){
    var laughKing = Meteor.users.findOne({},{sort:{"profile.laughScore": -1}});//there can only be one max
    return laughKing
  },

  laughKingPic: function(){
      var laughKing = Meteor.users.findOne({},{sort:{"profile.laughScore": -1}});
      var username = laughKing.username;
      var userId = laughKing.userId;
      var URL = UserImages.findOne({username: username}, {userId: userId});
      return URL;
  },

  frownKing: function(){
    var frownKing = Meteor.users.findOne({},{sort:{"profile.frownScore": -1}});//there can only be one max
    return frownKing
  },

  frownKingPic: function(){
      var frownKing = Meteor.users.findOne({},{sort:{"profile.frownScore": -1}});
      var username = frownKing.username;
      var userId = frownKing.userId;
      var URL = UserImages.findOne({username: username}, {userId: userId});
      return URL;
  },

  pukeKing: function(){
    var pukeKing = Meteor.users.findOne({},{sort:{"profile.pukeScore": -1}});//there can only be one max
    return pukeKing
  },

  pukeKingPic: function(){
      var pukeKing = Meteor.users.findOne({},{sort:{"profile.pukeScore": -1}});
      var username = pukeKing.username;
      var userId = pukeKing.userId;
      var URL = UserImages.findOne({username: username}, {userId: userId});
      return URL;
  },


});
