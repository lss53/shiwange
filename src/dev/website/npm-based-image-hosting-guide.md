---
title: 利用 NPM 和 jsDelivr 搭建免费、稳定的个人图床
shortTitle: NPM 图床搭建
date: 2021-05-02
icon: fa-solid fa-cloud-arrow-up
order: 1
category:
  - 建站
tag:
  - npm
  - 图床
  - jsDelivr
  - CDN
description: 本文详细介绍了一种利用 NPM (Node Package Manager) 作为存储，结合 jsDelivr 的全球 CDN 网络来搭建免费、高速且稳定的个人图床方案，并提供了手动和 GitHub Action 自动化上传两种操作流程。
---

## 方案优势

将图片作为 NPM 包发布，可以利用其丰富的国内镜像节点和 [jsDelivr](https://www.jsdelivr.com/) 的全球 CDN 加速服务，实现快速、稳定的图片访问，是一种优秀的免费图床解决方案。

## 步骤一：准备 NPM 环境

### 1. 注册并登录 NPM 账户
- 访问 [NPM 官网注册页面](https://www.npmjs.com/signup) 创建一个账户。
- 登录后，请务必根据页面提示完成邮箱验证。

### 2. 在本地登录 NPM
打开终端（或在您的图床文件夹右键选择 `Git Bash Here`），执行以下命令并按提示输入您的 NPM 账号、密码和邮箱。

```bash
npm login
```

- **验证登录状态**: `npm whoami` (如果成功输出您的用户名，则表示已登录)
- **确保使用官方源**: `npm config set registry https://registry.npmjs.org`

## 步骤二：初始化本地项目

在您的图床文件夹中，执行初始化命令。

```bash
npm init -y
```

此命令会自动生成一个 `package.json` 文件。请用文本编辑器打开它，并修改 `"name"` 字段的值。

```json
{
  "name": "your-unique-package-name",
  "version": "1.0.0",
  ...
}
```

::: warning
包名 (`name`) 必须是**全局唯一**的。建议先在 NPM 官网搜索，确保您想用的名称未被占用。
:::

## 步骤三：上传图片

### 方法一：手动上传

#### 首次上传
1.  将您的图片文件放入项目文件夹。
2.  执行发布命令：
    ```bash
    npm publish
    ```
    首次发布的版本号默认为 `1.0.0`。

#### 后续更新
每次更新时，为了避免不必要的文件被上传，并能正确引用图片，请遵循以下步骤：

1.  **指定上传文件** (可选但推荐): 在 `package.json` 中添加 `files` 字段，明确列出您想要包含在包中的文件和文件夹。
    ```json
    "files": [
      "image1.png",
      "folder/"
    ],
    ```
2.  **更新版本号**: 手动修改 `package.json` 中的 `"version"` 字段，例如从 `1.0.0` 改为 `1.0.1`。版本号必须递增。
3.  **重新发布**:
    ```bash
    npm publish
    ```

### 方法二：通过 GitHub Actions 自动化上传

这种方式更高效，每次只需将图片推送到 GitHub 仓库即可自动完成发布。

1.  **生成 NPM Token**
    - 登录 NPM 官网，进入 `头像` → `Access Tokens` → `Generate New Token`。
    - 选择 `Automation` 类型，生成 Token 并**立即复制保存**，此 Token 只会显示一次。

2.  **配置 GitHub Secrets**
    - 创建一个新的 GitHub 仓库用于存放您的图床文件。
    - 进入仓库的 `Settings` → `Secrets and variables` → `Actions`。
    - 点击 `New repository secret`，创建一个名为 `NPM_TOKEN` 的 Secret，值为上一步生成的 NPM Token。

3.  **创建 Workflow 文件**
    - 在本地项目根目录下创建 `.github/workflows/publish.yml` 文件，内容如下：
    ```yaml
    name: Publish to NPM

    on:
      push:
        branches:
          - main # 当 main 分支有更新时触发

    jobs:
      publish:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-node@v3
            with:
              node-version: '18'
              registry-url: https://registry.npmjs.org/
          - run: npm publish
            env:
              NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    ```

4.  **推送更新**
    - 每次添加新图片后，修改 `package.json` 的版本号。
    - 执行 Git 命令将更改推送到 GitHub：
    ```bash
    git add .
    git commit -m "update: add new images"
    git push
    ```
    推送后，GitHub Actions 会自动执行发布流程。

## 步骤四：访问图片

推荐使用带版本号的 URL 格式，以确保链接的永久有效性。

**格式**: `https://cdn.jsdelivr.net/npm/包名@版本号/图片路径`

**示例**:
- `https://cdn.jsdelivr.net/npm/your-package-name@1.0.1/image1.png`
- `https://cdn.jsdelivr.net/npm/your-package-name@1.0.2/folder/image2.jpg`

其他可用 CDN 镜像：
- **知乎**: `https://unpkg.zhimg.com/包名@版本号/图片路径`
- **饿了么**: `https://npm.elemecdn.com/包名@版本号/图片路径`

## 管理已发布的包

- **撤销整个包** (慎用！24小时后不可撤销): `npm unpublish <包名> --force`
- **撤销指定版本**: `npm unpublish <包名>@<版本号>`

::: tip
请合理使用公共资源，此方法适用于个人博客、文档等少量图片的存储需求。
:::