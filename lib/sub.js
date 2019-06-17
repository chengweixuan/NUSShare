//declare subscription methods for meteor/mongodb
if(Meteor.isClient){
  Meteor.subscribe("Jokes");
  Meteor.subscribe("Users");
  Meteor.subscribe("ProfileImages");
  Meteor.subscribe("UserImages");
  Meteor.subscribe("Threads");
  Meteor.subscribe("Posts");
  Meteor.subscribe("Comments");
}
