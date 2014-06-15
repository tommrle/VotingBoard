Meteor.methods({


	updateSwimmer: function(winner, loser) {
		console.log("winner: " + winner.name);
		console.log("loser: " + loser.name);

		//Update winer 
		var percent = Math.floor((winner.picks + 1) / (winner.total + 1) * 100);
		Swimmers.update(winner._id, {$inc: {total: 1, picks: 1}, $set: {score: percent}});

		//Update loser 
		var prct = Math.floor(loser.picks / (loser.total + 1) * 100);
		Swimmers.update(loser._id, {$inc: {total: 1}, $set: {score: prct}});

	},

});