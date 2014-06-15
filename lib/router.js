
var OnBeforeActions;

OnBeforeActions = {
     
     loginRequired: function(pause) {
          if (!Meteor.userId()) {
               this.render('aboutTemplate');
               return pause();
          }
     }
     
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['home', 'Leaderboard']
});

Router.map(function () {
	this.route('home', {
		path: '/',
		template: 'voteboothTemplate'
	})

     this.route('about', {
     	template: 'aboutTemplate'
     });

     this.route('Leaderboard', {
          path: 'Leaderboard',
     	template: 'LeaderboardTemplate'
     });

     // this.route('full', {
     //      path: 'Board',
     //      template: 'FullBoardTemplate'
     // });
});