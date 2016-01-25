if (Meteor.isCordova) {
    Meteor.startup(function () {

            //Fix Back Button
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                document.addEventListener("backbutton", function (e) {
                    navigator.app.exitApp();
                });
            }

            Meteor.subscribe("location", {
                onReady: function () {

                    //TODO asynchrone scheisse funzt so net ganz ........
                    var currentLocation = Location.find({});
                    var networkState = navigator.connection.type;
                    if (networkState == "none") {
                        Session.set("wlanConnected", false)
                        IonPopup.alert({
                            title: 'Keine Wlan Verbindung',
                            template: 'Es muss sich mit dem Lokal Wlan verbunden werden um die Anwendung zu nutzen'
                        });
                    }
                    if (networkState == "wifi") {
                        WifiWizard.getCurrentSSID(function (success) {
                            currentLocation.forEach(function(key){
                                if (success.indexOf(key.wlanssid) > 0) {
                                    Session.set("wlanConnected", true);
                                    Session.set("location", key.wlanssid);
                                } else {
                                    Session.set("wlanConnected", false)
                                    IonPopup.alert({
                                        title: 'Falsches Wlan',
                                        template: 'Es muss sich mit dem Lokal Wlan verbunden werden um die Anwendung zu nutzen'
                                    });
                                }
                            });

                        }, function (error) {
                            console.log(error)
                        });
                    }

                },
                onError: function () { console.log("onError", arguments); }
            });


        }
    );
}
