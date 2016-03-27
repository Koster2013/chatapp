Template.rooms.helpers({
    rooms: function () {
        return Rooms.find({"users.username": Meteor.user().username});
    },
    roomnameFormated: function () {
        if (this.roomname == "mainroom") {
            return "Lokal Chat";
        }
        if (this.users[0].profilename == Meteor.user().profile.profilename) {
            return "Chat mit: " + this.users[1].profilename;
        }
        if (this.users[1].profilename == Meteor.user().profile.profilename) {
            return "Chat mit: " + this.users[0].profilename;
        }
        return "XXX";
    },
    roomMessages: function () {
        return Messages.find({room: this.roomname}).fetch().length;
    },
    lastMessage: function () {
        var test = Messages.find({room: this.roomname}, {sort: {ts: -1}}, {limit: 1}).fetch()[0].msg;
        return test;
    },
    lastts: function () {
        var test = Messages.find({room: this.roomname}, {sort: {ts: -1}}, {limit: 1}).fetch()[0].ts;
        return moment(test).format('HH:ss');
    },
    onIgnore: function () {
        var ignoreUserList = Meteor.users.findOne({_id: Meteor.user()._id}).profile.ignoreList;
        if ($.inArray(this.users[0].username, ignoreUserList) >= 0) {
            return true;
        }
        if ($.inArray(this.users[1].username, ignoreUserList) >= 0) {
            return true;
        }
        return false;
    },
    roomImage: function () {
        if (this.roomname == "mainroom") {
            return Meteor.absoluteUrl() + "placeholder.png";
        }
        var result;
        if (this.users[0].username == Meteor.user().username) {
            var profileimage = Meteor.users.findOne({username: this.users[1].username}).profile.images;
            if (profileimage == undefined) {
                result = Meteor.absoluteUrl() + "placeholder.png";
                return;
            } else {
                result = profileimage;
                return;
            }
        }
        if (this.users[1].username == Meteor.user().username) {
            var profileimage = Meteor.users.findOne({username: this.users[0].username}).profile.images;
            if (profileimage == undefined) {
                result = Meteor.absoluteUrl() + "placeholder.png";
                return;
            } else {
                result = profileimage;
                return;
            }
        }
        return result;
    }
});

