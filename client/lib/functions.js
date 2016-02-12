_sendMessage = function (roomname) {
    var el = document.getElementById("msg");
    var currentLocation = Session.get("location");
    console.log(el.value.length)
    if (el.value.length > 0) {
        Messages.insert({
            username: Meteor.user().username,
            msg: el.value,
            ts: new Date(),
            room: roomname,
            location: currentLocation
        });
        el.value = "";
        el.focus();
    } else {
        IonPopup.alert({
            title: 'Message',
            template: 'Leere Nachricht',
            okText: 'Ok'
        });
    }
};

_thatsMe = function (username) {
    var me = Meteor.user().username;
    return me == username ? true : false;
};

_createAndLoginUser = function (username, password, profileUsername, table, location) {
    Meteor.call('createAppUser', {
        username: username,
        password: password,
        profileUsername: profileUsername,
        table: table,
        location: location
    }, function (err) {
        if (!err) {
            Meteor.loginWithPassword(username, password, function (err) {
                if (err) {
                    toastr.error("Ihr Benutzer konnte nicht eingeloggt werden!");
                    console.log(err);
                }
                else {
                    _meteorSubscribe(location);
                    console.log("User eingeloggt");
                }
            });
        }
        else {
            toastr.error("Ihr Benutzer konnte nicht angelegt werden!");
        }
    });
};
if (Meteor.userId()){
    var location = localStorage.getItem("location");
    if (location) {
        Meteor.subscribe("rooms", "TP-LINK_84D190");
        Meteor.subscribe("messages", "TP-LINK_84D190");
        Meteor.subscribe("images");
        Meteor.subscribe('users', "TP-LINK_84D190");
        Session.set("location", "TP-LINK_84D190");
    }
}
_meteorSubscribe = function (location) {
    Meteor.subscribe("rooms", location);
    Meteor.subscribe("messages", location);
    Meteor.subscribe("images");
    Meteor.subscribe('users', location);
    Session.set("location", location);
    localStorage.setItem("location", location);

}

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
