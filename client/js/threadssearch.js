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
	}
});
