Template.profile.helpers({
    avatar: function () {
        var profileimage = this.profile.image;
        if ( profileimage == undefined ) {
            return Meteor.absoluteUrl() + "placeholder.png";
        } else {
            return profileimage;
        }
    },
    thatsMe: function () {
        return _thatsMe(this.username);
    }
});

Template.profile.events({
    'change #myFileInput': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            console.log(file.size)
            if(file.size < 4000000){
                Images.insert(file, function (err, fileObj) {
                    if (err) {
                        IonPopup.alert({
                            title: 'Bild upload',
                            template: 'Bild upload fehlgeschlagen!',
                            okText: 'Ok'
                        });
                    } else {
                        var intervalHandle = Meteor.setInterval(function () {
                            console.log("Inside interval");
                            if (fileObj.hasStored("images")) {
                                // File has been uploaded and stored. Can safely display it on the page.
                                var imagesURL = {
                                    "profile.image": Meteor.absoluteUrl() + "/cfs/files/images/" + fileObj._id
                                };
                                Meteor.users.update(Meteor.userId(), {$set: imagesURL});
                                IonPopup.alert({
                                    title: 'Bild upload',
                                    template: 'Bild upload erfolgreich!',
                                    okText: 'Ok'
                                });
                                // file has stored, close out interval
                                Meteor.clearInterval(intervalHandle);
                            }
                        }, 1000);
                    }
                });
            }

        });
    }

})