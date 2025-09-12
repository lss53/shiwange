title: 使用 Shields.io 制作静态徽章 (Badge) 的入门指南
shortTitle: Shields.io 徽章制作
date: 2024-12-24
icon: fas fa-shield-halved
order: 2
category:
  - 建站
tag:
  - 徽章
  - Shields.io
  - Markdown
description: 本指南详细介绍了如何使用 Shields.io 快速创建自定义静态徽章（Badge），内容涵盖基础的路径参数用法和高级的查询参数定制，助您美化项目文档与个人主页。
---

## 什么是静态徽章？

静态徽章是一种简洁美观的视觉元素，常用于 GitHub 项目、文档或个人网站中，用以展示状态、信息或标签。例如：

![静态徽章示例](https://img.shields.io/badge/build-passing-brightgreen)

本文将指导您如何通过 [Shields.io](https://shields.io/badges) 快速创建这类徽章。

## 快速上手

1.  访问 [Shields.io 静态徽章制作页面](https://shields.io/badges)。
2.  在页面右侧找到 `badgeContent` 的输入框。
3.  输入**路径参数**，例如 `build-passing-brightgreen`。
4.  点击 `Execute` 按钮，下方会立即生成预览。
5.  从 `URL`, `Markdown`, `HTML` 等格式中复制您需要的代码即可。

## 核心概念：路径参数

路径参数是生成徽章最基础、最核心的部分，它由三部分构成，并用英文破折号 `-` 分隔。

**格式**: `LABEL-MESSAGE-COLOR`

| 参数      | 类型   | 示例        | 说明                 |
| :-------- | :----- | :---------- | :------------------- |
| `LABEL`   | 字符串 | `build`     | 徽章左侧显示的文本   |
| `MESSAGE` | 字符串 | `passing`   | 徽章右侧显示的文本   |
| `COLOR`   | 字符串 | `brightgreen` | 徽章右侧的背景颜色   |

::: tip
`MESSAGE` 部分是可选的。如果省略，徽章将只显示 `LABEL` 和 `COLOR`。
:::

## 进阶玩法：查询参数

除了基础的路径参数，Shields.io 还支持通过 URL 查询参数（Query Parameters）进行更精细的定制。在[制作页面](https://shields.io/badges)上，点击 `+ Show optional parameters` 即可看到所有可用选项。

以下是几个常用参数的说明：

| 查询参数     | 类型   | 示例             | 说明                                                                                             |
| :----------- | :----- | :--------------- | :----------------------------------------------------------------------------------------------- |
| `style`      | 字符串 | `flat-square`    | 定义徽章的样式。可选值包括 `flat`, `flat-square`, `plastic`, `for-the-badge`, `social`。默认为 `flat`。 |
| `logo`       | 字符串 | `github`         | 在徽章左侧添加一个图标。图标名称来自 [Simple Icons](https://simpleicons.org/)，直接复制 slug 即可。    |
| `logoColor`  | 字符串 | `white` 或 `FFF` | 设置 `logo` 图标的颜色。支持 CSS 颜色名、十六进制等格式。                                          |
| `labelColor` | 字符串 | `grey`           | 自定义徽章左侧（Label）的背景颜色。                                                                |
| `color`      | 字符串 | `blue`           | 覆盖路径参数中设置的右侧颜色。                                                                   |
| `label`      | 字符串 | `Version`        | 覆盖路径参数中设置的左侧文本。如果包含空格或特殊字符，需要进行 [URL 编码](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)。 |

### 组合示例

让我们创建一个带有 GitHub 图标、样式为 `flat-square` 的徽章。

**Markdown 代码**:
```markdown
![GitHub](https://img.shields.io/badge/Profile-MyGitHub-blue?style=flat-square&logo=github&logoColor=white)
```

**效果**:

![GitHub](https://img.shields.io/badge/Profile-MyGitHub-blue?style=flat-square&logo=github&logoColor=white)














