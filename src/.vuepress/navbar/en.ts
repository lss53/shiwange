import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Articles",
    icon: "book",
    prefix: "/en/",
    children: [
      {
        text: "Windows",
        // icon: "windows",
        prefix: "windows/",
        children: [
          { text: "Software", icon: "fa-solid fa-gear", link: "software/" },
          
        ],
      },

    ],
  },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
