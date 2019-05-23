Template.jokeForm.rendered = function(){

}

Template.jokeForm.events({
  "submit .joke-post": function(){
    var jokeName = event.target.jokeName.value;
    var jokePost = event.target.jokePost.value;

    if(isNotEmpty(jokeName) && isNotEmpty(jokePost)){
      Meteor.call("addJokes", jokeName, jokePost);//call Meteor server side method to do something with jokeName and jokePost
      event.target.jokeName.value = "";//clear form after sending it to server side method
      event.target.jokePost.value = "";

      Bert.alert("your joke was posted!", "success", "growl-top-right");

    }else{
      Bert.alert("something went wrong", "danger", "growl-top-right");
    }
    return false;
  }
});
//validation Rules
var isNotEmpty = function(value){
  if(value && value !==''){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};
