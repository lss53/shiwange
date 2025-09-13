---
title: 利用 NPM 和 jsDelivr 搭建免费稳定图床
shortTitle: NPM 搭建图床
date: 2021-05-02
icon: fa-brands fa-npm
order: 1
category:
  - 网站搭建
tag:
  - npm
  - 图床
  - jsDelivr
  - GitHub Actions
description: 本教程介绍一种利用 NPM 作为免费、稳定的图床方案，通过国内丰富的镜像节点（如 jsDelivr）实现快速图片访问。内容涵盖 NPM 账号注册、包发布、版本管理及 GitHub Actions 自动化上传。
---

## 方案优势

利用 NPM (Node Package Manager) 托管图片，并通过 jsDelivr 等 CDN 服务进行全球加速，是一种经济且稳定的“白嫖”图床方案。其主要优势在于 NPM 拥有众多国内镜像节点，访问速度快且服务稳定。

## 一、准备工作

### 1. 注册 NPM 账户
访问 [NPM 官网](https://www.npmjs.com/signup) 注册一个账户，并完成邮箱验证。

### 2. 本地登录 NPM
在您计划存放图片的本地文件夹（例如 `D:\my-images`）中打开终端（如 Git Bash），然后执行登录命令：

```bash
# 确保当前源是官方源
npm config set registry https://registry.npmjs.org

# 登录 NPM
npm login
```
根据提示输入您的用户名、密码和邮箱。完成后，可以通过 `npm whoami` 命令检查登录状态。

## 二、创建并配置 NPM 包

### 1. 初始化项目
在您的图片文件夹中，执行初始化命令，这将生成一个 `package.json` 文件。

```bash
npm init -y
```

### 2. 修改包名
用文本编辑器打开 `package.json` 文件，修改 `"name"` 字段。**这个名称必须是 NPM 上唯一的**，建议先在 NPM 官网搜索以确保名称未被占用。例如，修改为 `"my-image-hosting"`。

## 三、上传图片

### 首次上传

1.  将您要上传的图片放入该文件夹。
2.  执行发布命令：

    ```bash
    npm publish
    ```
    首次发布的版本默认为 `1.0.0`。

### 后续更新

为了更精确地管理文件，建议在 `package.json` 中使用 `"files"` 字段指定要上传的文件列表。

```json
{
  "name": "my-image-hosting",
  "version": "1.0.1",
  "description": "",
  "main": "index.js",
  "files": [
    "image1.png",
    "folder/image2.jpg"
  ],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

每次更新图片的步骤如下：
1.  将新图片放入文件夹，并更新 `package.json` 中的 `"files"` 列表。
2.  **手动增加 `package.json` 中的 `"version"` 版本号** (例如从 `1.0.0` 改为 `1.0.1`)。版本号必须递增。
3.  再次执行 `npm publish`。

## 四、自动化上传 (通过 GitHub Actions)

您可以设置 GitHub Actions，在将图片推送到 GitHub 仓库时自动发布到 NPM。

1.  **生成 NPM Token**：在 NPM 官网 `头像` → `Access Tokens` → `Generate New Token`，选择 `Automation` 类型并生成。**请务必立即复制并保存这个 Token**。
2.  **配置 GitHub Secrets**：在您的 GitHub 仓库 `Settings` → `Secrets and variables` → `Actions` 中，新建一个名为 `NPM_TOKEN` 的 Repository secret，值为上一步生成的 Token。
3.  **创建 Workflow 文件**：在本地图片文件夹下创建 `.github/workflows/npm-publish.yml` 文件，内容如下：

    ```yml
    name: Publish to NPM

    on:
      push:
        branches:
          - main

    jobs:
      publish:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-node@v3
            with:
              node-version: "18.x"
              registry-url: https://registry.npmjs.org/
          - run: npm publish
            env:
              NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    ```
4.  **触发自动发布**：之后，您只需将新图片添加到本地文件夹，修改 `package.json` 版本号，然后 `git push` 到 GitHub，即可自动触发发布。

## 五、访问图片

推荐使用带版本号的 URL 格式，以确保链接的永久有效性。

- **jsDelivr**: `https://cdn.jsdelivr.net/npm/包名@版本号/图片路径`
- **知乎镜像 (unpkg)**: `https://unpkg.zhimg.com/包名@版本号/图片路径`
- **百度镜像**: `https://code.bdstatic.com/npm/包名@版本号/图片路径`

**示例**：
```
https://cdn.jsdelivr.net/npm/my-image-hosting@1.0.1/folder/image2.jpg
```

::: warning
请合理使用公共资源，此方法适用于个人博客、文档等少量图片的托管。
:::

## 六、删除包 (撤销发布)

如果您需要删除已发布的包或某个版本，可以使用 `unpublish` 命令。**此操作不可逆，请谨慎使用**。

```bash
# 删除整个包
npm unpublish 包名 --force

# 删除特定版本
npm unpublish 包名@版本号
```