if (Meteor.isServer) {

    Meteor.startup(function () {
        if (Rooms.findOne({roomname: "mainroom"}) == undefined){
            Location.insert({locationname: "shisha", wlanssid: "EasyBox-0B6B28" });
            Rooms.insert({roomname: "mainroom", location: "1EasyBox-0B6B281"});
        } else {

        }
        //Messages.remove({});
        //Rooms.remove({});
        //Rooms.insert({roomname: "mainroom"});
    });


    Meteor.methods({
        createAppUser: function (obj) {
            Rooms.update({roomname: "mainroom"}, { $push: {"users": { username: obj.username }}});
            Accounts.createUser({
                username: obj.username,
                password: obj.password,
                profile: {
                    role: "user",
                    table: obj.table,
                    location: obj.location,
                    online: true,
                    profilename: obj.profileUsername,
                    rooms: [{roomname: "mainroom"}]
                }
            });
        }
    });
}
