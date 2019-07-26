Template.profilecomment.rendered = function() {

}

Template.profilecomment.helpers({
  comments: function() {
    var id = Session.get("selectedProfile");
    var comments = ProfileComments.find({chosenPro: id}, {sort: {createdAt: -1}});
    return comments;
  },
});

Template.profilecomment.events({
  "submit .profilecomment-form": function() {
    event.preventDefault();
    var proDesc = event.target.proDesc.value;
    var chosenProfile = Session.get("selectedProfile");

    if (isNotEmpty(proDesc) && isNotEmpty(chosenProfile)) {
      Meteor.call("addProComment", proDesc, chosenProfile);
      event.target.proDesc.value = "";
      event.target.chosenProfile.value = "";
    }

  },

  "click #profile_direct": function(){
    Session.set("selectedProfile", this.userId);
  },



});


var isNotEmpty = function(value){
  if(value && value !==''){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};
