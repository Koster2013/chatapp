App.info({
  name: 'LoMa Chat',
  description: 'Location based Chat',
  author: 'Erdem Guengoer and Marc Koster',
  email: 'erdemguengoer@googlemail.com',
  website: 'http://www.google.de',
  version: '1.0'
});

App.icons({
  // iOS
  'iphone': 'res/icons/hdpi/ic_launcher.png',
  'iphone_2x': 'res/icons/xhdpi/ic_launcher.png',
  'iphone_3x': 'res/icons/xxhdpi/ic_launcher.png',


  // Android
  'android_ldpi': 'res/icons/mdpi/ic_launcher.png',
  'android_mdpi': 'res/icons/mdpi/ic_launcher.png',
  'android_hdpi': 'res/icons/hdpi/ic_launcher.png',
  'android_xhdpi': 'res/icons/xhdpi/ic_launcher.png'
});

App.launchScreens({
  // iOS
/*  iphone_2x	640x960
      iphone5	640x1136
  iphone6	750x1334
      iphone6p_portrait	1242x2208
  iphone6p_landscape	2208x1242*/
  'iphone': 'res/splash/mdpi/background.png',
  'iphone_2x': 'res/splash/hdpi/background.png',
  'iphone5': 'res/splash/hdpi/background.png',
  'iphone6': 'res/splash/xhdpi/background.png',
  'iphone6p_portrait': 'res/splash/xxhdpi/background.png',
  'iphone6p_landscape': 'res/splash/xxxhdpi/background.png',


  // Android
  'android_ldpi_portrait': 'res/splash/mdpi/background.png',
  'android_ldpi_landscape': 'res/splash/mdpi/background.png',
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