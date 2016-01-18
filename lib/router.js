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
                return Rooms.findOne({roomname: this.params.roomname});
            }
        });
    });

    this.route('login', {
        path: '/',
        onBeforeAction: function () {

            //var tmp = Location.findOne({locationname: "shisha"}).wlanssid;
            //    var networkState = navigator.connection.type;
            //    alert(networkState)
            //    if (networkState == "wifi") {
            //        alert('im wifi')
            //        WifiWizard.getCurrentSSID(function(success){
            //            if(success.indexOf(tmp) > 0){
            //                alert("test")
            //            }
            //        }, function(error){
            //            alert(error);
            //        });
            //    }

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