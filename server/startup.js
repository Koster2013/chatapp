if (Meteor.isServer) {

    Meteor.startup(function () {
        Messages.remove({});
        Rooms.remove({});
        Rooms.insert({roomname: "mainroom"});
    });


    Meteor.methods({
        createAppUser: function (obj) {

            var mainroom = Rooms.findOne({roomname: "mainroom"});
            var usernameId = new Meteor.Collection.ObjectID().valueOf();
            var userid = Accounts.createUser({
                username: usernameId,
                password: obj.password,
                profile: {
                    role: "user",
                    table: obj.table,
                    online: true,
                    username: obj.username,
                    rooms: [ mainroom
                    ]
                }
            });
            return usernameId;
        }
    });
}
