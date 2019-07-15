Template.postForm.rendered = function(){

}

Template.postForm.events({
  "submit .post-form": function(){
    var postTitle = event.target.postTitle.value;
    var postDesc = event.target.postDesc.value;
    var qnNumber = event.target.qnNumber.value;
    var chosenThread = event.target.chosenThread.value;
    var chosenThreadName = Threads.findOne({_id: chosenThread}, {threadName: 1}).threadName;
    var threadSubers = Threads.findOne({_id: chosenThread}, {subscribers: 1}).subscribers;

    if(isNotEmpty(postTitle) && isNotEmpty(postDesc) && isNotEmpty(qnNumber) && isNotEmpty(chosenThread) && isValidDigit(qnNumber)
  && isTooManyQns(qnNumber)){
      Meteor.call("addPost", postTitle, postDesc, qnNumber, chosenThread, chosenThreadName);//call Meteor server side method to do something with threadName and threadDesc
      event.target.postTitle.value = "";//clear form after sending it to server side method
      event.target.postDesc.value = "";
      event.target.qnNumber.value = "";
      event.target.chosenThread.value = "";
      //console.log(threadSubers);


      Meteor.call("addPostNotif", threadSubers, postTitle, chosenThreadName);

      Bert.alert("Post Created!", "success", "growl-top-right");
      //var curr_post_id = Posts.findOne({}, { sort: { createdAt: -1 }})
      //console.log(curr_post_id);
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

var isTooManyQns = function(value){
  if(value > 0 && value < 21 ){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};



isValidDigit = function(value) {
	var filter = /^[0-9]+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid email address", "danger", "growl-top-right");
	return false;
};
