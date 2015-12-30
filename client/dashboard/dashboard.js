Template.dashboard.events({
    'click .sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});


Template.messages.helpers({
    messages: function () {
        return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    },
    roomname: function () {
        return Session.get("roomname");
    },
    timestamp: function () {
        return this.ts.toLocaleString();
    },
    thatsMe: function(username) {
        var me = Meteor.user().username;
        return me == username ? "background-color: mistyrose;" : "";
    },

    avatar: function () {
        return getAvatarUrlMock(Meteor.userId());
    }
});

Template.users.helpers({

    users: function () {
        Meteor.call('getUsers', function (error, data) {
            if (error) {
                console.log(error);
            }
            console.log(data);
            Session.set("getUsers", data)
        });
        return Session.get("getUsers");
    },
    avatar: function () {
        return getAvatarUrlMock(Meteor.userId());
    },
    status: function (status) {
        return status == true ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;"
    }


});

Template.dashboard.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};


