
Template.dashboard.helpers({
    userid: function () {
        return Meteor.userId();
    }
});

Template.dashboard.events({
    'click #subscribe' : function () {
        var location = Session.get("location");
        return _meteorSubscribe(location);
    }
});

Template.dashboard.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};