Template.registerHelper(
    "isCordova", function () {
        if (Meteor.isCordova) {
            return true;
        } else {
            return false;
        }
    },
    'isIOS', function () {
        return ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    }
);