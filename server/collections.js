Rooms.deny({
    insert: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Messages.deny({
    insert: function (userId, doc) {
        return (userId === null);
    }
});
Messages.allow({
    insert: function (userId, doc) {
        return (userId !== null);
    }
});

Images.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
Meteor.publish("users", function (location) {
    return Meteor.users.find({});
});
Meteor.publish("images", function () {
    return Images.find();
});

Meteor.publish("rooms", function (location) {
    return Rooms.find({location: location});
});
Meteor.publish("messages", function (location) {
    return Messages.find({location: location}, {sort: {ts: -1}});
});
Meteor.publish("location", function () {
    return Location.find({});
});

Meteor.methods({
    "createRoom": function (owner, guest, location) {
        var room = Rooms.findOne({
            users: {
                $all: [{
                    username: owner.username,
                    profilename: owner.profile.profilename
                }, {username: guest.username, profilename: guest.profile.profilename}]
            }
        }) ;
        if (room == undefined) {
            roomname = new Meteor.Collection.ObjectID().valueOf();
            Rooms.insert({
                roomname: roomname,
                users: [{username: owner.username, profilename: owner.profile.profilename}, {
                    username: guest.username,
                    profilename: guest.profile.profilename
                }],
                location: location
            });
            Meteor.users.update(owner._id, {$push: {"profile.rooms": {roomname: roomname}}});
            Meteor.users.update(guest._id, {$push: {"profile.rooms": {roomname: roomname}}})
            return roomname;
        } else {
            return room.roomname;
        }

    },
    "removeUser": function (userid) {
        //Meteor.users.remove({_id: userid});
        Meteor.users.update(userid, { $set: {"profile.online": false} } );

    }
});

