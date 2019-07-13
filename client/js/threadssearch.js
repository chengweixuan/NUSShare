Template.threadsearch.rendered = function() {
	$("#search-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.threadsearch.helpers({
	inputAttributes: function() {
		return { 'class': 'easy-search-input', 'placeholder': 'Start Searching' };
	},
	players: function() {
		return Threads.find({}, { sort: { createdAt: -1 } });
	},
	selectedName: function() {
		var thread = ThreadsIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedThread") });
		return thread && thread.threadName;
	},
	index: function () {
		return ThreadsIndex;
	},
	resultsCount: function() {
		return ThreadsIndex.getComponentDict().get('count');
	},
	showMore: function() {
		return false;
	},

	renderTmpl: () => Template.renderTemplate

});

Template.threadUser.helpers({
	selected: function() {
		return Session.equals("selectedThread", this.__originalId) ? "selected" : '';
	},
});

Template.threadUser.events({
	'click': function() {
		Session.set("selectedThread", this.__originalId);
	},

	"click #subThread" : function(){
		//Bert.alert("You Clicked Subscribe", "success", "growl-top-right");
		var thisUser = Meteor.userId();

		//console.log(subbedthreads);
		var thisThread = this.__originalId;//the "this" in this._id refers to the object in the current context in this case is current joke
		//console.log(thisThread);
		var Name = Meteor.user().username;
		//console.log(Name);
		var thisThreadsSubs = Threads.findOne({_id: this.__originalId}, {subscribers: {$in: Name}}).subscribers;
		//console.log(thisThreadsSubs);
		if(thisThreadsSubs.indexOf(Name) > -1){
			Bert.alert("You Are Already Subscribed", "danger", "growl-top-right");
			// In the array!, means user has voted
		}else{
			//not in the array, add name to array?
			Meteor.call("countSub", thisThread, Name);
			Meteor.call("profileSubs",thisUser, thisThread);
			Bert.alert("You Subscribed to the Thread", "success", "growl-top-right");
		}

		if(Name == thisThreadsSubs){
			Bert.alert("you cannot subscribe to your own thread", " danger" ,"growl-top-right");
		}
	},

	"click #profile_direct": function(){
    Session.set("selectedProfile", this.userId);
  },
	
});
