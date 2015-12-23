/**
 * Created by dr on 19.03.15.
 * Improved by dr on 31.03 -01.04.2015
 */
Template.loginPanel.events({

    'submit #createForm': function (e) {

        var email = e.target.email.value;
        var password = e.target.password.value;
        var table = e.target.table.value;

        var user_email = Meteor.users.find({email: email});
        if (user_email.count() == 0) {
            Meteor.call('createAppUser', {
                password: password,
                email: email,
                table: table
            }, function (err) {
                if (!err) {
                    Meteor.loginWithPassword(email, password,table, function (err) {
                        if (err) {
                            alert(err.toString());
                        }
                        else {
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
