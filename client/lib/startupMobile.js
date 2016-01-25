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
                    if ( result == true) {
                        Session.set("wlanConnected", result);
                        Meteor.clearInterval(intervalHandle);
                    } else {
                        IonPopup.alert({
                            title: 'Mit Wlan verbinden!!',
                            template: 'Die Anwendung funktioniert nur im lokal WLAN',
                            okText: 'Ok'
                        });
                    }
                });

            }, 3000);

        }
    );
}
