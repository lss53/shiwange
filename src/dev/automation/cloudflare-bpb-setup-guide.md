---
title: BPB Worker Panel 完整部署指南：自动同步与Cloudflare配置
shortTitle: BPB Worker Panel 部署指南
date: 2025-10-27
icon: cloud
order: 5
category:
  - 自动化脚本
tag:
  - BPB
  - Cloudflare
  - GitHub Actions
  - 自动同步
  - 网络部署
description: 完整详细的 BPB Worker Panel 部署指南，涵盖 GitHub Actions 自动代码同步和 Cloudflare Pages 手动配置，包含基础部署、高级优化和故障排除，帮助用户快速搭建稳定的网络代理服务。
---

## 项目概述
- **仓库名称**: Worker-AutoSync
- **核心功能**: 自动同步上游 BPB Worker Panel 代码 + Cloudflare Pages 部署
- **自动化组件**: GitHub Actions 工作流
- **部署平台**: Cloudflare Pages

## 第一部分：GitHub Actions 自动同步配置

### 工作流配置

```yml
# 文件位置: .github/workflows/sync_worker_code.yml
name: 同步上游 Worker 代码 (Zip 解压优化版)

on:
  schedule:
    - cron: '0 2 * * 1'   # 每周一02:00 UTC运行一次
  workflow_dispatch:      # 允许手动触发

jobs:
  update:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write

    steps:
      - name: Checkout 仓库
        uses: actions/checkout@v4

      # 步骤 1: 获取版本信息并判断是否需要更新
      - name: 检查版本并获取最新版本
        id: check_versions
        run: |
          # 1. 获取最新正式版标签
          LATEST_TAG=$(curl -s https://api.github.com/repos/bia-pain-bache/BPB-Worker-Panel/releases/latest | jq -r '.tag_name')
          
          if [ -z "$LATEST_TAG" ]; then
            echo "::error::未找到最新正式发布版本，退出。"
            exit 1
          fi
          
          # 2. 获取本地版本
          if [ -f "version.txt" ]; then
            CURRENT_VERSION=$(cat version.txt | tr -d '\n' | tr -d '\r')
          else
            CURRENT_VERSION=""
          fi
          
          echo "最新版本: $LATEST_TAG"
          echo "当前本地版本: ${CURRENT_VERSION:-未找到}"
          
          # 3. 比较版本，设置是否需要更新
          if [ "$CURRENT_VERSION" = "$LATEST_TAG" ]; then
            echo "No update needed."
            echo "need_update=false" >> $GITHUB_ENV
          else
            echo "Update needed. New tag: $LATEST_TAG"
            echo "latest_tag=$LATEST_TAG" >> $GITHUB_ENV
            echo "need_update=true" >> $GITHUB_ENV
            echo "download_url=https://github.com/bia-pain-bache/BPB-Worker-Panel/releases/download/$LATEST_TAG/worker.zip" >> $GITHUB_ENV
          fi

      # 步骤 2: 下载、解压文件并更新版本号 (仅在需要更新时执行)
      # 优化：不再手动安装 unzip，ubuntu-latest 默认包含了大多数常用工具
      - name: 下载并解压 worker.zip
        if: env.need_update == 'true'
        run: |
          TEMP_ZIP="worker_temp.zip"
          
          echo "正在下载文件: ${{ env.download_url }}"
          # 使用 curl 下载 zip 文件
          curl -L -o "$TEMP_ZIP" "${{ env.download_url }}"
          
          echo "正在解压文件..."
          # 解压 zip 文件到当前目录，这将覆盖 _worker.js
          unzip -o "$TEMP_ZIP"
          
          # 删除临时下载的 zip 文件
          rm "$TEMP_ZIP"
          
          # 将最新标签名写入 version.txt
          echo "${{ env.latest_tag }}" > version.txt

      # 步骤 3: 提交更改 (使用专用的 Git Auto Commit Action 替代原生 git 命令)
      # 优化：使用 Action 替代 4 行原生 shell 命令
      - name: 提交更新到 GitHub
        if: env.need_update == 'true'
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "🔄 Auto Sync Worker: Update to version ${{ env.latest_tag }}"
          # 不使用 --force，因为我们只是在添加或修改 _worker.js 和 version.txt
```

### Wrangler 配置
```toml
# 文件: wrangler.toml
name = "wk-auto-updater-zip"
main = "_worker.js"
compatibility_date = "2024-10-23"
```

### 验证步骤
1. 确保 GitHub Actions 工作流文件正确配置
2. 访问 Actions → 同步上游 Worker 代码 (Zip 解压版) → Run workflow
3. 刷新页面确认工作流执行成功

## 第二部分：Cloudflare Pages 初始部署

### 创建 Cloudflare 账户
1. 注册/登录 Cloudflare 账户

### 创建 Pages 项目
1. 控制台 → 技术和AI → Workers 和 Pages → 创建应用程序
2. 选择 Pages 选项卡 → 导入现有 Git 存储库 → 开始使用
3. 连接 GitHub 账户 → 选择 `Worker-AutoSync` 仓库
4. 保存并部署 → 继续处理项目

### 处理预期错误
部署完成后，访问页面会出现错误：
```
❌ Something went wrong!
Please set UUID and Trojan password first. Please visit here to generate them.
```

**这是正常现象**，按照以下步骤解决：
1. 点击错误信息中的 "here" 链接
2. 在新页面中生成 UUID 和密码
3. **重要**: 不要关闭此页面，后续步骤需要使用

## 第三部分：Cloudflare 环境配置

### 创建 Workers KV 存储
1. 控制台 → 存储与数据库 → Workers KV
2. 点击 "Create Instance"
3. 输入命名空间名称 → 创建

### 绑定 KV 到 Pages 项目
1. 返回 Pages 项目 → 设置 → 绑定
2. 点击 "添加绑定"
3. 选择 "KV 命名空间"
4. 变量名称: `kv`
5. KV 命名空间: 选择刚创建的命名空间
6. 保存

### 配置环境变量
1. Pages 项目 → 设置 → 变量与机密
2. 点击 "添加变量"
3. 返回之前生成的密钥页面，点击 "Copy all"
4. 在变量名称处右键粘贴，系统会自动识别并添加三个参数
5. 保存

## 第四部分：完成部署

### 重新部署项目
1. Pages 项目 → 部署 → 所有部署
2. 选择最新部署 → 点击横向三点菜单 → 重试部署
3. 等待部署完成

### 访问和管理面板
1. 部署完成后，访问 "域" 链接 + `/panel`
   - 例如: `https://your-project.pages.dev/panel`
2. 设置管理员密码
   - 要求: 至少8位，包含大写字母和数字
3. 使用新密码登录


## 第五部分：高级优化配置（可选）

### 代理 IP 优化
1. Pages 项目 → 设置 → 变量和机密 → 添加
2. 变量名称: `PROXY_IP`
3. 值: `bpb.yousef.isegaro.com` 或 [IP 列表](https://www.nslookup.io/domains/bpb.yousef.isegaro.com/dns-records/)`151.213.181.145, 5.163.51.41, bpb.yousef.isegaro.com`
4. 保存

### NAT64 预设修复
1. 同上位置添加变量
2. 变量名称: `NAT64_PREFIX`
3. 值: 从 [NAT64 前缀列表](https://github.com/bia-pain-bache/BPB-Worker-Panel/blob/main/NAT64Prefixes.md) 获取
4. 保存

### 设置回退域
1. 同上位置添加变量
2. 变量名称: `FALLBACK`
3. 值: 例如 `npmjs.org`
4. 保存

### 更改订阅路径
1. 同上位置添加变量
2. 变量名称: `SUB_PATH`
3. 值: 使用 [UUID 生成器](https://1024tools.com/uuid) 生成或自定义路径
4. 保存并重新部署

### 自定义域名
1. Pages 项目 → 自定义域 → 设置自定义域
2. 输入域名 (如 shop.example.com)
3. 继续 → 激活域名

## 第六部分：订阅使用

### 清洁 IP 扫描(可选)
- 登录面板 → VLESS - Trojan → Clean IPs / Domains
- **工具**: [Cloudflare Clean IP Scanner](https://github.com/bia-pain-bache/Cloudflare-Clean-IP-Scanner)、[CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest)
- **使用方法**: 下载运行，结果保存在 result.csv
- **建议**: Windows 环境运行，测试时断开 VPN
- 其他保存默认。点 Apply 。

### 获取订阅链接
1. 登录面板 → Subscriptions → Normal
2. 根据使用的代理软件，点击对应的 "Copy subscription URL"
3. 复制生成的订阅链接

## 参考资源

https://hanscn.com/post/bpb

https://www.kekehub.com/2025/09/bpbnat.html

https://bia-pain-bache.github.io/BPB-Worker-Panel/installation/pages-manual
