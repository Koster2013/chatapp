/**
 * Created by mk on 21.01.16.
 */
if (Meteor.isCordova) {

    Template.loginPanel.events({
        'submit #createForm': function (e) {
            var profileUsername = e.target.username.value;
            var password = "test";
            var username = new Meteor.Collection.ObjectID().valueOf();

            e.target.username.value ="";

            if ( profileUsername.length < 3 ){
                toastr.error("Benutzername darf nicht kleiner als 3 Zeichen sein");
                return false;
            }

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    var table = result.text;
                    if (table == "" || table == undefined || table > 50) {
                        IonPopup.alert({title: 'Fehlerhafter Barcode', template: 'Das ist kein gültiger Tischcode!'});
                        return false;
                    } else {
                        if (Session.get("location") != undefined ){
                            _createAndLoginUser(username, password, profileUsername, table, Session.get("location"))
                        }
                        return false;
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