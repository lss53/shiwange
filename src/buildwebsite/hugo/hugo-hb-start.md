---
title: Hugo + HB start 主题构建导航页
shortTitle: 构建导航页
date: 2024-12-23
icon: fa-solid fa-star
order: 1
category:
  - Blog
tag:
  - hugo
---

## 安装 HB start 主题

::: info
[HB start 主题](https://github.com/hbstack/theme-start)
:::

示例平台：Windows 10。先用 Chocolatey 安装 `Go`、`Dart Sass`、`Hugo`、`Git`、`Node.js` 。建议尽可能使用这些工具的最新版本。

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

## 自定义搜索引擎

### 搜索引擎属性

|名字|类型|描述|
|:--|:--|:--|
|weight|number|较低的权重获得更高的优先级。|
	
### 内置搜索引擎

|名字|标识符|模块|
|:--|:--|:--|
|[百度](https://www.baidu.com/)|baidu|`github.com/hbstack/theme-start/engines/baidu`|
|[必应](https://www.bing.com/)|bing|`github.com/hbstack/theme-start/engines/bing`|
|[一只叛逆的鸭子](https://duckduckgo.com/)|duckduckgo|`github.com/hbstack/theme-start/engines/duckduckgo`|
|[谷歌](https://www.google.com/)|google|`github.com/hbstack/theme-start/engines/google`|
|[搜狗](https://www.sogou.com/)|sogou|`github.com/hbstack/theme-start/engines/sogou`|
|[维基百科](https://www.wikipedia.org/)|wikipedia|`github.com/hbstack/theme-start/engines/wikipedia`|
|[雅虎](https://www.yahoo.com/)|yahoo|`github.com/hbstack/theme-start/engines/yahoo`||
|[Yandex](https://yandex.com/)|yandex|`github.com/hbstack/theme-start/engines/yandex`|

### 搜索引擎配置

目录：`config/_default`，文件名：hugo.toml 或 hugo.yaml 或 hugo.json。

::: code-tabs#shell

@tab toml

```toml
[module]
  [[module.imports]]
    path = 'github.com/hbstack/theme-start/engines/google'
  [[module.imports]]
    path = 'github.com/hbstack/theme-start/engines/bing'
  [[module.imports]]
    path = 'github.com/hbstack/theme-start/engines/baidu'
  [[module.imports]]
    path = 'github.com/hbstack/theme-start/engines/duckduckgo'
[params]
  [params.hb]
    [params.hb.theme_start]
      [params.hb.theme_start.search_engines]
        [params.hb.theme_start.search_engines.baidu]
          weight = 3
        [params.hb.theme_start.search_engines.bing]
          weight = 2
        [params.hb.theme_start.search_engines.duckduckgo]
          weight = 4
        [params.hb.theme_start.search_engines.google]
          weight = 1
```

@tab yaml

```yaml
module:
  imports:
  - path: github.com/hbstack/theme-start/engines/google
  - path: github.com/hbstack/theme-start/engines/bing
  - path: github.com/hbstack/theme-start/engines/baidu
  - path: github.com/hbstack/theme-start/engines/duckduckgo
params:
  hb:
    theme_start:
      search_engines:
        baidu:
          weight: 3
        bing:
          weight: 2
        duckduckgo:
          weight: 4
        google:
          weight: 1
```

@tab json

```json
{
   "module": {
      "imports": [
         {
            "path": "github.com/hbstack/theme-start/engines/google"
         },
         {
            "path": "github.com/hbstack/theme-start/engines/bing"
         },
         {
            "path": "github.com/hbstack/theme-start/engines/baidu"
         },
         {
            "path": "github.com/hbstack/theme-start/engines/duckduckgo"
         }
      ]
   },
   "params": {
      "hb": {
         "theme_start": {
            "search_engines": {
               "baidu": {
                  "weight": 3
               },
               "bing": {
                  "weight": 2
               },
               "duckduckgo": {
                  "weight": 4
               },
               "google": {
                  "weight": 1
               }
            }
         }
      }
   }
}
```

:::

## 调整 HB start 主题外观

### 背景图像

把背景图像保存为：background.*（目前支持webp/png/jpg），粘贴到目录 `assets/images` 里面。

### Favicons

把 logo 图像保存为：logo.png，粘贴到目录 `assets/images` 里面。

## 管理应用程序

- 目录：`config/_default`，文件名：menus.toml 或 menus.yaml 或 menus.json。

::: code-tabs#shell

@tab toml

```toml
[[apps]]
  identifier = 'group-1'
  name = 'Group 1'
[[apps]]
  name = 'Foo'
  parent = 'group-1'
  url = 'https://example.org/foo'
[[apps]]
  identifier = 'group-2'
  name = 'Group 2'
[[apps]]
  name = 'Bar'
  parent = 'group-2'
  url = 'https://example.org/bar'

```

@tab yaml

```yaml
apps:
  - identifier: group-1
    name: Group 1
  - name: Foo
    parent: group-1
    url: https://example.org/foo
  - identifier: group-2
    name: Group 2
  - name: Bar
    parent: group-2
    url: https://example.org/bar
```

@tab json

```json
{
   "apps": [
      {
         "identifier": "group-1",
         "name": "Group 1"
      },
      {
         "name": "Foo",
         "parent": "group-1",
         "url": "https://example.org/foo"
      },
      {
         "identifier": "group-2",
         "name": "Group 2"
      },
      {
         "name": "Bar",
         "parent": "group-2",
         "url": "https://example.org/bar"
      }
   ]
}
```

:::

- `url`处添加网址后，能获取`favicon`就显示，不能获取`favicon`就显示第一个汉字或字母。

- 也可以自定义`icon`，以 `menus.yaml` 举例，代码如下，其中的`icon`可以[Hugomods](https://icons.hugomods.com/#search) 中找。

```yaml
apps:
  - identifier: group-1
    name: Group 1
  - name: Foo
    parent: group-1
    url: https://example.org/foo
    weight: 1
    params:
      icon:
        vendor: simple
        name: bilibili
```

- 在 `Hugomods` 搜索 `bilibili` 会显示三个结果，对应关系如下表。

|vendor|name|
|:--|:--|
|font-awesome-brands|bilibili|
|simple-icons|bilibili|
|tabler|'outline/brand-bilibili'|

::: info
`outline/brand-bilibili`要加英文单引号或双引号后，才能在 YAML 中起作用。
:::

## 设置 HB start 主题简繁英

::: info
- Hugo官方文档[（内容管理→多种语言）](https://gohugo.io/content-management/page-resources/#multilingual)
- `hbstack.dev`[多语言设置的例子](https://github.com/hbstack/site/tree/main/config/_default)
:::

## 推送到 GitHub

- 打开 [GitHub](https://github.com/) 新建一个存储库，在 `start-page` 目录中输入`cmd`按回车，依次输入下面的代码并按回车。

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

## 部署

通过 Cloudflare Pages 部署站点

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



