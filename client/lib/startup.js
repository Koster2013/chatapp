if (Meteor.isCordova) {
    Meteor.startup(function () {

            //Fix Back Button
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady(){
                document.addEventListener("backbutton", function(e) {
                    navigator.app.exitApp();
                });
            }



            var networkState = navigator.connection.type;
            if (networkState == "none") {
                IonPopup.alert({title: 'Keine Wlan Verbindung', subTitle: 'Wlan Verbindung fehlt', template: 'Es muss sich mit dem Lokal Wlan verbunden werden um die Anwendung zu nutzen'});
            }
            if (networkState == "wifi") {
                WifiWizard.getCurrentSSID(function (success) {
                    if (success.indexOf("TP-LINK_84D190") > 0) {
                        alert("geht");
                    } else {
                        alert("gehtnet");
                    }
                }, function (error) {
                    console.log(error)
                });
            }

        }
    );
}
