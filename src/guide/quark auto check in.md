
---
title: 夸克网盘自动签到
date: 2025-06-20
icon: fa-brands fa-github
order: 7
category:
  - 攻略
tag:
  - 夸克网盘
---

BNDou大佬的项目中夸克网盘自动签到的子功能：<https://github.com/BNDou/Auto_Check_In/blob/main/checkIn_Quark.py>

修改过程：

``` python
os.environ['COOKIE_QUARK'] = ''

try:  # 异常捕捉
    from notify import send  # 导入消息通知模块
except Exception as err:  # 异常捕捉
    print('%s\n❌加载通知服务失败~' % err)
```

改成

``` python
cookie_list = os.getenv("COOKIE_QUARK").split('\n|&&')

# 替代 notify 功能
def send(title, message):
    print(f"{title}: {message}")
```


```component VPBanner
title: 温馨提示
content: 不会抓取手机端夸克网盘签到参数，请从<i>ProxyPin</i>开始。
background: var(--bg-10)
color: var(--banner-text)
logo: logo.svg
actions:
  - text: ProxyPin
    link: ../apps/proxypin.md
```