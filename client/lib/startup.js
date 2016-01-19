if (Meteor.isCordova) {
    Meteor.startup(function () {
            var networkState = navigator.connection.type;
            if (networkState == "none") {
                alert("in keinem WLAN");
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
