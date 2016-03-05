Template.messages.helpers({
    messages: function () {
        //"9fbff3e1f61208a59a69d6cf" , "56fb548a580f1ab4cd711a80"
        return Messages.find({room: this.roomname , username: {$nin:  Session.get("ignoreUser") } } , {sort: {ts: -1}});
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
        return Session.get("wlanConnected");
    }

});

if (!Meteor.isCordova) {
    Template.messages.events({
        'click #sendMsg': function (e) {
            _sendMessage(this.roomname);
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
            _checkWlanSendMessage();
            if (Session.get("wlanConnected") == true) {
                _sendMessage(this.roomname);
            } else {
                toastr.warning("Bitte verbinden Sie sich mit dem WLAN!")
            }
        },
        'keyup #msg': function (e) {
            if (e.type == "keyup" && e.which == 13) {
                if (Session.get("wlanConnected") == true) {
                    _sendMessage(this.roomname);
                } else {
                    toastr.warning("Bitte verbinden Sie sich mit dem WLAN!")
                }
            }
        }
    });
}

Template.messages.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};