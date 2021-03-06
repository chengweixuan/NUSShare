Template.threadForm.rendered = function(){

}

Template.threadForm.events({
  "submit .thread-form": function(){
    var threadName = event.target.threadName.value;
    var threadDesc = event.target.threadDesc.value;

    if(isNotEmpty(threadName) && isNotEmpty(threadDesc)){
      if(Threads.findOne({threadName: threadName}) == null){
        Meteor.call("addThread", threadName, threadDesc);//call Meteor server side method to do something with threadName and threadDesc
        event.target.threadName.value = "";//clear form after sending it to server side method
        event.target.threadDesc.value = "";

        Bert.alert("Your Thread Was Created!", "success", "growl-top-right");

      }else{
        Bert.alert("This is a Duplicate Thread", "danger", "growl-top-right");
      }


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
