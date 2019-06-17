Template.commentForm.rendered = function(){

}

Template.commentForm.events({
  "submit .comment-form": function(){
    event.preventDefault()
    var commentDesc = event.target.commentDesc.value;
    var chosenPost = Session.get("selectedPost");

    if(isNotEmpty(commentDesc) && isNotEmpty(chosenPost)){
      Meteor.call("addComment", commentDesc, chosenPost);//call Meteor server side method to do something with threadName and threadDesc
      event.target.commentDesc.value = "";//clear form after sending it to server side method
      event.target.chosenPost.value = "";



      Bert.alert("Comment Created!", "success", "growl-top-right");

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
