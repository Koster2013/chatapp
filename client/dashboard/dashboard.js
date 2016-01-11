Template.dashboard.events({
    'click #sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    },
    'change #myFileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    toastr.error("Upload failed... please try again.");
                } else {
                    var intervalHandle = Meteor.setInterval(function () {
                        console.log("Inside interval");
                        if (fileObj.hasStored("images")) {
                            // File has been uploaded and stored. Can safely display it on the page.
                            var imagesURL = {
                                "profile.image": Meteor.absoluteUrl() + "/cfs/files/images/" + fileObj._id
                            };
                            Meteor.users.update(Meteor.userId(), {$set: imagesURL});
                            toastr.success('Upload succeeded!');
                            // file has stored, close out interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1000);
                }
            });
        });
    }
});

Template.messages.helpers({
    messages: function () {
        return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    },
    timestamp: function () {
        return this.ts.toLocaleString();
    },
    thatsMe: function () {
        return _thatsMe(this.username) ? "bubbledLeft" : "bubbledRight";
    },
    avatar: function () {
        return Meteor.users.findOne({username: this.username}).profile.image
    },
    username: function () {
        return Meteor.users.findOne({username: this.username}).profile.profilename;
    },
    table: function () {
        return Meteor.users.findOne({username: this.username}).profile.table
    }
});

Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.username);
    },
    users: function () {
        return Meteor.users.find({"profile.rooms.roomname": Session.get("roomname")});
    },
    avatar: function () {
        return this.profile.image;
    },
    status: function () {
        return this.profile.online == true ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;";
    }
});

Template.users.events({
    'click #createPrivateChat': function (e) {
        Meteor.call("createRoom", Meteor.user(), this , function (error, result) {
            Session.set("roomname", result);
        });
    }
});

Template.rooms.helpers({
    rooms: function () {
        return Rooms.find({"users.username": Meteor.user().username});
    },
    roomselected: function () {
        return  this.roomname == Session.get("roomname")  ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;" ;
    }
});

Template.rooms.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
    }
});




