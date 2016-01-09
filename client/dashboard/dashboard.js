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
    avatarNew: function () {

        return Meteor.user().profile.image;
    },
    getUsername: function (userid) {
        return Meteor.users.findOne({_id: userid}).profile.username;
    },
    getTable: function (userid) {
        return Meteor.users.findOne({_id: userid}).profile.table;
    }
});

Template.messages.onCreated(function(){
    // subscribe to the publication responsible for sending the Pushups
    // documents down to the client
    this.subscribe("Meteor.users");
    this.subscribe("Accounts");
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

Template.dashboard.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
    },
    'change .myFileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    // handle error
                } else {
                    // handle success depending what you need to do
                    var userId = Meteor.userId();
                    var imagesURL = {
                        "profile.image": Meteor.absoluteUrl() + "/cfs/files/images/" + fileObj._id
                    };
                    Meteor.users.update(userId, {$set: imagesURL});
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

Template.dashboard.rendered = function () {
    //IonSideMenu.snapper.settings({disable: 'left'});
};


