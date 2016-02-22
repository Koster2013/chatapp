if (Meteor.isServer) {

    Meteor.startup(function () {
        SyncedCron.start();
        if (Rooms.findOne({roomname: "mainroom"}) == undefined) {
            Location.insert({locationname: "erdem", wlanssid: "EasyBox-0B6B28"});
            Rooms.insert({roomname: "mainroom", location: "EasyBox-0B6B28"});
            Location.insert({locationname: "koster", wlanssid: "TP-LINK_84D190"});
            Rooms.insert({roomname: "mainroom", location: "TP-LINK_84D190"});
        } else {

        }
        //Messages.remove({});
        //Rooms.remove({});
        //Rooms.insert({roomname: "mainroom"});
    });


    Meteor.methods({
        createAppUser: function (obj) {
            Rooms.update({roomname: "mainroom", location: obj.location}, {$push: {"users": {username: obj.username}}});
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
        },
        serverNotification: function (actualUserId) {
            console.log('actualUserId: ' + actualUserId)
            var last = NotificationHistory.findOne({}, {sort: {addedAt: -1}});
            var badge = 1
            if (last != null) {
                badge = last.badge + 1;
            }

            NotificationHistory.insert({
                badge: badge,
                addedAt: new Date()
            }, function (error, result) {
                if (!error) {
                    Push.send({
                        from: 'push',
                        title: 'LoMa Chat',
                        text: 'Du hast eine neue Nachricht',
                        badge: badge,
                        payload: {
                            title: 'LoMa Chat',
                            historyId: result
                        },
                        query: {
                            //userId: actualUserId
                        }
                    });
                }
            });
        },
        removeHistory: function () {
            NotificationHistory.remove({}, function (error) {
                if (!error) {
                    console.log("All history removed");
                }
            });
        }
    });
    /*
     Accounts.validateLoginAttempt(function(info) {
     var user = info.user;

     if(user.resume == false ) {
     console.log("test");

     }

     });*/
}
