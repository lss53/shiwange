---
title: 静态徽章
date: 2024-12-24
icon: fas fa-shield
order: 2
category:
  - 建站
tag:
  - 徽章
---

## 前言

- 静态徽章（下图）可以用`Shields.io`制作。

![静态徽章](https://img.shields.io/badge/build-passing-brightgreen)

- 打开 [Shields.io](https://shields.io/badges)，找到网页右侧的`badgeContent`— path，输入 `build-passing-brightgreen` （[路径参数](#路径参数)），点`Execute`，等待`静态徽章`出现。

- 复制你需要的格式代码（URL/Markdown/rSt/AsciiDOC/HTML）。

::: info
什么是路径参数呢？
:::

## 路径参数

- `路径参数`是必需的，由label(标签)、message(消息)（可选）和color(颜色)组成，中间用`英文破折号`分隔，例子见[前言](#前言)。

|路径参数|类型|例子|说明|
|:--|:--|:--|:--|
|label(标签)|字符串|build|左侧文本|
|message(消息)（可选）|字符串|passing|右侧字符|
|color(颜色)|字符串|brightgreen|右侧部分的背景颜色|

::: info
进阶玩法需要了解[查询参数](#查询参数)（可选）。 [Shields.io](https://shields.io/badges)网页上需要展开 `+ Show optional parameters` 按需要填写，
一般只需要选择`style`，填写`logo`、`logoColor`、`labelColor`、`color`。
:::

## 查询参数

|查询参数|类型|例子|说明|
|:--|:--|:--|:--|
|style|字符串|flat|徽章徽章吃可选值：flat、flat-square、plastic、for-the-badge、social。如果未指定，则默认为 “flat”。|
|logo|字符串|appveyor|来自 simple-icons 的 icon slug，可单击 [simple-icons](https://simpleicons.org/)上面图标标题复制 slug。|
|logoColor|字符串|violet|徽标的颜色（支持 hex、rgb、rgba、hsl、hsla 和 css 命名颜色）。支持简单图标 logo，但不支持自定义 logo。|
|logoSize|字符串|auto|通过设置为auto使图标自适应地调整大小。对于一些较宽的 logo（如 amd 和 amg ）很有用。支持简单图标 logo，但不支持自定义 logo。|
|label|字符串|healthiness|覆盖默认的左侧文本（空格或特殊字符需要 [URL 编码](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)）。|
|labelColor|字符串|abcdef|左侧部分的背景颜色（支持十六进制、rgb、rgba、hsl、hsla 和 css 命名颜色）。|
|color|字符串|fedcba|右侧部分的背景颜色（支持十六进制、rgb、rgba、hsl、hsla 和 css 命名颜色）。|
|cacheSecond|字符串|3600|HTTP 缓存生命周期（应用规则以基于每个徽章推断默认值，指定的任何低于默认值的值都将被忽略），单位为秒。|
|link|字符串|`<object><img>`|指定单击徽章的左侧/右侧应执行的操作。请注意，这仅在将徽章集成到 HTML 标记中时有效，而不适用于标记或标记语言。|














