Template.edit.rendered = function(){

}

Template.edit.events({
  "submit .form-signup": function() {
    event.preventDefault();
    var username = trimInput(event.target.username.value);
    var realname = trimInput(event.target.realname.value);
    var bio = trimInput(event.target.bio.value);

    var password = trimInput(event.target.password.value);
    var password2 = trimInput(event.target.password2.value);
    var newpassword = trimInput(event.target.newpassword.value);

    var user = Meteor.user();
    var alert = "Profile Edited!\n"

    if (isNotEmpty(username)) {
      Meteor.call("changeUsername", username);
      Meteor.call("updateUsername", username);
      alert += "Username Changed!\n";
    }

    if (isNotEmpty(realname)) {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.realname": realname}});
      alert += "Real Name Added!\n";
    }

    if (isNotEmpty(bio)) {
      Meteor.users.update( {_id: user._id}, {$set:{"profile.bio": bio}});
      alert += "Bio Updated!\n";
    }

    if (isValidPassword(password) && isNotEmpty(password) && isNotEmpty(password2) && areValidPasswords(password, password2) && isNotEmpty(newpassword)) {
      Accounts.changePassword(password, newpassword);
      alert += "Password Changed!\n";
    }

    Bert.alert(alert, "success", "growl-top-right");
    Router.go("/profile");
  },

  "click #testing": function() {
    var username = "gaydude";
    console.log("console testing");
    Meteor.call("updateUsername", username);
  },


});

//Validation Rules

//Trim Helper
var trimInput = function(val){
  return val.replace(/^\s*$/g, "");
};

var isNotEmpty = function(value){
  if(value && value !==''){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};
//vallidate email
isEmail = function(value){
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(filter.test(value)){
    return true;
  }
  Bert.alert("Please use a valid email address", "danger", "growl-top-right");
  return false;
};
//check password field
isValidPassword = function(password){
  if(password.length < 6){
    Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
    return false;
  }
  return true;
};
//match password
areValidPasswords = function(password, confirm){
  if(!isValidPassword(password)){
    return false;
  }
  if(password !== confirm){
    Bert.alert("Passwords do not match", "danger", "growl-top-right");
    return false;
  }
  return true;
};
