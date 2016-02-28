Template.messages.helpers({
    messages: function () {
        return Messages.find({room: this.roomname}, {sort: {ts: -1}});
    },
    timestamp: function () {
        return moment(this.ts).format('HH:ss');
    },
    thatsMe: function () {
        return _thatsMe(this.username) ? "bubbledLeft" : "bubbledRight";
    },
    roomnameFormated: function () {
        if (this.roomname == "mainroom") {
            return "mainroom";
        }
        if (this.users[0].profilename == Meteor.user().profile.profilename) {
            return "Chat mit: " + this.users[1].profilename;
        }
        if (this.users[1].profilename == Meteor.user().profile.profilename) {
            return "Chat mit: " + this.users[0].profilename;
        }
        return "XXX";
    },
    avatar: function () {
        var profileimage = Meteor.users.findOne({username: this.username}).profile.image;
        if (profileimage == undefined) {
            return Meteor.absoluteUrl() + "placeholder.png";
        } else {
            return profileimage;
        }
    },
    username: function () {
        return Meteor.users.findOne({username: this.username}).profile.profilename;
    },
    table: function () {
        return Meteor.users.findOne({username: this.username}).profile.table;
    },
    connectedWlan: function () {
        _checkWlanMobile(function (result) {
            if (result == true) {
                Session.set("wlanConnected", result);
            }
            else {
                Session.set("wlanConnected", result);
            }
        });
        return Session.get("wlanConnected");
    }
});


if (!Meteor.isCordova) {
    Template.messages.events({
        'click #sendMsg': function (e) {
            if (Session.get("wlanConnected") == true) {
                _sendMessage(this.roomname);
            } else {
                toastr.warning("Bitte verbinden Sie sich mit dem WLAN!")
            }
        },
        'keyup #msg': function (e) {
            if (e.type == "keyup" && e.which == 13) {
                _sendMessage(this.roomname);
            }
        }
    });
}

if (Meteor.isCordova) {
    Template.messages.events({
        'click #sendMsg': function (e) {
            toastr.warning("imWLAN");
            _sendMessage(this.roomname);
        },
        'keyup #msg': function (e) {
            if (e.type == "keyup" && e.which == 13) {
                _sendMessage(this.roomname);
            }
        }
    });
}

Template.messages.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};