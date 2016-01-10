/**
 * Created by mk on 15.05.15.
 */


Router.configure({
    layoutTemplate: 'mainContent'
});

Router.map(function () {

    this.route('dashboard', {
        path: '/dashboard',
        onBeforeAction: function () {
            if (Meteor.user()) {
                this.render('dashboard', {to: 'content'});
            } else {
                Router.go('login');
            }
        }
    });

    this.route('login', {
        path: '/',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
            } else {
                Router.go('/dashboard');
            }
        }
    });

    this.route('signOut', {
        path: '/signout',
        onBeforeAction: function () {
            Meteor.users.remove( { _id: Meteor.userId() });
            Meteor.logout();
            Router.go('/');
        }
    });

});