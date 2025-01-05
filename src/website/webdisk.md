---
title: OneManager + Onedrive + Vercel 构建网盘
shortTitle: 构建导航页
date: 2024-01-31
icon: fas fa-cloud
order: 6
category:
  - Blog
tag:
  - Disk
---

##	前提条件

一个 e5 账号、一个 Vercel 账号、一个域名。

## 申请应用程序ID和客户端密码

### 申请应用程序(客户端)ID

1. 打开 <https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade>，登入你的e5账号。

2. 点击`+新注册`。

3. 名称：输入一个名字，例如 onemanager 。

4. `受支持的帐户类型` `谁能使用此应用程序或访问此 API?`：勾选`任何组织目录(任何 Microsoft Entra ID 租户 - 多租户)中的帐户和个人 Microsoft 帐户(例如 Skype、Xbox)`

5. `重定向 URI (可选)` -> `选择平台`在下拉菜单里选择`Web`，网址处输入 `https://scfonedrive.github.io` 。

6. 点击`注册`。

7. 复制并保存 `应用程序(客户端) ID`（即client_id） 。


### 申请客户端密码

1. 点击`onemanager`，进入`管理`菜单。

2. 点击`证书和密码`。

3. 点击`+新客户端密码`。

4. 在添加客户端密码界面的`说明`处填写`one`（如果填写 client secret 会报错），`截止期限`选择`730天(24个月)`，点击`添加`。

5. 复制并保存`客户端密码(1)`的`值`，即client_secret。

::: caution
除了刚刚创建时，之后无法查看客户端密码值。务必在创建时保存密码，然后再离开该页面。
:::
			
6. 点`API 权限` -> `Microsoft Graph(1)` -> `委托的权限` -> `选择权限`搜索框中搜索并勾选下面三项：

```
User.Read（这项应该一开始就勾选了）
Files.Read.All
offline_access
```	

7. 点击`更新权限`。


## 创建Vercel Token
	
打开<https://vercel.com/account/tokens>，`TOKEN NAME` 处填写名字，`SCOPE` 处选择 `full account`，`EXPIRATION` 处选择 `no expiration` 是永不过期的意思，点击 `Create` 创建，复制并保存得到的 token ，后面会用到它。

## 部署OneManager

1. 打开<https://github.com/qkqpttgf/OneManager-php/archive/refs/heads/master.zip>，下载文件 OneManager-php-master.zip

2. 打开<https://scfonedrive.github.io/Vercel/Deploy.html>

3. `And input Token` 处粘贴 `Vercel Token` ，并点击`Check`，显示`Success! Hello null!` 表示token正确。

4. `Choose the zip file` 处点击`选择文件`，选择下载好的 OneManager-php-master.zip 。

5. 其他保持默认。

6. 点击 `Deploy` 。

7. 等待一会儿，出现 `Deploy success!` 表示部署成功。

8. 打开 `Deploy success!` 下面的任意网址登录，开始[配置OneManager](#配置OneManager)。

::: warning

提示：以后登录建议使用`第一个`网址（Vercel -> onemanager也能找到），用绑定的域名登录有可能会出现下面的错误提示：

```
sha1.js not loaded.
Load from program?
```

:::

## 配置OneManager

1. 点击`点击开始安装程序`，`language`选择`简体中文`，`Token`处填写 `token` （如果忘记了可再新建一个），`Set admin password`输入管理密码，最后点`确定`，等待自动结束。

2. 点`返回首页`，再点左上角`登录`按钮，填写刚才设置的密码，点`登录`。

3. 左上角`管理` -> `设置`，选择`OneDrive` `添加盘`（也可以挂载其他厂商的网盘）。

4. 设置 `Select Account Type`，`标签`和`显示名称`可以填一样的（如disk），再根据自己 OneDrive 选择版本，如果是e5开发者建议勾选`用自己申请的应用ID与机密，不用OneManager默认的`输入自己的`client_id`和`client_secret`（[申请教程](申请应用程序ID和客户端密码)）。

5. 点击`确认`，等待自动跳转到 OneDrive 登录界面，选择`你的e5账号`输入对应的密码，点`登录`，`请求征得的许可`点`接受`。

6. 等待一段时间，完成后会自动跳转到 `Select Driver` 界面，保持默认，即勾选 `Use OneDrive` ，点`确认`。

7. 再等待一段时间，出现 `diskSpace	xx.xx MB / 5 TB` 表示配置成功。

## 设置disk

public_path: `/public/`，点`设置`。


## 设置平台变量

disableShowThumb: `true`
hideFunctionalityFile: `true`
passfile: `.password`
sitename: `xxx网盘`
theme: `classic.html`（为空也是这个，即默认的）

点`设置`。

::: tip
如果看不到文件请刷新缓存：管理 -> `刷新当前目录的缓存`。
:::

##	绑定域名

1. 打开<https://vercel.com>， `Overview` -> `onemanager` -> `Settings` -> `Domains`，输入要添加的域名，点击 `add` 。

2. 打开<https://www.dnspod.cn/>，给域名添加一个A解析，类型：A，名称：@，内容：`76.223.126.88`。给域名添加一个 cname 解析，类型：CNAME，名称：www，内容：`cname-china.vercel-dns.com`

3. 等待一段时间后，域名解析生效，就可用刚才添加的域名访问。
