/**
 * Created by mk on 21.01.16.
 */
if (Meteor.isCordova) {

    Template.loginPanel.onRendered = function () {
    };

    Template.loginPanel.events({
        'submit #createForm': function (e) {
            var profileUsername = e.target.username.value;
            var password = "test";
            var username = new Meteor.Collection.ObjectID().valueOf();

            e.target.username.value = "";

            if (profileUsername.length < 3) {
                toastr.error("Benutzername darf nicht kleiner als 3 Zeichen sein!");
                return false;
            }

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    var table = result.text;
                    if (table == "" || table == undefined || table > 50 || !_isNumeric(table)) {
                        toastr.error('Fehlerhafter Barcode, das ist kein gültiger Tischcode!');
                        return false;
                    } else {
                        if (Session.get("location") != undefined) {
                            _createAndLoginUser(username, password, profileUsername, table, Session.get("location"))
                        }
                        return false;
                    }
                },
                function (error) {
                    toastr.error('Fehlerhafter Barcode, das ist kein gültiger Tischcode!');
                    navigator.app.exitApp();
                }
            );
            return false;
        },

        'click #lomaImage': function (e) {
            var counter = Session.get("clickLomaImage") + 1;
            Session.set("clickLomaImage", counter);
        }


    });

    Template.loginPanel.helpers({
        'wlanConnected': function (e) {
            _onDeviceReady();
            console.log(Session)
            if (Session.get("wlanConnected") == true) {
                return "";
            } else {
                return "disabled";
            }
        },
        'appStoreMode': function (e) {
            console.log("click count " + Session.get("clickLomaImage"))
            if (Session.get("clickLomaImage") >= 10) {
                Session.set("location", "TP-LINK_84D190");
                return "display: block;";
            } else {
                return "display: none;";
            }
        }

    });
}
