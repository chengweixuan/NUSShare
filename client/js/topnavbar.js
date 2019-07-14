Template.topnavbar.rendered = function(){

}

Template.topnavbar.events({
  "click .logout" : function(event){
    Meteor.logout(function(err){
      if(err){
        Bert.alert(err.reason, "danger", "growl-top-right");
      }else{
        Router.go("/");
        Bert.alert("you are now logged out", "success", "growl-top-right");
      }
    });
  },

  'click .clearNotifications': function() {
    //console.log("clear");
    Meteor.users.update(Meteor.userId(),{$set : {"profile.notifications": []}});
    Bert.alert("Notifications Cleared", "success", "growl-top-right");
  },

});

Template.topnavbar.helpers({//to retrieve jokes from Jokes database
  notifications_00: function(){
    var all_noti = Meteor.user().profile.notifications;
      return all_noti[0][0];
  },

  notifications_01: function(){
    var all_noti = Meteor.user().profile.notifications;
      return all_noti[0][1];
  },

  notifications_10: function(){
    var all_noti = Meteor.user().profile.notifications;
      return all_noti[1][0];
  },

  notifications_11: function(){
    var all_noti = Meteor.user().profile.notifications;
      return all_noti[1][1];
  },

  notifications: function(){
    var notifications = Meteor.user().profile.notifications;
    var noti_size = notifications.length;
    if(noti_size > 0){
      return true;
    }else{
      return false;
    }
  },
});
