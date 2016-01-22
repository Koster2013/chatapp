/**
 * Created by mk on 21.01.16.
 */
if (Meteor.isCordova) {

    Template.loginPanel.events({
        'submit #createForm': function (e) {
            var profileUsername = e.target.username.value;
            var password = "test";
            var username = new Meteor.Collection.ObjectID().valueOf();
            if ( profileUsername.length < 3 ){
                toastr.error("Benutzername darf nicht kleiner als 3 Zeichen sein");
                return false;
            }

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    var table = result.text;
                    //TODO hier noch auf number überprüfen usw. ( Das muss alles aus der DB kommen sonst kann man auch einen flaschen code eilesen..
                    if (table == "" || table == undefined || table > 50) {
                        IonPopup.alert({title: 'Fehlerhafter Barcode', template: 'Das ist kein gültiger Tischcode!'});
                        return false;
                    } else {
                        Meteor.call('createAppUser', {
                            username: username,
                            password: password,
                            profileUsername: profileUsername,
                            table: table
                        }, function (err) {
                            if (!err) {
                                Meteor.loginWithPassword(username, password, function (err) {
                                    if (err) {
                                        IonPopup.alert({title: 'Keine Verbindung zum Server', template: "Benutzer konnte nicht eingeloggt werden!"});
                                        console.log(err);
                                    }
                                    else {
                                        console.log("User eingeloggt");
                                    }
                                });
                            }
                            else {
                                IonPopup.alert({title: 'Benutzer anlegen fehlgeschlagen', template: "Benutzer konnte nicht angelegt werden!"});
                            }
                        });
                    }
                },
                function (error) {
                    IonPopup.alert({title: 'Fehlerhafter Barcode', template: 'Das ist kein gültiger Tischcode!'});
                    navigator.app.exitApp();
                }
            );
            return false;
        }
    });

    Template.loginPanel.helpers({
        'wlanConnected': function (e) {
            if (Session.get("wlanConnected") == true) {
                return "";
            } else {
                return "disabled";
            }
        }
    });
}