//Keep track of the scores
Swimmers = new Meteor.Collection("swim");
var updateLeft_dep = new Deps.Dependency();
var updateRight_dep = new Deps.Dependency();
var randleft;
var randright;
var dbSize = 4;

//Handle voteTemplate events (namely voting)
Template.voteboothTemplate.events({
	'click .leftside': function (e, template) {
		
		Meteor.call("updateSwimmer",
			Session.get("left"),
			Session.get("right"),
			function(err, result) {
				if(err) {
					alert('could not count vote' + err.reason);
				}
			}
		);

		// //Update first person
		// var percent = Math.floor((Session.get("left").picks + 1) / (Session.get("left").total + 1) * 100);
		// Swimmers.update(Session.get("left")._id, {$inc: {total: 1, picks: 1}, $set: {score: percent}});

		// //Update other person
		// var prct = Math.floor(Session.get("right").picks / (Session.get("right").total + 1) * 100);
		// Swimmers.update(Session.get("right")._id, {$inc: {total: 1}, $set: {score: prct}});

		updateRight_dep.changed();
	},

	'click .rightside': function (e, template) {

		Meteor.call("updateSwimmer",
			Session.get("right"),
			Session.get("left"),
			function(err, result) {
				if(err) {
					alert('could not count vote' + err.reason);
				}
			}
		);

		// //Update first person
		// var percent = Math.floor((Session.get("right").picks + 1) / (Session.get("right").total + 1) * 100);
		// Swimmers.update(Session.get("right")._id, {$inc: {total: 1, picks: 1}, $set: {score: percent}});

		// //Update other person
		// var prct = Math.floor(Session.get("left").picks / (Session.get("left").total + 1) * 100);
		// Swimmers.update(Session.get("left")._id, {$inc: {total: 1}, $set: {score: prct}});
		
		updateLeft_dep.changed();
	},

	'click #logout': function(event) {
		event.preventDefault();
    	Meteor.logout(function(error) {
      		if (error) {
        	// Display the logout error to the user however you want
      		}
    	});
	}

});

Template.voteboothTemplate.helpers({
	
	GetLeftPerson: function() {
		updateLeft_dep.depend();
		randleft = (Math.floor(Math.random() * dbSize) + 1);
		while(randleft == randright)
		{
			randleft = (Math.floor(Math.random() * dbSize) + 1);
		}
		var lft = Swimmers.findOne({num: randleft});
		Session.set("left", lft);
		return lft;
	},

	GetRightPerson: function() {
		updateRight_dep.depend();
		randright = (Math.floor(Math.random() * dbSize) + 1);
		while(randright == randleft)
		{
			randright = (Math.floor(Math.random() * dbSize) + 1);
		}
		var rgt = Swimmers.findOne({num: randright});
		Session.set("right", rgt);
		return rgt;
		
	}
	
});


Template.LeaderboardTemplate.helpers({
	GetSwimmers: function() {
		// return Swimmers.findOne({}, {sort: {score: -1}});
	},

	GetFirst: function() {
		var TopList = Swimmers.find({}, {sort: {score: -1}, limit: 27});
		console.log("Here: " + TopList);
		var rank=1;
		TopList.forEach(function (swimmer) {
			//console.log("HELLO");
			//console.log(swimmer.name);
			Swimmers.update(Swimmers.findOne({name: swimmer.name})._id, {$set: {lstrnk: rank}});
			rank++;
			//console.log(Swimmers.findOne({name: swimmer.name}));
		});
		return TopList;
		//return Swimmers.find({}, {sort: {score: -1}, limit: 10});
	},

	GetTableLeft: function() {
		var TopList = Swimmers.find({}, {sort: {score: -1}, limit: 12});
		var rank=1;
		TopList.forEach(function (swimmer) {
			Swimmers.update(Swimmers.findOne({name: swimmer.name})._id, {$set: {lstrnk: rank}});
			rank++;
		});
		return TopList;
	},

	GetTableRight: function() {
		var TopList = Swimmers.find({}, {sort: {score: -1}, skip: 12});
		var rank=13;
		TopList.forEach(function (swimmer) {
			Swimmers.update(Swimmers.findOne({name: swimmer.name})._id, {$set: {lstrnk: rank}});
			rank++;
		});
		return TopList;
	}

});

Template.LeaderboardTemplate.events({
	'click #logout': function(event) {
		event.preventDefault();
    	Meteor.logout(function(error) {
      		if (error) {
        	// Display the logout error to the user however you want
      		}
    	});
	}
});	

Template.aboutTemplate.events({
	'submit form': function (e, t) {
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		var pass = $("#pwrd").val();

	    Meteor.loginWithPassword(
	      'fruity',
	       pass,
	      function(error) {
	        if (error) {
	        	alert("Incorrect Password");
	          // Display the login error to the user however you want
	       	}
      	   }
      	   );
		
	}
});


