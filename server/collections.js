Rooms.deny({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Messages.deny({
    insert: function (userId, doc) {
        return (userId === null);
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
Messages.allow({
    insert: function (userId, doc) {
        return (userId !== null);
    }
});

Images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});

Meteor.users.allow({
    remove: function (userId, doc) {
        return true;
    }
});

Meteor.publish("images", function(){ return Images.find(); });

Meteor.publish("rooms", function () {
    return Rooms.find();
});
Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {ts: -1}});
});

imageStore.on('stored', Meteor.bindEnvironment(function(fileObj, storeName) {
    console.log("onStrored");
    if (storeName === 'imageStore') {
        Meteor.users.update({_id: fileObj.metadata.owner}, {
            $set: {
                'profile.image': 'https://your AWS region domain/your bucket name/your folder path/' + fileObj._id + '-' +fileObj.name()
            }
        });
    }
}, function() { console.log('Failed to bind environment'); }));

Meteor.methods({
    'getUsers': function( users ){
        if ( users == undefined) {
            console.log("jo ich bim mainroom")
            return Meteor.users.find({  }).fetch()
        }else {
            console.log("hier net")
            return Meteor.users.find({ "$and": users }).fetch()
        }
    },
    "createRoom": function ( users ) {
        var roomname = new Meteor.Collection.ObjectID().valueOf();
        Rooms.insert({roomname: roomname});
        Meteor.users.update(users[0].userid, { $push: {"profile.rooms": { roomname: roomname }}});
        Meteor.users.update(users[1].userid, { $push: {"profile.rooms": { roomname: roomname }}})
        return roomname;
    },
    "inserMyFile": function ( file, user ) {
        Images.insert(file, function (err, fileObj) {
            if (err) {
                console.log(err)
                // handle error
            } else {
                // handle success depending what you need to do
                var userId = user.userId();
                var imagesURL = {
                    "profile.image":  "/cfs/files/images/" + fileObj._id
                };

                Meteor.users.update({_id: userId}, {
                    $set: {
                        'profile.image': 'http://localhost:3000' + fileObj._id
                    }
                });
            }
        });
    }


});

