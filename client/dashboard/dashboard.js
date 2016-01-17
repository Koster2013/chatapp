
Template.dashboard.helpers({
    userid: function () {
        return Meteor.userId();
    },
    roomname: function () {
        return Session.get("roomname");
    }
});


Template.dashboard.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};