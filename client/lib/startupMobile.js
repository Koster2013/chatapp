if (Meteor.isCordova) {
    Meteor.startup(function () {

        Push.addListener('message', function(notification) {
            // Called on every message
            console.log(JSON.stringify(notification))

            function alertDismissed() {
                NotificationHistory.update({_id: notification.payload.historyId}, {
                    $set: {
                        "recievedAt": new Date()
                    }
                });
            }
            alert(notification.message, alertDismissed, notification.payload.title, "Okii");
        });

        //Fix Back Button
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            document.addEventListener("backbutton", function (e) {
                navigator.app.exitApp();
            });
        }
    });

}