---
title: PaddleOCR 本地部署实战：从文字到表格识别的简明教程
shortTitle: PaddleOCR 本地实战
date: 2025-07-13
icon: fa-solid fa-file-lines
order: 8
category:
  - 攻略
tag:
  - PaddleOCR
  - OCR
  - Python
description: 本教程提供了一个简明的 PaddleOCR 本地运行指南，涵盖环境准备、模型下载、文字识别和表格识别的完整 Python 代码示例，帮助您快速上手并避免常见问题。
---

## 项目概述

项目地址：[PaddlePaddle · GitHub](https://github.com/PaddlePaddle)  
文档地址：[快速开始 - PaddleOCR 文档](https://paddlepaddle.github.io/PaddleOCR/latest/quick_start.html)

## 环境准备

### 1. 安装 PaddlePaddle 基础框架

推荐在 Python 3.7+ 环境下安装 CPU 版本的 PaddlePaddle。

```bash
python -m pip install paddlepaddle==3.1.0 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/
```

### 2. 安装 PaddleOCR

```bash
pip install paddleocr
```

### 3. 验证安装

为确保环境配置正确，请运行以下 Python 代码进行检查：

```python
import paddle

# 运行 PaddlePaddle 环境检查
paddle.utils.run_check()

# 打印 PaddlePaddle 版本
print(paddle.__version__)
```

若安装成功，您将看到类似以下的输出：
```
Running verify PaddlePaddle program ... 
PaddlePaddle works well on 1 CPU.
PaddlePaddle is installed successfully! Let's start deep learning with PaddlePaddle now.
```

## 文字识别实战

### 准备工作

1.  **阅读官方文档**：[Python 脚本集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#22-python)
2.  **下载模型**：
    *   模型列表：[OCR 模型列表](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#1-ocr)
    *   下载地址：在[官方模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载所需模型。

### 代码示例

```python
from paddleocr import PaddleOCR
from PIL import Image, ImageOps
import numpy as np

# 1. 图像预处理
img_path = "文字.png"  # 替换为您的图片路径
img = Image.open(img_path)

# 缩放图片（固定宽度为700px，高度按比例调整）
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)

# 转换为灰度图并进行二值化处理
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)

# 将二值图像转换为3通道RGB格式以兼容模型输入
img_input = np.stack((img_binary,) * 3, axis=-1)

# 2. 实例化OCR
ocr = PaddleOCR(
    # --- 基础设置 ---
    device="cpu",             # 使用CPU进行推理
    enable_mkldnn=True,       # 启用 MKL-DNN 加速
    cpu_threads=2,            # CPU线程数
    precision='fp16',         # 计算精度
    
    # --- 功能模块开关 ---
    use_doc_orientation_classify=False, # 禁用文档方向分类
    use_doc_unwarping=False,          # 禁用文本图像矫正
    use_textline_orientation=False,   # 禁用文本行方向

    # --- 模型路径配置 ---
    # 路径中建议不要包含中文
    text_recognition_model_name="PP-OCRv4_mobile_rec",
    text_recognition_model_dir="./Paddle_models/PP-OCRv4_mobile_rec",
    
    text_detection_model_name="PP-OCRv5_mobile_det",
    text_detection_model_dir="./Paddle_models/PP-OCRv5_mobile_det",
)

# 3. 执行预测并处理结果
result = ocr.predict(img_input)
for res in result:
    res.print()  # 打印识别结果
    # res.save_to_img("output") # 保存结果图片
    res.save_to_json("output") # 保存结果为JSON
```

## 表格识别实战

### 准备工作

1.  **阅读官方文档**：[表格识别集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#22-python)
2.  **下载模型**：
    *   模型列表：[表格识别模型](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#1-v2)
    *   下载地址：在[官方模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载。

### 代码示例

```python
from paddleocr import TableRecognitionPipelineV2
from PIL import Image, ImageOps
import numpy as np

# 1. 图像预处理
img_path = "表格.png"  # 替换为您的图片路径
img = Image.open(img_path)

# 缩放、灰度化和二值化
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)
img_input = np.stack((img_binary,) * 3, axis=-1)

# 2. 实例化表格识别 Pipeline
# 路径中建议不要包含中文
pipeline = TableRecognitionPipelineV2(
    # --- 模型路径配置 ---
    layout_detection_model_name="PP-DocLayout-L",
    layout_detection_model_dir="./Paddle_models/PP-DocLayout-L",

    table_classification_model_name="PP-LCNet_x1_0_table_cls",
    table_classification_model_dir="./Paddle_models/PP-LCNet_x1_0_table_cls",

    wired_table_structure_recognition_model_name="SLANeXt_wireless",
    wired_table_structure_recognition_model_dir="./Paddle_models/SLANeXt_wireless",

    wireless_table_structure_recognition_model_name="SLANeXt_wireless",
    wireless_table_structure_recognition_model_dir="./Paddle_models/SLANeXt_wireless",

    wired_table_cells_detection_model_name="RT-DETR-L_wired_table_cell_det",
    wired_table_cells_detection_model_dir="./Paddle_models/RT-DETR-L_wired_table_cell_det",

    wireless_table_cells_detection_model_name="RT-DETR-L_wired_table_cell_det",
    wireless_table_cells_detection_model_dir="./Paddle_models/RT-DETR-L_wired_table_cell_det",

    doc_orientation_classify_model_name="PP-LCNet_x1_0_doc_ori",
    doc_orientation_classify_model_dir="./Paddle_models/PP-LCNet_x1_0_doc_ori",
    
    text_detection_model_name="PP-OCRv5_mobile_det",
    text_detection_model_dir="./Paddle_models/PP-OCRv5_mobile_det",
    
    text_recognition_model_name="PP-OCRv5_mobile_rec",
    text_recognition_model_dir="./Paddle_models/PP-OCRv5_mobile_rec",
    
    # --- 功能模块开关 ---
    use_doc_unwarping=False,  # 不使用文本图像矫正模型
)

# 3. 执行预测并处理结果
output = pipeline.predict(img_input)

for res in output:
    res.print()           # 打印结构化输出
    res.save_to_xlsx("./output/")  # 保存为 Excel
    res.save_to_html("./output/")  # 保存为 HTML
    res.save_to_json("./output/")  # 保存为 JSON
```
