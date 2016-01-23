_sendMessage = function (roomname) {
    var el = document.getElementById("msg");
    console.log(el.value.length)
    if(el.value.length > 0){
        Messages.insert({username: Meteor.user().username, msg: el.value, ts: new Date(), room: roomname});
        el.value = "";
        el.focus();
    }else{
        IonPopup.alert({
            title: 'Message',
            template: 'Leere Nachricht',
            okText: 'Ok'
        });
    }
};

_thatsMe = function (username) {
    var me = Meteor.user().username;
    return me == username ? true : false;
};


/*


 if (Meteor.isCordova) {

 _isConnected = function (callback) {
 var currentLocation = Location.findOne({locationname: "shisha"}).wlanssid;
 if (Meteor.isCordova) {
 var networkState = navigator.connection.type;
 if (networkState == "wifi") {
 WifiWizard.getCurrentSSID(function (success) {
 if (success.indexOf(currentLocation) > 0) {
 callback(undefined, true);
 } else {
 callback(undefined, false);
 }
 }, function (error) {
 console.log(error)
 callback(error, undefined);
 });
 }
 }
 }

 }

 */