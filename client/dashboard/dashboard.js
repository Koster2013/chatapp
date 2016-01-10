Template.dashboard.events({
    'click .sendMsg': function (e) {
        var el = document.getElementById("msg");
        Messages.insert({user: Meteor.userId(), msg: el.value, ts: new Date(), room: Session.get("roomname")});
        el.value = "";
        el.focus();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            var el = document.getElementById("msg");
            Messages.insert({user: Meteor.userId(), msg: el.value, ts: new Date(), room: Session.get("roomname")});
            el.value = "";
            el.focus();
        }
    }
});

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
    thatsMe: function () {
        return _thatsMe(this.profile.username) ? "background-color: mistyrose;" : "";
    },
    avatar: function () {
        return Meteor.users.findOne({_id: this.user}).profile.image
    },
    getUsername: function () {
        return Meteor.users.findOne({_id: this.user}).profile.username;
    },
    getTable: function () {
        return Meteor.users.findOne({_id: this.user}).profile.table
    }
});

Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.profile.username);
    },
    users: function () {
        return Meteor.users.find({"profile.rooms.roomname": Rooms.findOne({roomname: Session.get("roomname")}).roomname});
    },
    avatar: function () {
        return this.profile.image;
    },
    status: function () {
        return this.profile.status == true ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;"
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


Template.rooms.helpers({
    rooms: function () {
        return Rooms.find({"users.userid": Meteor.userId()});
    }
});


Template.rooms.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
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
                            // file has stored, close out interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1000);
                }
            });


        });

    }
});




