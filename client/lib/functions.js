_sendMessage = function() {
    var el = document.getElementById("msg");
    Messages.insert({user: Meteor.userId(), msg: el.value, ts: new Date(), room: Session.get("roomname")});
    el.value = "";
    el.focus();
};

_thatsMe = function (username) {
    var me = Meteor.user().profile.username;
    return me == username ? true : false;
};
Session.setDefault("roomname", "mainroom");