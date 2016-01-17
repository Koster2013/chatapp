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
    }
});

Template.rooms.events({
    'click #room': function (e) {
        Session.set("roomname", this.roomname);
    }
});
