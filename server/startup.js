if (Meteor.isServer) {

    Meteor.startup(function () {
        Messages.remove({});
        Rooms.remove({});
        Rooms.insert({roomname: "mainRoom"});

        //console.log(Meteor.call("getUsers").fetch());
    });


    Meteor.methods({
        createAppUser: function (obj) {
            Accounts.createUser({
                username: obj.username,
                password: obj.password,
                profile: {
                    role: "user",
                    table: obj.table,
                    online: true
                }
            });
        }
    });

}
