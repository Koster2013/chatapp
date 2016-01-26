_sendMessage = function (roomname) {
    var el = document.getElementById("msg");
    var currentLocation = Session.get("location");
    console.log(el.value.length)
    if (el.value.length > 0) {
        Messages.insert({username: Meteor.user().username, msg: el.value, ts: new Date(), room: roomname, location: currentLocation });
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
                    Session.set("location", location);
                    Meteor.subscribe("rooms", location);
                    Meteor.subscribe("messages", location);
                    Meteor.subscribe("images" );
                    Meteor.subscribe('users' , location);
                    console.log("User eingeloggt");
                }
            });
        }
        else {
            toastr.error("Ihr Benutzer konnte nicht angelegt werden!");
        }
    });
};

_meteorSubscribe = function () {
    var location = Session.get("location");
    Meteor.subscribe("rooms", location);
    Meteor.subscribe("messages", location);
    Meteor.subscribe("images" );
    Meteor.subscribe('users' , location);
}


