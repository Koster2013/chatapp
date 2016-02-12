SyncedCron.add({
    name: 'Remove all User Messages und private chats',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 10:15 am');
    },
    job: function() {
        console.log("romove all Messsgaes");
        Messages.remove({});
        Meteor.users.remove({});
        Rooms.remove({});
        Images.remove({});
        Location.remove({});
        Location.insert({locationname: "erdem", wlanssid: "EasyBox-0B6B28" });
        Rooms.insert({roomname: "mainroom", location: "EasyBox-0B6B28"});
        Location.insert({locationname: "koster", wlanssid: "TP-LINK_84D190" });
        Rooms.insert({roomname: "mainroom", location: "TP-LINK_84D190"});
        return true;
    }
});