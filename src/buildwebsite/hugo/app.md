---
title: 应用程序
icon: fa-solid fa-gears
order: 4
category:
  - Hugo
tag:
  - 应用程序
---

- 目录：`config/_default`，文件名：menus.toml 或 menus.yaml 或 menus.json。

::: code-tabs#shell

@tab toml

```toml
[[apps]]
  identifier = 'group-1'
  name = 'Group 1'
[[apps]]
  name = 'Foo'
  parent = 'group-1'
  url = 'https://example.org/foo'
[[apps]]
  identifier = 'group-2'
  name = 'Group 2'
[[apps]]
  name = 'Bar'
  parent = 'group-2'
  url = 'https://example.org/bar'

```

@tab yaml

```yaml
apps:
  - identifier: group-1
    name: Group 1
  - name: Foo
    parent: group-1
    url: https://example.org/foo
  - identifier: group-2
    name: Group 2
  - name: Bar
    parent: group-2
    url: https://example.org/bar
```

@tab json

```json
{
   "apps": [
      {
         "identifier": "group-1",
         "name": "Group 1"
      },
      {
         "name": "Foo",
         "parent": "group-1",
         "url": "https://example.org/foo"
      },
      {
         "identifier": "group-2",
         "name": "Group 2"
      },
      {
         "name": "Bar",
         "parent": "group-2",
         "url": "https://example.org/bar"
      }
   ]
}
```

:::

- `url`处添加网址后，能获取`favicon`就显示，不能获取`favicon`就显示第一个字符串。

- 也可以自定义`icon`，以 `menus.yaml` 举例，代码如下，其中的`icon`可以[Hugomods](https://icons.hugomods.com/#search) 中找。

```yaml
apps:
  - identifier: group-1
    name: Group 1
  - name: Foo
    parent: group-1
    url: https://example.org/foo
    weight: 1
    params:
      icon:
        vendor: simple
        name: bilibili
```

- 在 `Hugomods` 搜索 `bilibili` 会显示三个结果，对应关系如下表，实测前两组可用，第三组不知怎么用？也许是对应关系搞错了！

|vendor|name|
|:--|:--|
|font-awesome-brands|bilibili|
|simple-icons|bilibili|
|tabler|outline/brand-bilibili|