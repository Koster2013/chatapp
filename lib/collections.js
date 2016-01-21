Messages = new Meteor.Collection("messages");
Rooms = new Meteor.Collection("rooms");
imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
    stores: [imageStore]
});
//Houston.add_collection(Meteor.users);
Location = new Meteor.Collection("location");