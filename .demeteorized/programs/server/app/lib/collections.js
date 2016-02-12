(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Messages = new Meteor.Collection("messages");                          // 1
Rooms = new Meteor.Collection("rooms");                                // 2
imageStore = new FS.Store.GridFS("images");                            // 3
Images = new FS.Collection("images", {                                 // 4
    stores: [imageStore]                                               // 5
});                                                                    //
Location = new Meteor.Collection("location");                          // 7
                                                                       //
//Houston.add_collection(Meteor.users);                                //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collections.js.map
