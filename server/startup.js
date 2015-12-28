if (Meteor.isServer) {

    Meteor.startup(function () {

    });


    Meteor.methods({
        createAppUser: function (obj) {
            Accounts.createUser({
                email: obj.email,
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
