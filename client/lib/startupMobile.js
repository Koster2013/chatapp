if (Meteor.isCordova) {
    Meteor.startup(function () {

        Push.addListener('message', function (notification) {
            // Called on every message
            function alertDismissed() {
                NotificationHistory.update({_id: notification.payload.historyId}, {
                    $set: {
                        "recievedAt": new Date()
                    }
                });
            }

            //alert(notification.message, alertDismissed, notification.payload.title, "Okii");
            //IonPopup.alert({title: notification.payload.title, template: notification.message});
        });

        //Fix Back Button
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {

            _checkWlanMobile(function (result) {
                if (result == true) {
                    Session.set("wlanConnected", result);

                    var textDiv = document.getElementById('textDiv');
                    var successFullConnected = document.getElementById('successFullConnected')

                    if (successFullConnected && textDiv) {
                        successFullConnected.style.visibility = 'visible';
                        successFullConnected.style.color = 'green';
                        successFullConnected.innerHTML = 'Verbunden';
                        textDiv.style.width = '5em';
                    }
                } else {
                    toastr.warning('Wlan Benachrichtigung, die Anwendung funktioniert nur im lokal WLAN!');
                }
            });
            document.addEventListener("backbutton", function (e) {
                navigator.app.exitApp();
            });
        }
    });

}