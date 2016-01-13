Template.dashboard.events({
    'click #sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});
Template.dashboard.helpers({
    userid: function () {
        return Meteor.userId();
    },
    roomname: function () {
        return Session.get("roomname");
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
    },
    roomnameFormated: function () {
        if (this.roomname == "mainroom"){
            return "mainroom";
        }
        return this.users[0].profilename + "," + this.users[1].profilename;
        /*
        this.users.forEach(function (user) {
            console.log(user.username);
            if (user.username != Meteor.user().username){
                return user.profilename;
            }
        });
        */
    }
});

Template.rooms.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
    }
});




