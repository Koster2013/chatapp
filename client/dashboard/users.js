Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.username);
    },
    users: function () {
        var location = Session.get("location");
        return Meteor.users.find({"profile.rooms.roomname": this.roomname, "profile.location": location});
    },
    avatar: function () {
        var profileimage = Meteor.users.findOne({username: this.username}).profile.image;
        if (profileimage == undefined) {
            return Meteor.absoluteUrl() + "placeholder.png";
        } else {
            return profileimage;
        }
    },
    status: function () {
        return this.profile.online == true ? "border-left: 10px solid #33cd5f;" : "border-left: 10px solid #ef473a;";
    }
});

Template.users.events({
    'click #createPrivateChat': function (e) {
        var currentLocation = Session.get("location");
        Meteor.call("createRoom", Meteor.user(), this, currentLocation, function (error, result ){
            Router.go('/dashboard/' + result);
        });
    }
});

