_sendMessage = function (roomname) {
    var el = document.getElementById("msg");
    var currentLocation = Session.get("location");
    if (el.value.length > 0) {
        if (roomname === "mainroom"){
            Messages.insert({
                username: Meteor.user().username,
                msg: el.value,
                ts: new Date(),
                room: roomname,
                location: currentLocation
            });
            el.value = "";
            el.focus();
        }else{
            var actualSenderUserID = Meteor.user()._id;
            var actualTargetUser = "";
            var actualRooms = Rooms.find({"users.username": Meteor.user().username}).fetch()
            var actualRoom = "";

            for (var i = 0; i < actualRooms.length; i++) {
                if (actualRooms[i].roomname === roomname) {
                    actualRoom = actualRooms[i];
                }
            }

            var actualRoomUserIdFirst = Meteor.users.findOne({username: actualRoom.users[0].username})._id;
            var actualRoomUserIdLast = Meteor.users.findOne({username: actualRoom.users[1].username})._id;

            if (actualSenderUserID === actualRoomUserIdFirst) {
                actualTargetUser = actualRoomUserIdLast;
            }
            if (actualSenderUserID === actualRoomUserIdLast) {
                actualTargetUser = actualRoomUserIdFirst;
            }

            if (roomname != "mainroom") {
                var msg = el.value;
                Meteor.call("serverNotification", actualTargetUser, msg);
            }
            Messages.insert({
                username: Meteor.user().username,
                msg: el.value,
                ts: new Date(),
                room: roomname,
                location: currentLocation
            });
            el.value = "";
            el.focus();
        }

    } else {
        toastr.warning("Ihre Nachricht darf nicht leer sein!");
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
                }
            });
        }
        else {
            toastr.error("Ihr Benutzer konnte nicht angelegt werden!");
        }
    });
};
if (Meteor.userId()) {
    var location = localStorage.getItem("location");
    if (location) {
        Meteor.subscribe("rooms", location);
        Meteor.subscribe("messages", location);
        Meteor.subscribe("images");
        Meteor.subscribe('users', location);
        Session.set("location", location);
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
                    }
                });
            }, function (error) {
                callback(false);
                console.log(error)
            });
        }
    });
};

_checkWlanSendMessage = function () {
    var location = Session.get("location");
    var networkState = navigator.connection.type;
    if (networkState == "none") {
        Session.set("wlanConnected", false);
    }
    if (networkState == "wifi") {
        WifiWizard.getCurrentSSID(function (success) {
            var ssid = success.replace(/"/g, "").trim();
            if (ssid == location) {
                Session.set("wlanConnected", true);
            } else {
                Session.set("wlanConnected", false);
            }
        }, function (error) {
            Session.set("wlanConnected", false);
            console.log(error)
        });
    }else {
        Session.set("wlanConnected", false);
    }
};

_onDeviceReady = function () {

    _checkWlanMobile(function (result) {
        if (result == true) {
            Session.set("wlanConnected", result);

            var successFullConnected = document.getElementById('successFullConnected')

            if (successFullConnected) {
                successFullConnected.style.visibility = 'visible';
                successFullConnected.style.color = 'green';
                successFullConnected.innerHTML = 'Verbunden';
            }
        } else {
            IonPopup.alert({
                title: "Wlan Benachrichtigung!",
                template: "Die Anwendung funktioniert nur im lokal WLAN",
                okText: "Ok"
            });
        }
    })
}
