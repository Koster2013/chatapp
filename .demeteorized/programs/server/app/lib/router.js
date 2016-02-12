(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created by mk on 15.05.15.                                          //
 */                                                                    //
                                                                       //
Router.configure({                                                     // 6
    layoutTemplate: 'mainContent'                                      // 7
});                                                                    //
                                                                       //
Router.map(function () {                                               // 10
                                                                       //
    this.route('dashboard', {                                          // 12
        path: '/dashboard',                                            // 13
        onBeforeAction: function () {                                  // 14
            if (Meteor.user()) {                                       // 15
                this.render('dashboard', { to: 'content' });           // 16
            } else {                                                   //
                Router.go('login');                                    // 18
            }                                                          //
        }                                                              //
    });                                                                //
                                                                       //
    this.route('/profile/:_id', function () {                          // 23
        this.render('profile', { to: 'content',                        // 24
            data: function () {                                        // 25
                return Meteor.users.findOne({ _id: this.params._id });
            }                                                          //
        });                                                            //
    });                                                                //
                                                                       //
    this.route('/dashboard/:roomname', function () {                   // 31
        this.render('messages', { to: 'content',                       // 32
            data: function () {                                        // 33
                Session.setDefault('tableSelected', "all");            // 34
                return Rooms.findOne({ roomname: this.params.roomname });
            }                                                          //
        });                                                            //
    });                                                                //
                                                                       //
    this.route('login', {                                              // 40
        path: '/',                                                     // 41
        onBeforeAction: function () {                                  // 42
            if (!Meteor.user()) {                                      // 43
                this.render('loginPanel', { to: 'content' });          // 44
            } else {                                                   //
                Router.go('/dashboard');                               // 46
            }                                                          //
        }                                                              //
    });                                                                //
                                                                       //
    this.route('signOut', {                                            // 51
        path: '/signout',                                              // 52
        onBeforeAction: function () {                                  // 53
            Meteor.call("removeUser", Meteor.userId());                // 54
            //delete all Session KEys                                  //
            Object.keys(Session.keys).forEach(function (key) {         // 56
                Session.set(key, undefined);                           // 57
            });                                                        //
            Session.keys = {}; // remove session keys                  // 59
            Meteor.logout();                                           // 60
            Router.go('/');                                            // 61
        }                                                              //
    });                                                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=router.js.map
