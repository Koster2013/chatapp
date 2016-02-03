Template.users.helpers({
    thatsMe: function () {
        return _thatsMe(this.username);
    },
    users: function () {
        var tableSelected = Session.get("tableSelected");
        if (tableSelected == "all") {
            return Meteor.users.find({"profile.rooms.roomname": this.roomname, "profile.location": this.location});
        } else {
            console.log(this);
            return Meteor.users.find({
                "profile.rooms.roomname": this.roomname,
                "profile.location": this.location,
                "profile.table": tableSelected
            });
        }
    },
    avatar: function () {
        var profileimage = Meteor.users.findOne({username: this.username}).profile.image;
        if (profileimage == undefined) {
            return Meteor.absoluteUrl() + "placeholder.png";
        } else {
            return profileimage;
        }
    },
    tables: function () {
        var tables = [
            {number: "all"}
        ]
        var users = Meteor.users.find({"profile.rooms.roomname": this.roomname, "profile.location": this.location}).fetch();
        users.forEach(function (user) {
            tables.push({number: user.profile.table});
        });
        var destArray = _.uniq(tables, function (x) {
            return x.number;
        });
        return destArray;
    },
    status: function () {
        return this.profile.online == true ? "border-left: 10px solid #33cd5f;" : "border-left: 10px solid #ef473a;";
    },
    isMainRoom: function () {
        return this.roomname == "mainroom" ? true : false;
    }
})
;

Template.users.events({
    'click #createPrivateChat': function (e) {
        var currentLocation = Session.get("location");
        Meteor.call("createRoom", Meteor.user(), this, currentLocation, function (error, result) {
            Router.go('/dashboard/' + result);
        });
    },

    "change #tablePicker": function (evt) {
        var newValue = $(evt.target).val();
        Session.set("tableSelected", newValue);
    }
});

