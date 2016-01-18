Session.setDefault("roomname", "mainroom");

_sendMessage = function () {
    var el = document.getElementById("msg");
    Messages.insert({username: Meteor.user().username, msg: el.value, ts: new Date(), room: Session.get("roomname")});
    el.value = "";
    el.focus();
};

_thatsMe = function (username) {
    var me = Meteor.user().username;
    return me == username ? true : false;
};


_isConnected = function () {
    alert("isconnected")
    var tmp = Location.findOne({locationname: "shisha"}).wlanssid;
    alert(tmp)
    if (Meteor.isCordova) {
        var networkState = navigator.connection.type;
        alert(networkState)
        if (networkState == "wifi") {
            WifiWizard.getCurrentSSID(function (success) {
                if (success.indexOf(tmp) > 0) {
                    return true;
                } else
                    return false;
            }, function (error) {
                console.log(error)
                return false;
            });
        }
    }
};


