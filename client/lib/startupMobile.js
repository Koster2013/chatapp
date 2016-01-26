if (Meteor.isCordova) {
    Meteor.startup(function () {

            //Fix Back Button
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                document.addEventListener("backbutton", function (e) {
                    navigator.app.exitApp();
                });
            }


            //check Wlan conection alle 3 sek
            var intervalHandle = Meteor.setInterval(function () {
                _checkWlanMobile(function (result) {
                    if (result == true) {
                        Session.set("wlanConnected", result);
                        Meteor.clearInterval(intervalHandle);
                    } else {
                        IonPopup.alert({
                            title: "Mit Wlan verbinden!",
                            template: "Die Anwendung funktioniert nur im lokal WLAN",
                            okText: "Ok"
                        });
                    }
                });
            }, 5000);

        }
    );

    //check WLAN Startup
    _checkWlanMobile = function (callback) {
        Meteor.subscribe("location").readyPromise().then(function (result) {
            var currentLocation = Location.find({}).fetch();
            var networkState = navigator.connection.type;
            if (networkState == "none") {
                callback(false);
            }
            if (networkState == "wifi") {
                WifiWizard.getCurrentSSID(function (success) {
                    var ssid = success.replace(/"/g, "").trim();
                    currentLocation.forEach(function (key) {
                        if (ssid == key.wlanssid) {
                            Session.set("location", key.wlanssid);
                            callback(true);
                        } else {
                            callback(false);
                        }
                    });
                }, function (error) {
                    callback(false);
                    console.log(error)
                });
            }
        });
    };
}