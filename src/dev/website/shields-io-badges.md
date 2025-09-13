---
title: 使用 Shields.io 创建自定义静态徽章
shortTitle: 创建静态徽章
date: 2024-12-24
icon: fas fa-shield-alt
order: 2
category:
  - 网站搭建
tag:
  - 徽章
  - Shields.io
  - Markdown
  - 静态网站
description: 学习如何使用 Shields.io 免费服务为你的项目或文档创建专业的静态徽章 (Badge)。本教程详细解释了路径参数和查询参数的使用方法，助你轻松定制标签、消息、颜色和样式。
---

## 前言

静态徽章（Badge）是项目 README 或文档中常见的元素，用于直观地展示状态信息，例如构建状态、代码覆盖率或版本号。`Shields.io` 是一个广受欢迎的免费服务，可以轻松制作这类徽章。

![静态徽章示例](https://img.shields.io/badge/build-passing-brightgreen)

要创建一个基础徽章，您可以访问 [Shields.io 官网](https://shields.io/badges)，在右侧的 `badgeContent` — `path` 输入框中填入特定格式的字符串（即[路径参数](#路径参数)），例如 `build-passing-brightgreen`，然后点击 `Execute` 即可预览。最后，根据需要复制页面上提供的 URL、Markdown、HTML 等格式的代码。

::: info
本文将深入讲解构成徽章 URL 的核心要素：**路径参数**和**查询参数**。
:::

## 路径参数 (Path Parameters)

路径参数是构成徽章内容的基础，格式为 `LABEL-MESSAGE-COLOR`，三部分由英文破折号 `-` 分隔。

| 参数 | 类型 | 示例 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | 字符串 | `build` | 徽章左侧显示的文本（标签）。 |
| `message` | 字符串 | `passing` | 徽章右侧显示的文本（消息）。 |
| `color` | 字符串 | `brightgreen` | 右侧消息部分的背景颜色。支持多种预设颜色名和十六进制代码。 |

## 查询参数 (Query Parameters)

查询参数（也称 URL 参数）用于对徽章进行更精细的样式定制，它们以 `?` 开头，并用 `&` 分隔。在 [Shields.io](https://shields.io/badges) 网站上，您需要展开 `+ Show optional parameters` 来设置这些选项。

常用的查询参数如下：

| 查询参数 | 类型 | 示例 | 说明 |
| :--- | :--- | :--- | :--- |
| `style` | 字符串 | `flat-square` | 定义徽章的整体样式。可选值包括 `flat` (默认)、`flat-square`、`plastic`、`for-the-badge` 和 `social`。 |
| `logo` | 字符串 | `github` | 在徽章左侧添加一个图标。图标名称 (slug) 来自 [Simple Icons](https://simpleicons.org/)，您可以直接在该网站复制图标的 slug。 |
| `logoColor` | 字符串 | `white` | 自定义 `logo` 图标的颜色。支持 CSS 颜色名、十六进制代码等。 |
| `labelColor` | 字符串 | `555` | 自定义徽章左侧 `label` 部分的背景颜色。 |
| `color` | 字符串 | `4c1` | 自定义徽章右侧 `message` 部分的背景颜色（会覆盖路径参数中的颜色设置）。 |
| `label` | 字符串 | `Health` | 覆盖路径参数中设置的左侧文本。注意：空格或特殊字符需要进行 [URL 编码](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)。 |
| `link` | 字符串 | `https://...` | 为徽章添加点击链接。格式为 `link=URL_A&link=URL_B`，第一个链接应用于徽章左侧，第二个应用于右侧。 |

**示例：一个应用了查询参数的复杂徽章**

```markdown
<!-- Markdown 格式 -->
![GitHub](https://img.shields.io/badge/Profile-GitHub-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)
```

**效果：**

![GitHub](https://img.shields.io/badge/Profile-GitHub-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)