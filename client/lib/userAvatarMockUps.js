/**
 * Created by mk on 24.03.15.
 */

uI_FACES = [
    "http://uifaces.com/faces/_twitter/ShaunMoynihan_120.jpg",
    "http://uifaces.com/faces/_twitter/blakesimkins_120.jpg",
    "http://uifaces.com/faces/_twitter/nckjrvs_120.jpg",
    "http://uifaces.com/faces/_twitter/cameronmoll_120.jpg",
    "http://uifaces.com/faces/_twitter/timothycd_120.jpg",
    "http://uifaces.com/faces/_twitter/jayrobinson_120.jpg",
    "http://uifaces.com/faces/_twitter/damenleeturks_120.jpg",
    "http://uifaces.com/faces/_twitter/danielhaim_120.jpg",
    "http://uifaces.com/faces/_twitter/motherfuton_120.jpg",
    "http://uifaces.com/faces/_twitter/kolage_120.jpg",
    "http://uifaces.com/faces/_twitter/alagoon_120.jpg",
    "http://uifaces.com/faces/_twitter/daryl_120.jpg",
    "http://uifaces.com/faces/_twitter/ripplemdk_120.jpg",
    "http://uifaces.com/faces/_twitter/zulsdesign_120.jpg",
    "http://uifaces.com/faces/_twitter/VinThomas_120.jpg",
    "http://uifaces.com/faces/_twitter/andrewpautler_120.jpg",
    "http://uifaces.com/faces/_twitter/jayman_120.jpg",
    "http://uifaces.com/faces/_twitter/garrettgee_120.jpg",
    "http://uifaces.com/faces/_twitter/ogvidius_120.jpg",
    "http://uifaces.com/faces/_twitter/gilbertglee_120.jpg",
    "http://uifaces.com/faces/_twitter/calebogden_120.jpg",
    "http://uifaces.com/faces/_twitter/benhowdle_120.jpg",
    "http://uifaces.com/faces/_twitter/jonsuh_120.jpg",
    "http://uifaces.com/faces/_twitter/ThisIsJohnBrown_120.jpg",
    "http://uifaces.com/faces/_twitter/deimler_120.jpg"
];


getAvatarUrlMock = function (userid) {
    var min = 1;
    var max = uI_FACES.length;
    var x = Math.round(Math.random() * (max - min)) + min;

        return uI_FACES[x];
};
