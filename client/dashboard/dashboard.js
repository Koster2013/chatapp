
Template.dashboard.helpers({
    userid: function () {
        return Meteor.userId();
    }
});

Template.dashboard.events({
    'click #subscribe' : function () {
        return _meteorSubscribe();
    }
});

Template.dashboard.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};