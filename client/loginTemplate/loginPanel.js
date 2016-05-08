/**
 * Created by dr on 19.03.15.
 * Improved by dr on 31.03 -01.04.2015
 */

if (!Meteor.isCordova) {
    Template.loginPanel.events({

        'submit #createForm': function (e) {
            e.preventDefault();

            var profileUsername = e.target.username.value;
            var password = e.target.password.value;
            var table = e.target.table.value;
            var location = e.target.locationname.value;
            var username = new Meteor.Collection.ObjectID().valueOf();

            if (profileUsername.length < 3) {
                toastr.error("Benutzername darf nicht kleiner als 3 Zeichen sein");
                return false;
            }

            if (!_isNumeric(table)) {
                toastr.error("Tisch muss eine gültige Nummer sein!");
                return false;
            }
            Meteor.subscribe("location").readyPromise().then(function (result) {
                var currentLocation = Location.find({}).fetch();
                currentLocation.forEach(function (key) {
                    if (location == key.wlanssid) {
                        return _createAndLoginUser(username, password, profileUsername, table, location);
                    } else {
                        return false;
                    }
                });
            })
            return false;
        }
    });
}



