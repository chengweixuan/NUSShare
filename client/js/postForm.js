Template.postForm.rendered = function(){

}

Template.postForm.events({
  "submit .post-form": function(){
    var postTitle = event.target.postTitle.value;
    var postDesc = event.target.postDesc.value;
    var qnNumber = event.target.qnNumber.value;
    var chosenThread = event.target.chosenThread.value;
    var chosenThreadName = Threads.findOne({_id: chosenThread}, {threadName: 1}).threadName;
    var templink = event.target.PDFlink.value;
    var PDFlink = "";

    if (isNotEmpty(templink) && templink[25] == 'f') {
      console.log("is share link");
      PDFlink = templink.slice(0, 66) + "preview";
      console.log(PDFlink);

    } else if (isNotEmpty(templink) && templink[25] == 'o') {
      console.log("is sharable link");
      PDFlink = "https://drive.google.com/file/d/" + templink.slice(33, 67) + "/preview";
      console.log(PDFlink);
    }

    if(isNotEmpty(postTitle) && isNotEmpty(postDesc) && isNotEmpty(qnNumber) && isNotEmpty(chosenThread)){
      Meteor.call("addPost", postTitle, postDesc, qnNumber, chosenThread, chosenThreadName, PDFlink);//call Meteor server side method to do something with threadName and threadDesc
      event.target.postTitle.value = "";//clear form after sending it to server side method
      event.target.postDesc.value = "";
      event.target.qnNumber.value = "";
      event.target.chosenThread.value = "";
      event.target.PDFlink.value = "";


      Bert.alert("Post Created!", "success", "growl-top-right");

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
