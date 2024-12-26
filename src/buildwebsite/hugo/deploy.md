---
title: 部署
icon: fa-solid fa-gears
order: 6
category:
  - Hugo
tag:
  - 部署
---

- 打开 [GitHub](https://github.com/) 新建一个存储库，显示在“在命令行上创建新存储库”处的命令，在 `start-page` 目录中输入`cmd`按回车，依次输入并按回车。

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main
```

- 如果在其他设备上修改了远程仓库代码，需要进行下面的操作。

```sh
#同步仓库
git pull origin main

#再修改/添加，并添加修改/新文件
git add .

#然后提交
git commit -m '描述'

#最后推送
git push origin main

```


- 通过 Cloudflare Pages 部署站点

  1. 登录 [Cloudflare](https://cloudflare.com) 。
  2. 下拉找到 `Workers 和 Pages`，单击`创建`，选 `Pages` ，再点`连接到Git`。
  3. 根据提示选择好`Git存储库`。
  4. 设置构建配置。
      - 构建命令：`npm ci && hugo`
      - 构建输出：`public`
  5. 环境变量。
      - HUGO_VERSION：Hugo版本号如`0.111.3`。
      - NODE_VERSION：Node.js版本号大于 `16` 就可以，如 `19` 。
      - EMBEDDED_DART_SASS_VERSION：Dart Sass版本号如 `1.62.1` 。

:::info
- Hugo最新版本号：https://github.com/gohugoio/hugo/releases
- Node.js 最新版本号：https://github.com/nodejs/node/releases
- Dart Sass最新版本号：https://github.com/sass/dart-sass/releases
:::