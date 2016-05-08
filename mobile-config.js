App.info({
  name: 'LoMa Chat',
  description: 'Location based Chat',
  author: 'Erdem Guengoer and Marc Koster',
  email: 'erdemguengoer@googlemail.com',
  website: 'http://www.google.de',
  version: '1.0'
});

App.icons({
  /*
/iphone_2x (120x120)
iphone_3x (180x180)
ipad (76x76)
ipad_2x (152x152)
ipad_pro (167x167)
ios_settings (29x29)
ios_settings_2x (58x58)
ios_settings_3x (87x87)
ios_spotlight (40x40)
ios_spotlight_2x (80x80)
android_mdpi (48x48)
android_hdpi (72x72)
android_xhdpi (96x96)
android_xxhdpi (144x144)
android_xxxhdpi (192x192)
*/
  // iOS
  'iphone_2x': 'res/icons/Icon-120.png',
  'iphone_3x': 'res/icons/Icon-60@3x.png',
  'ipad': 'res/icons/Icon-76.png',
  'ipad_2x': 'res/icons/Icon-76@2x.png',
  'ios_settings': 'res/icons/Icon-Small.png',
  'ios_settings_2x': 'res/icons/Icon-Small@2x.png',
  'ios_settings_3x': 'res/icons/Icon-Small@3x.png',
  'ios_spotlight': 'res/icons/Icon-Small-40.png',
  'ios_spotlight_2x': 'res/icons/Icon-Small-40@2x.png',

  // Android
  'android_mdpi': 'res/icons/Icon-mdpi.png',
  'android_hdpi': 'res/icons/Icon-hdpi.png',
  'android_xhdpi': 'res/icons/Icon-xhdpi.png',
  'android_xxhdpi': 'res/icons/Icon-xxhdpi.png',
  'android_xxxhdpi': 'res/icons/Icon-xxxhdpi.png'
});

App.launchScreens({
  // iOS
/*  iphone_2x	640x960
      iphone5	640x1136
  iphone6	750x1334
      iphone6p_portrait	1242x2208
  iphone6p_landscape	2208x1242*/
  'iphone_2x': 'res/splash/hdpi/background.png',
  'iphone5': 'res/splash/hdpi/background.png',
  'iphone6': 'res/splash/xhdpi/background.png',
  'iphone6p_portrait': 'res/splash/xxhdpi/background.png',
  'iphone6p_landscape': 'res/splash/xxxhdpi/background.png',


  // Android
  'android_mdpi_portrait': 'res/splash/mdpi/background.png',
  'android_mdpi_landscape': 'res/splash/mdpi/background.png',
  'android_hdpi_portrait': 'res/splash/hdpi/background.png',
  'android_hdpi_landscape': 'res/splash/hdpi/background.png',
  'android_xhdpi_portrait': 'res/splash/xxxhdpi/background.png',
  'android_xhdpi_landscape': 'res/splash/xxxhdpi/background.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.accessRule("blob:*");
App.accessRule('*');