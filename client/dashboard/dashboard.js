
Template.dashboard.helpers({
    userid: function () {
        return Meteor.userId();
    }
});

Template.dashboard.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'left'});
};