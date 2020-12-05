export default {
  pages: [
    "pages/index/index",
    "pages/light/index",
    "pages/setting/index",
    "pages/machine/index",
  ],
  tabBar: {
    color: "#999999",
    selectedColor: "#f68717",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./assets/tabbar/index.png",
        selectedIconPath: "./assets/tabbar/index_selected.png",
        text: "首页"
      },
      {
        pagePath: "pages/light/index",
        iconPath: "./assets/tabbar/light.png",
        selectedIconPath: "./assets/tabbar/light_selected.png",
        text: "灯光"
      },
      {
        pagePath: "pages/machine/index",
        iconPath: "./assets/tabbar/machine.png",
        selectedIconPath: "./assets/tabbar/machine_selected.png",
        text: "设备"
      },
      {
        pagePath: "pages/setting/index",
        iconPath: "./assets/tabbar/setting.png",
        selectedIconPath: "./assets/tabbar/setting_selected.png",
        text: "设置"
      }
    ]
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#f68717",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white"
  }
};
