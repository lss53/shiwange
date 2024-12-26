---
title: 部署项目
date: 2024-12-22
icon: rocket
order: 9
category:
  - Blog
tag:
  - Vuepress
---

- 打开 [GitHub](https://github.com/) 新建一个存储库，显示在“在命令行上创建新存储库”处的命令，在 `F:\tmp\docs\` 目录中输入`cmd`按回车，依次输入并按回车。

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main
```

- 部署 VuePress 项目。

::: info 部署项目
- [快速上手→部署项目](https://theme-hope.vuejs.press/zh/get-started/deploy.html)
:::