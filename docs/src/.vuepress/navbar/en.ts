import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Articles",
    icon: "book",
    prefix: "/en/posts/",
    children: [
      {
        text: "Software",
        icon: "screwdriver-wrench",
        prefix: "software/",
        children: [
          { text: "Common", icon: "screwdriver-wrench", link: "README.md" },
          
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
