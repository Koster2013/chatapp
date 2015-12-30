/**
 * Created by dr on 19.03.15.
 * Improved by dr on 31.03 -01.04.2015
 */
Template.loginPanel.events({

    'submit #createForm': function (e) {

        var username = e.target.username.value;
        var password = e.target.password.value;
        var table = e.target.table.value;

        var user_name = Meteor.users.find({username: username});
        if (user_name.count() == 0) {
            Meteor.call('createAppUser', {
                password: password,
                username: username,
                table: table
            }, function (err) {
                if (!err) {
                    Meteor.loginWithPassword(username, password,table, function (err) {
                        if (err) {
                            alert(err.toString());
                        }
                        else {
                            Meteor.user().profile.online = true;
                            console.log("User eingeloggt");
                        }
                    });
                }
                else {
                    alert(err.toString());
                }

            });

        }
        else {
            alert("another_user_with_the_given_emailaddress_exists");
        }
        return false;
    }
});
