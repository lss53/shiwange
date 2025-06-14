---
title: ProxyPin：一款 GitHub 上星标 9k+ 的开源免费抓包工具，支持Windows、Mac、Android、IOS、Linux 全平台系统
shortTitle: ProxyPin
icon: fas fa-link
order: 8
date: 2025-06-14
category:
  - Software
tag:
  - ProxyPin
  - 网络软件
---

您可以使用它来拦截、检查和重写 HTTP（S）流量，支持 Flutter 应用抓包，ProxyPin 基于 Flutter 开发，UI 美观易用。

GitHub: https://github.com/wanghongenpin/proxypin

国内下载地址：https://gitee.com/wanghongenpin/proxypin/releases

证书安装流程介绍：https://www.bilibili.com/video/BV1Qm4y157Gk

::: tip 抓取夸克网盘签到参数流程（手机端）

1. 安装应用
   - 下载地址：[Github Releases](https://github.com/wanghongenpin/proxypin/releases)
   - 安装文件（根据设备架构选择）：
   - ProxyPin-android-arm64.apk（主流64位安卓设备）
   - ProxyPin-android.apk（32位或旧设备）

2. 配置ProxyPin
   - 打开 ProxyPin 应用。
   - 点击右上角 ⋮ （三个点图标）→ HTTPS代理。
   - 点击 `安装根证书` → 选择 `用户证书`（即非ROOT设备）。
   - 按提示完成证书安装。
   - 启用 `HTTPS代理` 开关。
   - 返回主界面，点击 ▶ （三角形图标）启动抓包。

3. 触发签到请求
   - 打开 夸克网盘APP。
   - 进入 签到页面（夸克首页右下角 ☰ 图标 → 会员中心 → 会员专属福利“每天免费领空间” ）。

4. 提取参数
   - 在 ProxyPin 抓包界面：
      - 域名列表 → 搜索 `drive-m`。
      - 找到目标域名：`https://drive-m.quark.cn`。
   - 展开域名下的请求列表，查找以下接口（任意一个）：
      - `GET /1/clouddrive/capacity/growth/info`
      - `GET /1/clouddrive/act/growth/reward`
   - 点击目标请求 → 查看 `General` 标签页，复制以下参数：
      - kps
      - sign
      - vcode
      - user  (该字段是用户名可是随意填写，多账户方便区分)
      
      ```
      例如: user=张三; url=https://drive-m.quark.cn/1/clouddrive/act/growth/reward?xxxxxx=xxxxxx&kps=abcdefg&sign=hijklmn&vcode=111111111;
      旧版环境变量格式也兼容，例如: user=张三; kps=abcdefg; sign=hijklmn; vcode=111111111;
      ```

> 参考: https://github.com/Liu8Can/Quark_Auot_Check_In

:::

