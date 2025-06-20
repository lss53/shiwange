---
title: 腾讯云OCR表格批量识别代码示例
date: 2025-06-20
icon: fa-solid fa-table
order: 6
category:
  - 攻略
tag:
  - Python
  - OCR
---

## 一、注册/登录腾讯云账号

- 访问腾讯云官网：https://cloud.tencent.com

- 若未注册，点击右上角「注册」，使用手机号、邮箱或微信/QQ等方式完成注册；若已有账号，直接点击「登录」。


## 二、完成实名认证

- 腾讯云大部分付费服务需实名认证后使用（部分免费功能可能无需）。 
  个人用户：进入https://console.cloud.tencent.com/developer/auth，选择「个人实名认证」，按提示上传身份证信息并完成验证。  
- 企业用户：选择「企业实名认证」，需提供企业营业执照、法人信息等材料（具体以页面指引为准）。  


## 三、开通文字识别（OCR）服务
1. 登录后，进入腾讯云控制台：https://console.cloud.tencent.com  

2. 在顶部导航栏选择「产品」> 搜索「文字识别」或通过路径：人工智能 > 图像与语音处理 > 文字识别，进入OCR服务页面。  

3. （若找不到入口，可直接搜索“文字识别”快速定位）  
   进入OCR控制台后，系统会提示“立即开通”。点击「开通」，根据提示确认服务协议，完成开通。  

## 四、获取API密钥（调用服务必需）

- 要调用OCR接口，需先创建API密钥（SecretId和SecretKey），用于身份验证。  
  在OCR控制台右上角，点击「访问管理」或直接进入https://console.cloud.tencent.com/cam/capi。  
- 强烈建议您`子账号密钥`！

  - 用户列表 > 新建用户 > 快捷创建 > 输入`用户名` > 用户权限: 搜索ocr，勾选`QcloudOCRReadSelfUinUsage`并确定 > 创建用户
  - 点上面创建的`用户名` > API密钥 > 新建密钥
- 注意：新建的密钥只在创建时提供SecretKey，后续不可再进行查询，请妥善保存好SecretKey，泄露可能导致资源被盗用！。


## 五、了解计费与免费额度（可选）

- 腾讯云OCR部分接口提供免费额度（如通用文字识别每月1000次），超出后按量计费。  

- 查看具体套餐：在OCR控制台首页，点击「计费概览」或参考https://cloud.tencent.com/product/ocr/pricing。  

## 六、Python调用`表格识别(V3)`

### 处单张图片

- 进入https://cloud.tencent.com/document/sdk，搜索`文字识别`，分类选择`Python`，在`文字识别 (OCR)`里点击`API Explorer`。打开的新标签页`API Explorer - 云API -控制台里`找到`表格识别(V3)`并点击，再依次点击`代码示例`→`SDK`→`Python`，复制出现的示例代码。

    ```python
    # -*- coding: utf-8 -*-
    
    import json
    import types
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
    from tencentcloud.ocr.v20181119 import ocr_client, models
    try:
        # 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
        # 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性
        # 以下代码示例仅供参考，建议采用更安全的方式来使用密钥
        # 请参见：https://cloud.tencent.com/document/product/1278/85305
        # 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
        cred = credential.Credential("SecretId", "SecretKey")
        # 使用临时密钥示例
        # cred = credential.Credential("SecretId", "SecretKey", "Token")
        # 实例化一个http选项，可选的，没有特殊需求可以跳过
        httpProfile = HttpProfile()
        httpProfile.endpoint = "ocr.tencentcloudapi.com"
    
        # 实例化一个client选项，可选的，没有特殊需求可以跳过
        clientProfile = ClientProfile()
        clientProfile.httpProfile = httpProfile
        # 实例化要请求产品的client对象,clientProfile是可选的
        client = ocr_client.OcrClient(cred, "", clientProfile)
    
        # 实例化一个请求对象,每个接口都会对应一个request对象
        req = models.RecognizeTableAccurateOCRRequest()
        params = {
    
        }
        req.from_json_string(json.dumps(params))
    
        # 返回的resp是一个RecognizeTableAccurateOCRResponse的实例，与请求对象对应
        resp = client.RecognizeTableAccurateOCR(req)
        # 输出json格式的字符串回包
        print(resp.to_json_string())
    
    except TencentCloudSDKException as err:
        print(err)
    ```

- 在上面的示例代码中，params为空，我们需要在params中指定图片参数。我们假设使用base64方式，从本地读取一张图片并转换为base64字符串。步骤：

  - 读取图片文件，转换为base64。
  
  - 将base64字符串放入params中。

  - 注意：base64字符串不需要带前缀（如data:image/jpeg;base64,），直接传递编码后的字符串即可。在下面的示例代码中替换 SECRET_ID 和 SECRET_KEY 为你的腾讯云API密钥。
  
    ```python
    # -*- coding: utf-8 -*-
    
    import json
    import types
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
    from tencentcloud.ocr.v20181119 import ocr_client, models
    try:
        # 1. 读取图片并转换为Base64
        with open("本地图片路径.jpg", "rb") as image_file:  # 替换为你的图片路径
            image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    
        # 2. 初始化认证对象
        # 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
        # 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性
        # 以下代码示例仅供参考，建议采用更安全的方式来使用密钥
        # 请参见：https://cloud.tencent.com/document/product/1278/85305
        # 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
        cred = credential.Credential("SecretId", "SecretKey")
        # 使用临时密钥示例
        # cred = credential.Credential("SecretId", "SecretKey", "Token")
    
       # 3. 配置HTTP和客户端参数
        # 实例化一个http选项，可选的，没有特殊需求可以跳过
        httpProfile = HttpProfile()
        httpProfile.endpoint = "ocr.tencentcloudapi.com"
    
        # 实例化一个client选项，可选的，没有特殊需求可以跳过
        clientProfile = ClientProfile()
        clientProfile.httpProfile = httpProfile
    
        # 4. 创建OCR客户端
        # 实例化要请求产品的client对象,clientProfile是可选的
        client = ocr_client.OcrClient(cred, "ap-guangzhou", clientProfile)  # 替换你的地域
    
        # 5. 构建请求参数
        # 实例化一个请求对象,每个接口都会对应一个request对象
        req = models.RecognizeTableAccurateOCRRequest()
        params = {
            "ImageBase64": image_base64,
            # 可选参数（根据需求添加）:
            # "TableLanguage": 1  # 1-中文（默认） 2-英文
        }
        req.from_json_string(json.dumps(params))
    
        # 6. 发送请求并获取响应
        # 返回的resp是一个RecognizeTableAccurateOCRResponse的实例，与请求对象对应
        resp = client.RecognizeTableAccurateOCR(req)
        # 输出json格式的字符串回包
        print(resp.to_json_string())
    
    except TencentCloudSDKException as err:
        print(err)
    ```
  

### 表格数据(json)转 Excel

- 把表格数据 (json) 喂给 AI，指令：请把我给的数据转换为Excel格式，用Python。AI给出的示例代码：

    ```python
    # -*- coding: utf-8 -*-
    
    import json
    import openpyxl
    from openpyxl.styles import Alignment
    
    # 解析表格识别结果
    data = {
        "TableDetections": [
            # ... [原始数据] ...
        ],
        # ... [其他字段] ...
    }
    
    # 提取主表格（第二个表格，索引1）
    main_table = data['TableDetections'][1]
    cells = main_table['Cells']
    
    # 创建Excel工作簿
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "招生信息"
    
    # 设置列宽
    column_widths = [8, 25, 8, 40, 10, 10, 10, 10, 10]
    for i, width in enumerate(column_widths, 1):
        ws.column_dimensions[openpyxl.utils.get_column_letter(i)].width = width
    
    # 处理合并单元格和填充数据
    merged_cells = []
    max_row = 0
    max_col = 0
    
    for cell in cells:
        row_start = cell['RowTl'] + 1  # Excel行号从1开始
        row_end = cell['RowBr']        # 开区间，直接作为结束行
        col_start = cell['ColTl'] + 1  # Excel列号从1开始
        col_end = cell['ColBr']        # 开区间，直接作为结束列
        
        # 更新最大行列
        max_row = max(max_row, row_end)
        max_col = max(max_col, col_end)
        
        # 处理文本中的换行符
        text = cell['Text'].replace('\n', ' ')
        
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
    
    # 保存Excel文件
    output_file = "招生信息表.xlsx"
    wb.save(output_file)
    print(f"Excel文件已生成: {output_file}")
    ```
    
    

### 批量识别图片转Excel

- 所有图片的识别结果保存在同一个Excel文件中

- 每个图片对应一个独立的工作表

- 默认工作表名为图片文件名（不含扩展名）

1. 单线程版：

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

2. 多线程版

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

简约版到此为至，进阶版有时再折腾。
