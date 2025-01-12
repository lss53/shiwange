---
title: NPM 图床
date: 2021-05-02
icon: fas fa-images
order: 1
category:
  - 建站
tag:
  - npm
  - 图床
---

眼下找一个稳定白嫖的图床实属不易，npm方案是个不错的选择，白嫖npm丰富的国内镜像节点。

## 注册 NPM

1. [npm官网](https://www.npmjs.com/signup)，自备`木弟`子。
2. 登录官网，左上角可以看到`You have not verified your email address`字样的提示，点击以后按提示步骤验证你的邮箱。

## NPM 用户设置

<kbd>本地图床文件夹（如d:\img）右键单击</kbd> → <kbd>左键单击Git Bash Here</kbd>→ <kbd>终端窗口</kbd>

终端窗口执行下面的命令，之后会提示你输入你的npm账号、密码、注册邮箱。
```bash
npm login
```
> `npm whoami`可以检查登录情况，有账号输出表示已登录。
> `npm login`是`npm adduser`的别名，作用和adduser完全一样。

```
Username: your-username
Password: your-password
Email: (this IS public) xxxxx@xx.com
Logged in as your-username on https://registry.npmjs.org/.
```

> 如果是官方源`https://registry.npmjs.org`就不需要执行下面的命令

切换npm官方源的命令

```bash
npm config set registry https://registry.npmjs.org
```

## 本地初始化

```bash
npm init -y
```
命令执行后，会自动生成`package.json`文件,文本编辑软件打开，会看到`"name": "img"`。

```json
  "name": "img",
  "version": "1.0.0",
```

里面的`img`需要修改，建议先到npm官网搜索你想用的包名，搜不到就说明还没被占用就修改成它。

## 上传

### 首次

本地图床文件夹里添加自己要上传的图片，执行命令即可。

```bash
npm publish
```

> 每次发布的都是单独的包，为了上传的图片能正常访问，请记住本次上传图片对应的版本号(首次默值1.0.0)。

### 非首次

package.json里设置files白名单，规定上传哪些文件到npm。

```json
"files": [
    "beautiful.png",
    "/photo/npm.png"
   ],
```

建议把代码放在`author`之前以免出现错误。
其中，`beautiful.png`表示上传该图片；`/photo/npm.png`表示只上传该文件夹里的图片npm.png。

以后每次上传图片，按下面的步骤来操作：
1. 把该图片放在本地图库里，只把它添加到files白名单里。
2. 更改`version`版本号 (递增)。
3. 执行`npm publish`即可。

一通操作后的优点：本地和线上仓库各有一份，方便日后写离线PDF；缺点：自备`木弟`子。为了能正常访问，请记住每次上传图片对应的版本号。

### `非首次`逼格上传

使用Github action自动完成。
- <kbd>npm官网</kbd> → <kbd>头像</kbd> → <kbd>Access Tokens</kbd> → <kbd>Generate New Token</kbd>，勾选`Automation`选项。
> Token只会显示这一次，之后如果忘记了就只能重新配置生成。
- Github新建一个仓库(如img)，设置项里添加一个名为`NPM_TOKEN`的secrets，把获取的`Npm token`粘贴进去。
- 本地img文件夹下创建img/.github/workflows/npm.yml，内容如下。
> .github怎样创建？`Git Bash`终端执行命令`mkdir .github`

```yml
name: npm

on:
  push:
    branches:
      - main

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "12.x"
          registry-url: https://registry.npmjs.org/
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
``` 
    
- 增减图片后、更改`version版本号` (递增)，图床根目录打开`Git Bash`终端窗口执行命令：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <HTTPS链接>
git push -u origin main
```

上传完毕后，即可触发Github action自动部署，逼格高吧！

- 为了能正常访问，请记住每次上传图片对应的版本号。

## 访问

### 用版本号（建议）

- jsDelivr：`https://cdn.jsdelivr.net/npm/包名@版本号/图片路径`
- 知乎镜像：`https://unpkg.zhimg.com/包名@版本号/图片路径`
- bdstatic：`https://code.bdstatic.com/npm/包名@版本号/图片路径`

示例：

```text
https://cdn.jsdelivr.net/npm/xxx@1.0.0/beautiful.png
https://cdn.jsdelivr.net/npm/xxx@1.0.0/photo/npm.png
```
其中，`XXX`（包名），`1.0.0`（版本号），`beautiful.png`或`photo/npm.png`（图片路径）

### 不用版本号

这引用格式默认访问最新版本号`@latest`。多次上传后，用这种格式引用的图片就访问不了。

`https://cdn.jsdelivr.net/npm/包名/图片路径`

示例

```text
https://cdn.jsdelivr.net/npm/xxx/npm.png
```

## 删除(撤销)

> `xxx`为npm包名

### 删整个包

```bash
npm unpublish xxx --force
```

### 删某个版本
```bash
npm unpublish xxx@1.0.2
```


## 后记

请勿浪费公共资源，少量图片还是可以的。