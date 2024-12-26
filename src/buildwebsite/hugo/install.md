---
title: 安装
icon: folder-plus
order: 1
category:
  - Hugo
tag:
  - 安装
---

示例平台：Windows 10。用 Chocolatey 安装 `Go`、`Dart Sass`、`Hugo`、`Git`、`Node.js` 。建议尽可能使用这些工具的最新版本。

```component VPBanner
title: 温馨提示
content: 本文默认你是配置环境变量的熟手，如果你没有相关的经验，请从<i>Chocolatey</i>开始。
background: var(--bg-10)
color: var(--banner-text)
logo: logo.svg
actions:
  - text: Chocolatey
    link: ../../windows/software/chocolatey.html
```

### 克隆仓库

```sh
git clone --depth 1 https://github.com/hbstack/theme-start
```

### 复制 Example Site

```sh
cp -r theme-start/exampleSite ./start-page
```


### 更改工作目录

```sh
cd start-page
```

### 重新初始化站点

```sh
rm go.mod go.sum config/_default/module.yaml
hugo mod init github.com/user/repo
```

### 导入主题和搜索引擎

目录：`config/_default`，文件名：module.toml 或 module.yaml 或 module.json。

::: code-tabs#shell

@tab toml

```toml
[[imports]]
  path = 'github.com/hbstack/theme-start'
[[imports]]
  path = 'github.com/hbstack/theme-start/engines/google'
[[imports]]
  path = 'github.com/hbstack/theme-start/engines/bing'
```

@tab yaml

```yaml
imports:
- path: github.com/hbstack/theme-start
- path: github.com/hbstack/theme-start/engines/google
- path: github.com/hbstack/theme-start/engines/bing

```

@tab json

```json
{
   "imports": [
      {
         "path": "github.com/hbstack/theme-start"
      },
      {
         "path": "github.com/hbstack/theme-start/engines/google"
      },
      {
         "path": "github.com/hbstack/theme-start/engines/bing"
      }
   ]
}

```

:::

### 安装依赖项

```sh
npm ci
```

### 启动 Hugo 服务器

```sh
hugo server
```