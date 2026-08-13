# 博客目录结构与维护手册

> **最后更新**：2026-08-13
> **状态**：分类重构已完成

---

## 一、核心分类逻辑

本博客按 **“读者意图”** 组织内容（不是按平台或技术），确保每篇文章唯一归属：

| 支柱 | 读者意图 | 核心标签 |
|:-----|:---------|:---------|
| **开发·工具** | “我要**创造**数字产品” | 环境配置 / 网站搭建 / 自动化脚本 |
| **软件·应用** | “我要**使用/消费**数字工具” | Windows工具 / 网络增强 / 通信插件 |
| **生活·指南** | “我要**改善**现实生活” | 烹饪 / 健康 / 出行 / 种植 |

---

## 二、完整目录结构（46篇）

```
src/
├── dev/                              # 开发·工具（18篇）
│   ├── env/                          # 环境与语言（6篇）
│   │   ├── chocolatey.md
│   │   ├── nvs.md
│   │   ├── rust-windows-mingw-setup.md
│   │   ├── pystand.md
│   │   ├── latex-intro.md
│   │   └── office-c2r-deployment.md
│   ├── website/                      # 网站与博客（7篇）
│   │   ├── vuepress-hope-blog.md
│   │   ├── hugo-hbstart-nav.md
│   │   ├── homer-dashboard-cloudflare.md
│   │   ├── onemanager-vercel-disk.md
│   │   ├── npm-image-host.md
│   │   ├── shields-io-badges.md
│   │   └── vuepress-neodb-integration.md
│   └── automation/                   # 自动化与云脚本（5篇）
│       ├── paddleocr-guide.md
│       ├── tencent-ocr-guide.md
│       ├── bpb-panel-cfnew-deployment.md
│       ├── quark-autocheckin.md
│       └── wechat-dual-cover.md
├── tools/                            # 软件·应用（14篇）
│   ├── windows/                      # Windows实用工具（9篇）
│   │   ├── tc-config-update.md
│   │   ├── proxifier-guide.md
│   │   ├── firefox-libportable.md
│   │   ├── imagemagick-svg-to-ico.md
│   │   ├── subtitle-mosaic.md
│   │   ├── ode-downloader.md
│   │   ├── wechat-video-downloader.md
│   │   ├── asus-fx-pro-ssd-upgrade.md
│   │   └── windows-10-iot-ltsc.md
│   └── network/                      # 通信与网络增强（5篇）
│       ├── qauxiliary-xposed-module.md
│       ├── liteloaderqqnt.md
│       ├── proxypin-guide.md
│       ├── google-play-alternatives.md
│       └── multimedia-interfaces.md
├── life/                             # 生活·指南（14篇）
│   ├── cooking/                      # 烹饪美食（5篇）
│   │   ├── pickled-chili-recipe.md
│   │   ├── poached-pork-slices.md
│   │   ├── scallion-pork-filling.md
│   │   ├── sweet-rice-wine.md
│   │   └── universal-sauces-cooking.md
│   ├── health/                       # 健康指南（6篇）
│   │   ├── dietary-guidelines.md
│   │   ├── exercise-guide.md
│   │   ├── choosing-safe-milk.md
│   │   ├── protect-your-eyesight.md
│   │   ├── medical-insurance-family.md
│   │   └── clinic-prescriptions.md
│   ├── travel/                       # 出行攻略（1篇）
│   │   └── 12306-points-tickets.md
│   └── gardening/                    # 种植技术（1篇）
│       └── vegetables.md
└── movies.md                           # 影单（独立入口）
```

---

## 三、分类迁移对照表（旧 → 新）

> 用于理解文件从哪里移动过来的

| 旧分类 | 新分类 | 文件数 | 目标目录 |
|:-------|:-------|:------:|:---------|
| `Office` | 开发·工具 | 1 | `dev/env/` |
| `Windows技巧` | 软件·应用 | 2 | `tools/windows/` |
| `Windows软件`（开发类） | 开发·工具 | 6 | `dev/env/` |
| `Windows软件`（日常类） | 软件·应用 | 7 | `tools/windows/` |
| `网站搭建` | 开发·工具 | 7 | `dev/website/` |
| `自动化脚本` | 开发·工具 | 5 | `dev/automation/` |
| `Android应用` | 软件·应用 | 5 | `tools/network/` |
| `烹饪` | 生活·指南 | 5 | `life/cooking/` |
| `健康生活` | 生活·指南 | 6 | `life/health/` |
| `出行攻略` | 生活·指南 | 1 | `life/travel/` |
| `种植技术` | 生活·指南 | 1 | `life/gardening/` |

---

## 四、新增文章发布检查清单

> 每次新增文章时，按以下步骤操作，确保一致性

- [ ] **1. 确定分类**：属于“创造”、“使用”还是“生活”？ → 确定三大支柱之一
- [ ] **2. 确定子分类**：放到对应的二级目录（如 `dev/env/`、`tools/windows/`、`life/cooking/`）
- [ ] **3. 设置 frontmatter**：
  ```yaml
  ---
  title: 文章标题
  shortTitle: 短标题
  date: YYYY-MM-DD
  icon: fa-solid fa-xxx
  order: 1          # 同一目录下的显示顺序（数字越小越靠前）
  category: 开发·工具  # 可以是单行字符串，也可以是列表格式
  tag:
    - 标签1
    - 标签2
  description: 文章简介（SEO用）
  ---
  ```
- [ ] **4. 更新导航栏**：如果新增了二级分类，需在 `src\.vuepress\navbar\zh.ts` 中添加对应菜单项
- [ ] **5. 更新侧边栏**：如果新增了二级分类，需在 `src\.vuepress\sidebar\zh.ts` 中添加对应菜单项
- [ ] **6. 更新本结构文档**：在目录树中补充新文件
- [ ] **7. 测试**：`pnpm docs:dev` 预览，确认显示正常

---

## 五、常用维护命令

| 操作 | 命令 |
|:-----|:-----|
| 本地预览 | `pnpm docs:dev` |
| 构建生产版本 | `pnpm docs:build` |
| 强制清理缓存 | `pnpm docs:clean-dev` |

---

## 六、重要配置文件索引

| 文件路径 | 用途 |
|:---------|:-----|
| `.vuepress/navbar/zh.ts` | 导航栏菜单配置 |
| `.vuepress/sidebar/zh.ts` | 侧边栏菜单配置 |
| `.vuepress/theme.ts` | 主题与侧边栏配置 |
| `.vuepress/config.ts` | 站点基础配置 |

---

## 七、注意事项

1. **`category` 字段格式**：必须是**单行字符串**（如 `category: 开发·工具`），不要使用多行列表格式（`category:\n  - xxx`）。
2. **`order` 字段**：控制同一子目录下文章在侧边栏/列表中的排序，数字越小越靠前。
3. **短标题（`shortTitle`）**：用于导航或卡片中显示，若省略则使用 `title`。
4. **图标规范**：优先使用 Font Awesome 免费图标，格式为 `fa-solid fa-xxx` 或 `fa-brands fa-xxx`。
5. **URL 规则**：VuePress 默认使用文件名作为 URL（如 `chocolatey.md` → `/dev/env/chocolatey/`）。移动文件后必须配置 301 重定向。

---

## 八、未来扩展预留

| 目录 | 可扩展方向 |
|:-----|:-----------|
| `dev/env/` | 新增 Docker、Kubernetes、Go 等环境配置 |
| `dev/website/` | 新增 Astro、Next.js、Hexo 等框架教程 |
| `dev/automation/` | 新增爬虫、CI/CD、AI 应用 |
| `tools/windows/` | 新增系统优化、备份恢复、硬件检测工具 |
| `tools/network/` | 新增 VPN、代理协议、内网穿透工具 |
| `life/cooking/` | 新增烘焙、甜品、地方菜系 |
| `life/health/` | 新增心理健康、睡眠管理、常见病科普 |
| `life/travel/` | 新增自驾攻略、住宿推荐、行程规划 |
| `life/gardening/` | 新增花卉种植、果树修剪、有机堆肥 |
