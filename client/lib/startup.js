if (Meteor.isCordova) {
    Meteor.startup(function () {

            //Fix Back Button
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                document.addEventListener("backbutton", function (e) {
                    navigator.app.exitApp();
                });
            }


//TODO asynchrone scheisse funzt so net ganz ........
           // Meteor.subscribe('location');
            //var currentLocation = Location.findOne({locationname: "shisha"});

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
                    if (success.indexOf("TP-LINK_84D190") > 0) {
                        Session.set("wlanConnected", true)
                    } else {
                        Session.set("wlanConnected", false)
                        IonPopup.alert({
                            title: 'Falsches Wlan',
                            template: 'Es muss sich mit dem Lokal Wlan verbunden werden um die Anwendung zu nutzen'
                        });
                    }
                }, function (error) {
                    console.log(error)
                });
            }

        }
    );
}
