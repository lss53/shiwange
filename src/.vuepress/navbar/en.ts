import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Articles",
    icon: "book",
    prefix: "/en/",
    children: [
      {
        text: "Windows Apps",
        // prefix: "windows/",
        children: ["toolkit/software/"],
      },

    ],
  },
  {
    text: "Hope Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
