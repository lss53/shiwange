---
title: 为华硕 FX - Pro 安装固态硬盘和 Windows 10 系统
date: 2021-08-12
icon: fas fa-laptop
order: 3
category:
  - Windows
tag:
  - SSD
---


## 安装固态硬盘(SSD)

暑假期间有小朋友的华硕(ASUS)FX - Pro笔记本启动慢，想请我帮忙重装下系统。

查看FX - Pro外观时，发现后盖上写着「M.2 2280 SLOT SUPPORT SATA SSD ONLY」，大意仅支持M.2 2280 SATA接口的固态硬盘；致电华硕官方，确认其主板固态硬盘接口类型为M.2，建议机主某东购买「三星（SAMSUNG） 860 EVO 250G M.2 2280 SATA协议固态硬盘」和某宝购买`M.2螺丝`。

固态硬盘和螺丝到货后，卸下FX - Pro后盖中间的两颗螺丝，取下盖板，主板固态硬盘插槽插上固态硬盘并用M.2螺丝将其固定，卡好后盖，拧紧后盖螺丝。

## 设置 Bios

本步骤目的仅为备忘；不建议操作，保持FX - Pro默认纯UEFI启动即可。

如何开启开启Launch CSM（兼容性支持模块）呢？ 

> * CSM全名Compatibility Support Module即兼容性支持模块，是UEFI的一个特殊模块，对于不支持UEFI的系统提供兼容性支持。
> * Launch CSM是bios里Boot菜单里的一个子项目（一些老的主板上没有此选项），与Secure Boot（安全启动）是并列项。
> * CSM开启使得可以支持UEFI启动和非UEFI启动。若是需要启动传统MBR设备，则需开启（Enabled）CSM。关闭（Disabled）CSM则变成纯UEFI启动，且完全支持安全启动。
> * bios里，← →方向键切换菜单（左右选择）；↑↓方向键选择项目（左右选择）；Enter键（回车，选择并确认）。

1. 开机或重启，狂按`ESC`键，调出`Please Select Boot Device`（启动项选择界面），按`↓`方向键选择`Enter Setup`，再按`Enter`键，进入Bios设置界面；按`F2`键可以直接进入Bios设置界面。

2. 按`→`方向键切换到`Security`菜单，按`↓`方向键选择`Secure Boot menu`并`回车`，按`↓`方向键选择`Secure Boot Control`并`回车`，按`↓`方向键选择`Disabled`（关闭）并`回车`。

3. 按`ESC`键，再按`←`方向键切换到`Boot`菜单，按`↓`方向键选择`Launch CSM`并按`回车`，按`↓`方向键选择`Enabled`（打开）并`回车`。

4. 按`F10`保存设置。

## 安装系统

自备uefi win10 pe启动U盘。开机狂按`ESC`键，调出`Please Select Boot Device`（启动项选择界面），按`↓`方向键选择带`UEFI`字样的U盘并`回车`；或者直接按`F2`。

### GUID 分区

> GUID分区表(简称GPT。使用GUID分区表的磁盘称为GPT磁盘)是源自EFI标准的一种较新的磁盘分区表结构的标准。

进入PE后，双击桌面上的「DG分区工具」，DiskGenius分区工具里右键选择硬盘，单击「快速分区」；分区表类型选择「GUID」也就是GPT，分区数目建议只「自定义1个分区」，固态硬盘还需勾选【对齐分区到此扇区】，扇区数默认`2048`即可，确定；会提醒你现有分区会被删除，如果有重要数据备份好了就点击是；之后软件自动执行硬盘分区以及格式化过程，分区之后，gpt分区表会有ESP、MSR两个额外分区；


### Setup 安装

PE系统里，右键单击「Windows 10系统镜像」，左键单击「装载」，双击「sources\setup.exe」，按提示选择「需要安装的版本」、勾选「我接受许可条款」、选择「自定义：仅安装Windows（高级）」、选择「系统要安装的分区」一般在MSR (保留)分区下面，不要选到其他分区上了；点击下一步安装。

### WinNTSetup 安装

双击PE桌面上的WinNTSetup，依次单击搜索或选择按钮「选择Windows安装文件的位置」为Windows 10系统镜像，「选择引导驱动器的位置」软件会自动加载无需要选择，「选择安装驱动器的位置」一般选择C盘。后面的为笔者常用，「无人值守」选择自制的「启用Administrator用户.xml」，「调整」选择「禁用UAC和Defender」

### EFI shell 安装

EFI_SHELL64.zip：<https://wwa.lanzoui.com/b04bsaxre#g6x4>  密码:g6x4

准备一个U盘至少8GB，格式化为FAT32分区，把「Windows 10系统镜像」解压到U盘根目录，把EFI_SHELL64.zip解压到U盘根目录。开机按F2进入bios，在EXIT菜单中有选项「Launch EFI shell from filesystem device」，按↓方向键选择并回车。启动EFI shell后，会有提示：
```shell
fs0 :..........
fs1 :..........
...
```
fs`数字`：指的就是硬盘上的FAT32分区，类似于windows下的`c:`，`d:`盘符。

在`Shell>`光标后，输入`fs0:`回车，进入该分区。命令`ls`可列出当前目录下的文件，如果能看到win10安装文件，就对了，如果没有，则切换为其它分区如`fs1:`，直到看到win10安装文件，再输入`bootmgfw.efi`，启动win10安装程序。