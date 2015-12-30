/*Rooms.deny({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Messages.deny({
    insert: function (userId, doc) {
        return (userId === null);
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Messages.allow({
    insert: function (userId, doc) {
        return (userId !== null);
    }
});



Meteor.publish("rooms", function () {
    return Rooms.find();
});
Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {ts: -1}});
});
 */


Meteor.methods({
    'getUsers': function(){
        console.log("call1");
        return Meteor.users.find({ }).fetch();
    }
});