if (Meteor.isServer) {
    Push.debug=true;

    Meteor.startup(function () {
        SyncedCron.start();
        if (Rooms.findOne({roomname: "mainroom"}) == undefined) {
            Location.insert({locationname: "erdem", wlanssid: "EasyBox-0B6B28"});
            Rooms.insert({roomname: "mainroom", location: "EasyBox-0B6B28"});
            Location.insert({locationname: "erdem-home", wlanssid: "EasyBox-895487"});
            Rooms.insert({roomname: "mainroom", location: "EasyBox-895487"});
            Location.insert({locationname: "koster", wlanssid: "TP-LINK_84D190"});
            Rooms.insert({roomname: "mainroom", location: "TP-LINK_84D190"});
            Location.insert({locationname: "scheer", wlanssid: "ScheerTower"});
            Rooms.insert({roomname: "mainroom", location: "ScheerTower"});
            Location.insert({locationname: "BABOS", wlanssid: "BABOS"});
            Rooms.insert({roomname: "mainroom", location: "BABOS"});
            Location.insert({locationname: "LoMa", wlanssid: "LoMa Chat Medusa"});
            Rooms.insert({roomname: "mainroom", location: "LoMa Chat Medusa"});
        }
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
                    rooms: [{roomname: "mainroom"}],
                    ignoreList: []
                }
            });
        },

        addIgnoreUser: function (myuser, ignoreusername) {
            Meteor.users.update(myuser._id, {$addToSet: {"profile.ignoreList": ignoreusername}});
        },

        removeIgnoreUser: function (myuser, ignoreusername) {
            Meteor.users.update(myuser._id, {$pull: {"profile.ignoreList": ignoreusername}});
        },

        serverNotification: function (actualTargetUser, msg) {
            NotificationHistory.insert({
                addedAt: new Date()
            }, function (error, result) {
                if (!error) {
                    Push.send({
                        from: 'push',
                        title: 'LoMa Chat',
                        text: msg,
                        payload: {
                            title: 'LoMa Chat',
                            historyId: result
                        },
                        query: {
                            userId: actualTargetUser,
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
}
