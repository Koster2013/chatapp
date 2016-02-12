if (Meteor.isCordova) {
    Meteor.startup(function () {
        //Fix Back Button
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            document.addEventListener("backbutton", function (e) {
                navigator.app.exitApp();
            });
        }
    });

}