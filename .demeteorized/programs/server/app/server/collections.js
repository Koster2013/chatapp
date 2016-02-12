(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/collections.js                                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Rooms.deny({                                                           // 1
    insert: function (userId, doc) {                                   // 2
        return true;                                                   // 3
    },                                                                 //
    remove: function (userId, doc) {                                   // 5
        return true;                                                   // 6
    }                                                                  //
});                                                                    //
Messages.deny({                                                        // 9
    insert: function (userId, doc) {                                   // 10
        return userId === null;                                        // 11
    }                                                                  //
});                                                                    //
Messages.allow({                                                       // 14
    insert: function (userId, doc) {                                   // 15
        return userId !== null;                                        // 16
    }                                                                  //
});                                                                    //
                                                                       //
Images.allow({                                                         // 20
    insert: function () {                                              // 21
        return true;                                                   // 22
    },                                                                 //
    update: function () {                                              // 24
        return true;                                                   // 25
    },                                                                 //
    remove: function () {                                              // 27
        return true;                                                   // 28
    }                                                                  //
});                                                                    //
Meteor.publish("users", function (location) {                          // 31
    return Meteor.users.find({});                                      // 32
});                                                                    //
Meteor.publish("images", function () {                                 // 34
    return Images.find();                                              // 35
});                                                                    //
                                                                       //
Meteor.publish("rooms", function (location) {                          // 38
    return Rooms.find({ location: location });                         // 39
});                                                                    //
Meteor.publish("messages", function (location) {                       // 41
    return Messages.find({ location: location }, { sort: { ts: -1 } });
});                                                                    //
Meteor.publish("location", function () {                               // 44
    return Location.find({});                                          // 45
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 48
    "createRoom": function (owner, guest, location) {                  // 49
        var room = Rooms.findOne({                                     // 50
            users: {                                                   // 51
                $all: [{                                               // 52
                    username: owner.username,                          // 53
                    profilename: owner.profile.profilename             // 54
                }, { username: guest.username, profilename: guest.profile.profilename }]
            }                                                          //
        });                                                            //
        if (room == undefined) {                                       // 58
            roomname = new Meteor.Collection.ObjectID().valueOf();     // 59
            Rooms.insert({                                             // 60
                roomname: roomname,                                    // 61
                users: [{ username: owner.username, profilename: owner.profile.profilename }, {
                    username: guest.username,                          // 63
                    profilename: guest.profile.profilename             // 64
                }],                                                    //
                location: location                                     // 66
            });                                                        //
            Meteor.users.update(owner._id, { $push: { "profile.rooms": { roomname: roomname } } });
            Meteor.users.update(guest._id, { $push: { "profile.rooms": { roomname: roomname } } });
            return roomname;                                           // 70
        } else {                                                       //
            return room.roomname;                                      // 72
        }                                                              //
    },                                                                 //
    "removeUser": function (userid) {                                  // 76
        //Meteor.users.remove({_id: userid});                          //
        Meteor.users.update(userid, { $set: { "profile.online": false } });
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collections.js.map
