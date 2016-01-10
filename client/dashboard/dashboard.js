Template.dashboard.events({
    'click .sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});


Template.dashboard.lastUpdate = function () {
    return Session.get('lastUpdate');
};


Template.messages.helpers({
    messages: function () {
        return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    },
    roomname: function () {
        return Session.get("roomname");
    },
    timestamp: function () {
        return this.ts.toLocaleString();
    },
    thatsMe: function (username) {
        return _thatsMe(username) ? "background-color: mistyrose;" : "";
    },
    avatar: function () {
        return getAvatarUrlMock(Meteor.userId());
    },
    avatarNew: function (userid) {
        return Meteor.users.findOne({_id: userid}).profile.image;
    },
    getUsername: function (userid) {
        return Meteor.users.findOne({_id: userid}).profile.username;
    },
    getTable: function (userid) {
        return Meteor.users.findOne({_id: userid}).profile.table;
    }
});

Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.profile.username);
    },
    users: function () {
        return Meteor.users.find({"profile.rooms": Rooms.findOne({roomname: Session.get("roomname")})});
    },
    avatar: function () {
        return getAvatarUrlMock(Meteor.userId());
    },
    avatarNew: function () {
        return this.profile.image;
    },
    status: function (status) {
        return status == true ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;"
    }
});


Template.rooms.helpers({
    rooms: function () {
        return Rooms.find();
    }
});


Template.rooms.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
        UI.insert(UI.render(Template.dashboard), document.body);
    },
    'change .myFileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    toastr.error("Upload failed... please try again.");
                } else {
                    var intervalHandle = Meteor.setInterval(function () {
                        console.log("Inside interval");
                        if (fileObj.hasStored("images")) {
                            // File has been uploaded and stored. Can safely display it on the page.
                            var userId = Meteor.userId();
                            var imagesURL = {
                                "profile.image": Meteor.absoluteUrl() + "/cfs/files/images/" + fileObj._id
                            };
                            Meteor.users.update(userId, {$set: imagesURL});
                            toastr.success('Upload succeeded!');
                            Session.set('profilePhotoUploaded', true);
                            // file has stored, close out interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1000);
                }
            });


        });

    }
});

Template.users.events({
    'click #createPrivateChat': function (e) {
        var users = [
            {"userid": this._id},
            {"userid": Meteor.userId()}
        ]
        Meteor.call("createRoom", users, function (error, result) {
            Session.set("roomname", result);
        });
    }

});



