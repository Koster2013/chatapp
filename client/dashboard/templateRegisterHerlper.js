Template.registerHelper(
    "isCordova", function () {
        if (Meteor.isCordova) {
            return true;
        } else {
            return false;
        }
    }
);