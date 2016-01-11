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
Meteor.publish("users", function () {
    return Meteor.users.find({});
});
Meteor.publish("images", function () {
    return Images.find();
});

Meteor.publish("rooms", function () {
    return Rooms.find();
});
Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {ts: -1}});
});

Meteor.methods({
    "createRoom": function (owner, guest) {
        var roomname = new Meteor.Collection.ObjectID().valueOf();
        Rooms.insert({roomname: roomname, users: [{username: owner.username},{username: guest.username}]});
        Meteor.users.update(owner._id, {$push: {"profile.rooms": {roomname: roomname}}});
        Meteor.users.update(guest._id, {$push: {"profile.rooms": {roomname: roomname}}})
        return roomname;
    },
    "removeUser": function (userid) {
        Meteor.users.remove( { _id: userid });
    }
});

