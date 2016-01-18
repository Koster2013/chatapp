Template.profile.helpers({
    thatsMe: function () {
        return _thatsMe(this.username);
    }
});

Template.profile.events({
    'click #myFileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    toastr.error("Upload failed... please try again.");
                } else {
                    var intervalHandle = Meteor.setInterval(function () {
                        console.log("Inside interval");
                        if (fileObj.hasStored("images")) {
                            // File has been uploaded and stored. Can safely display it on the page.
                            var imagesURL = {
                                "profile.image": Meteor.absoluteUrl() + "/cfs/files/images/" + fileObj._id
                            };
                            Meteor.users.update(Meteor.userId(), {$set: imagesURL});
                            toastr.success('Upload succeeded!');
                            // file has stored, close out interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1000);
                }
            });
        });
    }
})