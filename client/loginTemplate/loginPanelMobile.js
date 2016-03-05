/**
 * Created by mk on 21.01.16.
 */
if (Meteor.isCordova) {

    Template.loginPanel.events({
        'submit #createForm': function (e) {
            var profileUsername = e.target.username.value;
            var password = "test";
            var username = new Meteor.Collection.ObjectID().valueOf();

            e.target.username.value = "";

            if (profileUsername.length < 3) {
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
                        if (Session.get("location") != undefined) {
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
        },

        //'click #checkWlan': function (e) {
        //    _checkWlanMobile(function (result) {
        //        console.log(result)
        //        if (result == true) {
        //            console.log('result true, set wlanconnected')
        //            Session.set("wlanConnected", result);
        //            document.getElementById('checkWlan').style.visibility = 'hidden';
        //            document.getElementById('successFullConnected').style.visibility = 'visible';
        //        } else {
        //            document.getElementById('checkWlan').style.visibility = 'visible';
        //            document.getElementById('successFullConnected').style.visibility = 'hidden';
        //            console.log('fire IonPopup; result false --> no wlan connection')
        //            IonPopup.alert({
        //                title: "Wlan Benachrichtigung!",
        //                template: "Die Anwendung funktioniert nur im lokal WLAN",
        //                okText: "Ok"
        //            });
        //        }
        //    });
        //}


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
        }
    });
}