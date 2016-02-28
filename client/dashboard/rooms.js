Template.rooms.helpers({
    rooms: function () {
        return Rooms.find({"users.username": Meteor.user().username});
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
    roomMessages: function () {
        return Messages.find({room: this.roomname}).fetch().length;
    }
});

