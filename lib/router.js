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

    this.route('/profile/:_id', function () {
        this.render('profile', {
            to: 'content',
            data: function () {
                return Meteor.users.findOne({_id: this.params._id});
            }
        });
    });

    this.route('/dashboard/:roomname', function () {
        this.render('messages', {
            to: 'content',
            data: function () {
                Session.set('tableSelected', "alle")
                return Rooms.findOne({roomname: this.params.roomname});
            }
        });
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

    this.route('agbs', {
        path: '/agbs',
        onBeforeAction: function () {
            this.render('agbs', {to: 'content'});
        }
    });

    this.route('signOut', {
        path: '/signout',
        onBeforeAction: function () {
            Meteor.call("removeUser", Meteor.userId());
            //delete all Session KEys
            Object.keys(Session.keys).forEach(function (key) {
                Session.set(key, undefined);
            });
            Session.keys = {};// remove session keys
            Meteor.logout();
            Router.go('/');
        }
    });

});