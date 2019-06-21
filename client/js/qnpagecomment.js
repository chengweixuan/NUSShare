Template.qnpagecomment.rendered = function(){

}

Template.qnpagecomment.events({
  "submit .qnpagecomment-form": function(){
    event.preventDefault();
    var qnDesc = event.target.qnDesc.value;
    var chosenQn = Session.get("selectedQn");
    var posterId = Session.get("selectedPost");
    var poster = Posts.findOne( {_id: posterId} ).author;

    if(isNotEmpty(qnDesc) && isNotEmpty(chosenQn)){
      Meteor.call("addQnComment", qnDesc, chosenQn, poster);//call Meteor server side method to do something with threadName and threadDesc
      event.target.qnDesc.value = "";//clear form after sending it to server side method
      event.target.chosenQn.value = "";
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
