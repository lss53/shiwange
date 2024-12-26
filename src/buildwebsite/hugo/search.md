---
title: 搜索引擎
icon: fa-solid fa-magnifying-glass
order: 2
category:
  - Hugo
tag:
  - 搜索引擎
---

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