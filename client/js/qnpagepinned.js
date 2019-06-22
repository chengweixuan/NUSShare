Template.qnpagepinned.rendered = function() {

}

Template.qnpagepinned.events({
  "submit .qnpagepinned-form": function() {
    event.preventDefault();
    var qnDesc = event.target.pinDesc.value;
    var chosenQn = Session.get("selectedQn");

    if(isNotEmpty(qnDesc) && isNotEmpty(chosenQn)){
      Meteor.call("addQnPinned", qnDesc, chosenQn);//call Meteor server side method to do something with threadName and threadDesc
      event.target.qnDesc.value = "";//clear form after sending it to server side method with stuff
      event.target.chosenQn.value = "";
      Bert.alert("Added Query!", "success", "growl-top-right");
    }else{
      Bert.alert("something went wrong", "danger", "growl-top-right");
    }

    return false;
  }
});


var isNotEmpty = function(value){
  if(value && value !==''){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};
