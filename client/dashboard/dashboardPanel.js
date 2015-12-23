/**
 * Created by mk on 18.06.15.
 */


Template.dashboardPanel.events({

    "keydown input#message": function (event) {
        if (event.which == 13) { // 13 is the enter key event

            var message = document.getElementById('message');
            if (message.value != '') {
                Messages.insert({
                    name: name,
                    message: message.value,
                    time: Date.now()
                });

                //message leeren
                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }

});


Template.messages.helpers({
    messages: function () {
        return Messages.find({}, {sort: {time: -1}});
    },

    table: function () {
        return Meteor.user().profile.table;
    },

    name: function () {
        return Meteor.user().emails[0].address;
    }


});

