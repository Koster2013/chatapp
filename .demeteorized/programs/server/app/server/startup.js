(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/startup.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isServer) {                                                 // 1
                                                                       //
    Meteor.startup(function () {                                       // 3
        if (Rooms.findOne({ roomname: "mainroom" }) == undefined) {    // 4
            Location.insert({ locationname: "erdem", wlanssid: "EasyBox-0B6B28" });
            Rooms.insert({ roomname: "mainroom", location: "EasyBox-0B6B28" });
            Location.insert({ locationname: "koster", wlanssid: "TP-LINK_84D190" });
            Rooms.insert({ roomname: "mainroom", location: "TP-LINK_84D190" });
        } else {}                                                      //
        //Messages.remove({});                                         //
        //Rooms.remove({});                                            //
        //Rooms.insert({roomname: "mainroom"});                        //
    });                                                                //
                                                                       //
    Meteor.methods({                                                   // 18
        createAppUser: function (obj) {                                // 19
            Rooms.update({ roomname: "mainroom", location: obj.location }, { $push: { "users": { username: obj.username } } });
            Accounts.createUser({                                      // 21
                username: obj.username,                                // 22
                password: obj.password,                                // 23
                profile: {                                             // 24
                    role: "user",                                      // 25
                    table: obj.table,                                  // 26
                    location: obj.location,                            // 27
                    online: true,                                      // 28
                    profilename: obj.profileUsername,                  // 29
                    rooms: [{ roomname: "mainroom" }]                  // 30
                }                                                      //
            });                                                        //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=startup.js.map
