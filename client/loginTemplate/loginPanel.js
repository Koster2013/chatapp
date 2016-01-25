/**
 * Created by dr on 19.03.15.
 * Improved by dr on 31.03 -01.04.2015
 */

if (!Meteor.isCordova) {
    Template.loginPanel.events({

        'submit #createForm': function (e) {




            var profileUsername = e.target.username.value;
            var password = e.target.password.value;
            var table = e.target.table.value;
            var location = e.target.location.value;

            Meteor.subscribe("location", {
                onReady: function () {
                    var currentLocation = Location.find({}).fetch();
                    currentLocation.forEach(function (key) {
                        if (location.indexOf(key.wlanssid) > 0) {
                            
                        } else {
                        }
                    });
                },
                onError: function () {
                    console.log("onError", arguments);
                }
            });

            var username = new Meteor.Collection.ObjectID().valueOf();

            if (profileUsername.length < 3) {
                toastr.error("Benutzername darf nicht kleiner als 3 Zeichen sein");
                return false;
            }
            Meteor.call('createAppUser', {
                username: username,
                password: password,
                profileUsername: profileUsername,
                table: table,
                location: location
            }, function (err) {
                if (!err) {
                    Meteor.loginWithPassword(username, password, function (err) {
                        if (err) {
                            toastr.error("Ihr Benutzer konnte nicht eingeloggt werden!");
                            console.log(err);
                        }
                        else {
                            console.log("User eingeloggt");
                        }
                    });
                }
                else {
                    toastr.error("Ihr Benutzer konnte nicht angelegt werden!");
                }
            });
            return false;
        }
    })
    ;
}



