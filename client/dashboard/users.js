Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.username);
    },
    users: function () {
        console.log(this.roomname);
        return Meteor.users.find({"profile.rooms.roomname": this.roomname});
    },
    avatar: function () {
        var profileimage = Meteor.users.findOne({username: this.username}).profile.image;
        if ( profileimage == undefined ) {
            return Meteor.absoluteUrl() + "placeholder.png";
        } else {
            return profileimage;
        }
    },
    status: function () {
        return this.profile.online == true ? "border-left: 10px solid limegreen;" : "border-left: 10px solid red;";
    }
});

Template.users.events({
    'click #createPrivateChat': function (e) {
        Meteor.call("createRoom", Meteor.user(), this, function (error, result) {
                Router.go('/dashboard/' + result);
        });
    }
});

