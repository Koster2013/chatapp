
if (Meteor.isCordova) {
    console.log("Printed only in mobile cordova apps");
    Template.barcode.events({
        'click button': function () {

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }
    });
}
