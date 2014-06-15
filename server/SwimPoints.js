Swimmers = new Meteor.Collection("swim");




Meteor.startup(function () {


	if(Swimmers.find().count() == 0) {
		console.log("Oh no!");
		Swimmers.insert({ name: "Apples", lstrnk: 0, total: 0, picks: 0, num: 1, img: "/img/apple.jpeg", score: 0});
		Swimmers.insert({ name: "Bananas", lstrnk: 0,  total: 0, picks: 0, num: 2, img: "/img/banana.jpg", score: 0});
		Swimmers.insert({ name: "Oranges", lstrnk: 0, total: 0, picks: 0, num: 3, img: "/img/orange.jpeg", score: 0});
		Swimmers.insert({ name: "Pears", lstrnk: 0, total: 0, picks: 0, num: 4, img: "/img/pear.jpeg", score: 0});
		
	}





	if ( Meteor.users.find().count() === 0 ) {
	    Accounts.createUser({
	        username: 'fruity',
	        password: '#fruits',
	        profile: {
	        	name: 'lulz'
	        }
	        
	    });
	}


	return Meteor.methods({

		removeAllData: function() {
			return Swimmers.remove({});
		},

		removeAllUsers:function() {
			return users.remove({});
		}
	});
});

