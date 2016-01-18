_sendMessage = function(roomname) {
    var el = document.getElementById("msg");
    Messages.insert({username: Meteor.user().username, msg: el.value, ts:  new Date(), room: roomname});
    el.value = "";
    el.focus();
};

_thatsMe = function (username) {
    var me = Meteor.user().username;
    return me == username ? true : false;
};
