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
    },
    roomImage: function () {
        if (this.roomname == "mainroom") {
            return Meteor.absoluteUrl() + "placeholder.png";
        }
        var result;
        this.users.forEach(function(user) {
            if (user.username == Meteor.user().username) {
                var profileimage = Meteor.user().profile.image;
                if ( profileimage == undefined ) {
                    result =  Meteor.absoluteUrl() + "placeholder.png";
                    return;
                } else {
                    result = profileimage;
                    return;
                }
            } else {
                var profileimage = Meteor.users.findOne({username: user.username}).profile.images;
                if ( profileimage == undefined ) {
                    result =  Meteor.absoluteUrl() + "placeholder.png";
                    return;
                } else {
                    result =  profileimage;
                    return;
                }
            }
        });
        return result;
    }
});

