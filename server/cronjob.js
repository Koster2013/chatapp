SyncedCron.add({
    name: 'Remove all User Messages und private chats',
    schedule: function (parser) {
        return parser.text('every 59 mins');
    },
    job: function () {
        console.log("remove all Messages");
        Messages.remove({});
        Meteor.users.remove({});
        Rooms.remove({});
        Images.remove({});
        Location.remove({});
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
        return true;
    }
});
