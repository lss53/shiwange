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
        prefix: "windows/",
        children: ["software/"],
      },

    ],
  },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
