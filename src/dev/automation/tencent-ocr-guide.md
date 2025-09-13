---
title: 腾讯云 OCR API 批量识别表格实战指南
shortTitle: 腾讯云 OCR 批量识别
date: 2025-06-20
icon: fa-solid fa-cloud
order: 6
category:
  - 自动化脚本
tag:
  - Python
  - OCR
  - 腾讯云
  - 表格识别
  - API
description: 本指南详细介绍了如何使用腾讯云 OCR 的表格识别 API 进行批量图片处理，内容覆盖从账号注册、密钥获取到 Python SDK 的单张及多线程批量识别代码实现，并包含将识别结果转换为 Excel 的方法。
---

## 一、准备工作：开通腾讯云服务

### 1. 注册与登录
访问[腾讯云官网](https://cloud.tencent.com)完成账号的注册或登录。

### 2. 实名认证
根据服务要求，个人或企业用户需在[认证中心](https://console.cloud.tencent.com/developer/auth)完成实名认证。

### 3. 开通文字识别 (OCR) 服务
在[腾讯云控制台](https://console.cloud.tencent.com)中搜索“文字识别”，进入服务页面后点击“立即开通”。

### 4. 获取 API 密钥
为保障账户安全，强烈建议通过[访问管理 (CAM)](https://console.cloud.tencent.com/cam/capi) 创建子账号并为其生成专用的 API 密钥 (SecretId 和 SecretKey)。
- **操作路径**：用户列表 → 新建用户 → 快捷创建 → 授予 `QcloudOCRReadSelfUinUsage` 权限 → 创建用户 → 进入用户详情 → API密钥 → 新建密钥。
- **重要提示**：`SecretKey` 仅在创建时显示一次，请务必妥善保管。

### 5. 了解计费与免费额度 (可选)
腾讯云 OCR 的部分接口提供每月免费调用额度（如通用文字识别1000次）。超出部分将按量计费，详情请参考[官方计费说明](https://cloud.tencent.com/product/ocr/pricing)。

## 二、Python 调用`表格识别(V3)` API

### 1. 处理单张图片

您可以直接从腾讯云官方的 [API Explorer](https://cloud.tencent.com/document/sdk) 获取基础代码示例。以下是一个结合本地图片处理的完整示例，请将代码中的 `SecretId` 和 `SecretKey` 替换为您自己的密钥。

::: details 示例代码：识别本地图片
```python
# -*- coding: utf-8 -*-

import json
import base64
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.ocr.v20181119 import ocr_client, models

try:
    # 1. 读取图片并转换为Base64编码
    with open("本地图片路径.jpg", "rb") as image_file:  # 替换为你的图片路径
        image_base64 = base64.b64encode(image_file.read()).decode('utf-8')

    # 2. 初始化认证对象和客户端
    cred = credential.Credential("YOUR_SECRET_ID", "YOUR_SECRET_KEY")
    httpProfile = HttpProfile()
    httpProfile.endpoint = "ocr.tencentcloudapi.com"
    clientProfile = ClientProfile()
    clientProfile.httpProfile = httpProfile
    client = ocr_client.OcrClient(cred, "ap-guangzhou", clientProfile)  # 替换为你的地域

    # 3. 构建请求
    req = models.RecognizeTableAccurateOCRRequest()
    params = {
        "ImageBase64": image_base64
    }
    req.from_json_string(json.dumps(params))

    # 4. 发送请求并打印结果
    resp = client.RecognizeTableAccurateOCR(req)
    print(resp.to_json_string())

except TencentCloudSDKException as err:
    print(err)
```
:::

### 2. 将 JSON 结果转换为 Excel

获取到 API 返回的 JSON 数据后，可以利用 Python 的 `openpyxl` 库将其解析并存为 Excel 文件。

::: details 示例代码：JSON 转 Excel
```python
# -*- coding: utf-8 -*-

import json
import openpyxl
from openpyxl.styles import Alignment

# 假设 data 是从API获取的JSON解析后的字典
# data = json.loads(resp.to_json_string())

# 提取表格数据
main_table = data['TableDetections']  # 通常主表格在索引1
cells = main_table['Cells']

# 创建Excel工作簿和工作表
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "识别结果"

# 填充数据并处理合并单元格
merged_cells = set()
for cell in cells:
    row_start = cell['RowTl'] + 1
    col_start = cell['ColTl'] + 1
    row_end = cell['RowBr'] + 1
    col_end = cell['ColBr'] + 1
    text = cell['Text'].replace('\n', ' ')

    # 填充左上角单元格
    current_cell = ws.cell(row=row_start, column=col_start, value=text)
    current_cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)

    # 记录合并信息
    if row_end > row_start or col_end > col_start:
        merge_range = f"{openpyxl.utils.get_column_letter(col_start)}{row_start}:{openpyxl.utils.get_column_letter(col_end-1)}{row_end-1}"
        if merge_range not in merged_cells:
            ws.merge_cells(merge_range)
            merged_cells.add(merge_range)

# 保存文件
output_file = "表格识别结果.xlsx"
wb.save(output_file)
print(f"Excel文件已生成: {output_file}")
```
:::

### 3. 批量识别图片并生成 Excel

为了提高效率，可以编写脚本来批量处理一个文件夹中的所有图片，并将每张图片的识别结果保存到同一个 Excel 文件的不同工作表中。

#### 单线程版

适合图片数量较少的场景，代码简单易懂。

::: details 示例代码：单线程批量处理
```python
   import json
   import base64
   import os
   from tencentcloud.common import credential
   from tencentcloud.common.profile.client_profile import ClientProfile
   from tencentcloud.common.profile.http_profile import HttpProfile
   from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
   from tencentcloud.ocr.v20181119 import ocr_client, models
   import openpyxl
   from openpyxl.styles import Alignment
   import time
   import re
   
   # 替换为你的腾讯云API密钥
   SECRET_ID = ""
   SECRET_KEY = ""
   # 设置图片目录
   IMAGE_DIR = "images"  # 替换为你的图片目录路径
   # 设置输出Excel文件路径
   OUTPUT_EXCEL = "所有表格数据.xlsx"  # 输出Excel文件名
   
   # 初始化OCR客户端（只初始化一次）
   def init_ocr_client():
       cred = credential.Credential(SECRET_ID, SECRET_KEY)
       httpProfile = HttpProfile()
       httpProfile.endpoint = "ocr.tencentcloudapi.com"
       clientProfile = ClientProfile()
       clientProfile.httpProfile = httpProfile
       return ocr_client.OcrClient(cred, "ap-guangzhou", clientProfile)
   
   # OCR识别函数
   def recognize_table(image_path, ocr_client):
       try:
           with open(image_path, "rb") as image_file:
               image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
           
           req = models.RecognizeTableAccurateOCRRequest()
           params = {"ImageBase64": image_base64}
           req.from_json_string(json.dumps(params))
           
           resp = ocr_client.RecognizeTableAccurateOCR(req)
           return json.loads(resp.to_json_string())
       
       except Exception as e:
           print(f"处理图片 {image_path} 时出错: {str(e)}")
           return None
   
   # 创建安全的Excel工作表名称
   def create_safe_sheet_name(name, existing_names):
       # 移除非法字符
       safe_name = re.sub(r'[\\/*?:\[\]]', '', name)
       
       # 截断到31个字符
       safe_name = safe_name[:31]
       
       # 确保名称唯一
       base_name = safe_name
       counter = 1
       while safe_name in existing_names or not safe_name.strip():
           safe_name = f"{base_name}_{counter}"
           counter += 1
           if counter > 100:  # 防止无限循环
               safe_name = f"Sheet_{len(existing_names) + 1}"
               break
       
       return safe_name
   
   # 将OCR结果转换为Excel工作表
   def ocr_to_excel_sheet(wb, result, sheet_name):
       if not result or 'TableDetections' not in result or len(result['TableDetections']) < 2:
           print(f"无法提取表格数据: {sheet_name}")
           return False
       
       try:
           # 创建新工作表
           ws = wb.create_sheet(title=sheet_name)
           
           # 提取主表格（第二个表格，索引1）
           main_table = result['TableDetections'][1]
           cells = main_table['Cells']
           
           # 设置列宽
           column_widths = [8, 25, 8, 40, 10, 10, 10, 10, 10]
           for i, width in enumerate(column_widths, 1):
               col_letter = openpyxl.utils.get_column_letter(i)
               ws.column_dimensions[col_letter].width = width
           
           # 处理单元格
           merged_cells = []
           max_row = 0
           max_col = 0
           
           for cell in cells:
               row_start = cell['RowTl'] + 1
               row_end = cell['RowBr']
               col_start = cell['ColTl'] + 1
               col_end = cell['ColBr']
               
               # 更新最大行列
               max_row = max(max_row, row_end)
               max_col = max(max_col, col_end)
               
               # 处理文本：删除所有换行符
               text = cell['Text'].replace('\n', '')
               
               # 填充左上角单元格
               ws.cell(row=row_start, column=col_start, value=text)
               
               # 记录需要合并的单元格
               if row_end > row_start or col_end > col_start:
                   merged_cells.append((row_start, row_end, col_start, col_end))
           
           # 应用合并单元格
           for merge in merged_cells:
               row_start, row_end, col_start, col_end = merge
               ws.merge_cells(
                   start_row=row_start, end_row=row_end,
                   start_column=col_start, end_column=col_end
               )
           
           # 设置居中和自动换行
           for row in ws.iter_rows(min_row=1, max_row=max_row, min_col=1, max_col=max_col):
               for cell in row:
                   cell.alignment = Alignment(
                       horizontal='center', 
                       vertical='center',
                       wrap_text=True
                   )
           
           return True
       
       except Exception as e:
           print(f"生成工作表时出错: {str(e)}")
           return False
   
   # 主处理函数
   def process_images(image_dir, output_excel):
       # 初始化OCR客户端
       ocr_client = init_ocr_client()
       
       # 获取图片列表
       image_files = []
       for file in os.listdir(image_dir):
           if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
               image_files.append(os.path.join(image_dir, file))
       
       if not image_files:
           print(f"在目录 {image_dir} 中未找到图片文件")
           return
       
       print(f"找到 {len(image_files)} 张图片需要处理")
       
       # 创建Excel工作簿
       wb = openpyxl.Workbook()
       # 删除默认创建的工作表
       if 'Sheet' in wb.sheetnames:
           del wb['Sheet']
       
       # 处理每张图片
       success_count = 0
       sheet_names = []  # 记录已使用的工作表名称
       
       for i, image_path in enumerate(image_files):
           filename = os.path.basename(image_path)
           base_name = os.path.splitext(filename)[0]
           
           # 创建安全的工作表名称
           sheet_name = create_safe_sheet_name(base_name, sheet_names)
           sheet_names.append(sheet_name)
           
           print(f"正在处理 ({i+1}/{len(image_files)}): {filename} -> 工作表: {sheet_name}")
           
           # OCR识别
           start_time = time.time()
           result = recognize_table(image_path, ocr_client)
           ocr_time = time.time() - start_time
           
           if result:
               # 转换为Excel工作表
               excel_start = time.time()
               success = ocr_to_excel_sheet(wb, result, sheet_name)
               excel_time = time.time() - excel_start
               
               if success:
                   success_count += 1
                   print(f"  处理成功! OCR耗时: {ocr_time:.2f}s, 工作表生成耗时: {excel_time:.2f}s")
               else:
                   print(f"  生成工作表失败")
           else:
               print(f"  OCR识别失败")
           
           # 避免请求过于频繁
           if i < len(image_files) - 1:
               time.sleep(1)  # 1秒间隔
       
       # 保存Excel文件
       wb.save(output_excel)
       print(f"\n处理完成! 成功处理 {success_count}/{len(image_files)} 张图片")
       print(f"结果已保存到: {output_excel}")
   
   # 启动批量处理
   if __name__ == "__main__":
       process_images(IMAGE_DIR, OUTPUT_EXCEL)
   ```

:::

#### 多线程版

利用多线程并发请求，显著提升处理大量图片时的效率。

::: details 示例代码：批量识别（多线程）

   ```python
   import json
   import base64
   import os
   import time
   import re
   from tencentcloud.common import credential
   from tencentcloud.common.profile.client_profile import ClientProfile
   from tencentcloud.common.profile.http_profile import HttpProfile
   from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
   from tencentcloud.ocr.v20181119 import ocr_client, models
   import openpyxl
   from openpyxl.styles import Alignment
   from concurrent.futures import ThreadPoolExecutor, as_completed
   
   # 替换为你的腾讯云API密钥
   SECRET_ID = ""
   SECRET_KEY = ""
   # 设置图片目录
   IMAGE_DIR = "images"  # 替换为你的图片目录路径
   # 设置输出Excel文件路径
   OUTPUT_EXCEL = "所有表格数据.xlsx"  # 输出Excel文件名
   
   # 初始化OCR客户端（只初始化一次）
   def init_ocr_client():
       cred = credential.Credential(SECRET_ID, SECRET_KEY)
       httpProfile = HttpProfile()
       httpProfile.endpoint = "ocr.tencentcloudapi.com"
       clientProfile = ClientProfile()
       clientProfile.httpProfile = httpProfile
       return ocr_client.OcrClient(cred, "ap-guangzhou", clientProfile)
   
   # OCR识别函数
   def recognize_table(image_path, ocr_client):
       try:
           with open(image_path, "rb") as image_file:
               image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
           
           req = models.RecognizeTableAccurateOCRRequest()
           params = {"ImageBase64": image_base64}
           req.from_json_string(json.dumps(params))
           
           resp = ocr_client.RecognizeTableAccurateOCR(req)
           return json.loads(resp.to_json_string())
       
       except Exception as e:
           print(f"处理图片 {image_path} 时出错: {str(e)}")
           return None
   
   # 创建安全的Excel工作表名称
   def create_safe_sheet_name(name, existing_names):
       # 移除非法字符
       safe_name = re.sub(r'[\\/*?:\[\]]', '', name)
       
       # 截断到31个字符
       safe_name = safe_name[:31]
       
       # 确保名称唯一
       base_name = safe_name
       counter = 1
       while safe_name in existing_names or not safe_name.strip():
           safe_name = f"{base_name}_{counter}"
           counter += 1
           if counter > 100:  # 防止无限循环
               safe_name = f"Sheet_{len(existing_names) + 1}"
               break
       
       return safe_name
   
   # 将OCR结果转换为Excel工作表
   def ocr_to_excel_sheet(wb, result, sheet_name):
       if not result or 'TableDetections' not in result or len(result['TableDetections']) < 2:
           print(f"无法提取表格数据: {sheet_name}")
           return False
       
       try:
           # 创建新工作表
           ws = wb.create_sheet(title=sheet_name)
           
           # 提取主表格（第二个表格，索引1）
           main_table = result['TableDetections'][1]
           cells = main_table['Cells']
           
           # 设置列宽
           column_widths = [8, 25, 8, 40, 10, 10, 10, 10, 10]
           for i, width in enumerate(column_widths, 1):
               col_letter = openpyxl.utils.get_column_letter(i)
               ws.column_dimensions[col_letter].width = width
           
           # 处理单元格
           merged_cells = []
           max_row = 0
           max_col = 0
           
           for cell in cells:
               row_start = cell['RowTl'] + 1
               row_end = cell['RowBr']
               col_start = cell['ColTl'] + 1
               col_end = cell['ColBr']
               
               # 更新最大行列
               max_row = max(max_row, row_end)
               max_col = max(max_col, col_end)
               
               # 处理文本：删除所有换行符
               text = cell['Text'].replace('\n', '')
               
               # 填充左上角单元格
               ws.cell(row=row_start, column=col_start, value=text)
               
               # 记录需要合并的单元格
               if row_end > row_start or col_end > col_start:
                   merged_cells.append((row_start, row_end, col_start, col_end))
           
           # 应用合并单元格
           for merge in merged_cells:
               row_start, row_end, col_start, col_end = merge
               ws.merge_cells(
                   start_row=row_start, end_row=row_end,
                   start_column=col_start, end_column=col_end
               )
           
           # 设置居中和自动换行
           for row in ws.iter_rows(min_row=1, max_row=max_row, min_col=1, max_col=max_col):
               for cell in row:
                   cell.alignment = Alignment(
                       horizontal='center', 
                       vertical='center',
                       wrap_text=True
                   )
           
           return True
       
       except Exception as e:
           print(f"生成工作表时出错: {str(e)}")
           return False
   
   # 主处理函数
   def process_images(image_dir, output_excel):
       # 初始化OCR客户端
       ocr_client = init_ocr_client()
       
       # 获取图片列表
       image_files = []
       for file in os.listdir(image_dir):
           if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
               image_files.append(os.path.join(image_dir, file))
       
       if not image_files:
           print(f"在目录 {image_dir} 中未找到图片文件")
           return
       
       print(f"找到 {len(image_files)} 张图片需要处理")
       
       # 创建Excel工作簿
       wb = openpyxl.Workbook()
       # 删除默认创建的工作表
       if 'Sheet' in wb.sheetnames:
           del wb['Sheet']
       
       # 处理每张图片（使用多线程）
       success_count = 0
       sheet_names = []  # 记录已使用的工作表名称
       results = {}  # 存储结果：{图片路径: (文件名, sheet_name, 识别结果)}
       
       # 第一步：批量提交所有OCR请求
       print("开始批量提交OCR请求...")
       start_time = time.time()
       
       with ThreadPoolExecutor(max_workers=2) as executor:
           future_to_path = {
               executor.submit(recognize_table, image_path, ocr_client): image_path
               for image_path in image_files
           }
           
           for future in as_completed(future_to_path):
               image_path = future_to_path[future]
               filename = os.path.basename(image_path)
               base_name = os.path.splitext(filename)[0]
               
               try:
                   result = future.result()
                   # 创建安全的工作表名称
                   sheet_name = create_safe_sheet_name(base_name, sheet_names)
                   sheet_names.append(sheet_name)
                   
                   results[image_path] = (filename, sheet_name, result)
                   print(f"  OCR完成: {filename}")
               except Exception as e:
                   print(f"  处理图片 {filename} 时出错: {str(e)}")
       
       ocr_time = time.time() - start_time
       print(f"所有OCR请求完成! 总耗时: {ocr_time:.2f}s")
       
       # 第二步：处理结果并生成Excel工作表
       print("\n开始生成Excel工作表...")
       excel_start = time.time()
       
       for i, image_path in enumerate(image_files):
           if image_path not in results:
               continue
               
           filename, sheet_name, result = results[image_path]
           print(f"正在处理 ({i+1}/{len(image_files)}): {filename} -> 工作表: {sheet_name}")
           
           if result:
               success = ocr_to_excel_sheet(wb, result, sheet_name)
               if success:
                   success_count += 1
                   print(f"  工作表生成成功!")
               else:
                   print(f"  生成工作表失败")
           else:
               print(f"  OCR识别失败")
       
       excel_time = time.time() - excel_start
       print(f"所有工作表生成完成! 耗时: {excel_time:.2f}s")
       
       # 保存Excel文件
       wb.save(output_excel)
       print(f"\n处理完成! 成功处理 {success_count}/{len(image_files)} 张图片")
       print(f"结果已保存到: {output_excel}")
   
   # 启动批量处理
   if __name__ == "__main__":
       process_images(IMAGE_DIR, OUTPUT_EXCEL)
   ```

:::

简约版到此为至，进阶版有时再折腾。
