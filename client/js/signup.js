Template.signup.rendered = function(){
}

Template.signup.events({
  "submit .form-signup": function(event){ //"sumbit" button pressed to submit .form-signup
    var username =trimInput(event.target.username.value);
    var email =trimInput(event.target.email.value);//event.target.for....value
    var password =trimInput(event.target.password.value);
    var password2 =trimInput(event.target.password2.value);

    if(isNotEmpty(email) && isNotEmpty(username) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, password2)){
      Accounts.createUser({
        username: username,
        email: email,
        password: password,
        profile:{
          laughScore: 0,
          frownScore: 0,
          pukeScore: 0,
          upvoted: [],
          downvoted: [],
          subscriptions: [],
          points: 0,
          notifications: [],
        }
      }, function(err){
        if(err){
          Bert.alert(err.reason, "danger", " growl-top-right");
        }else{
          Bert.alert("Account Created! You are now logged in", "success", "growl-top-right");
          Router.go("/jokes");
        }
      });
    }
    return false;//prevent submit of the form
    //alert("form submitted");
    //return false;
  }
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
