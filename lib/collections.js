Messages = new Meteor.Collection("messages");
Rooms = new Meteor.Collection("rooms");
imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
    stores: [imageStore]
});
Location = new Meteor.Collection("location");
Meldeuser = new Meteor.Collection("meldeuser");

NotificationHistory = new Mongo.Collection("notification_history");

//Houston.add_collection(Meteor.users);