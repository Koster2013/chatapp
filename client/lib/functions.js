_sendMessage = function() {
    var el = document.getElementById("msg");
    Messages.insert({user: Meteor.user(), msg: el.value, ts: new Date(), room: Session.get("roomname")});
    el.value = "";
    el.focus();
};

Session.setDefault("roomname", "mainRoom");