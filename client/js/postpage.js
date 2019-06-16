Template.postpage.rendered = function() {

}


Template.postpage.events({
  "click #testing": function() {
    var id = Session.get("selectedThread");
    console.log(id);
  },
});
