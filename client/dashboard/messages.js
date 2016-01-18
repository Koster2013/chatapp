
Template.messages.helpers({
    messages: function () {
        return Messages.find({room: this.roomname}, {sort: {ts: -1}});
    },
    timestamp: function () {
        return moment(this.ts).format('HH:ss');
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
        return Meteor.users.findOne({username: this.username}).profile.table;
    }
});

Template.messages.events({
    'click #sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});


Template.messages.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};