---
title: PaddleOCR 本地运行实战：文字与表格识别避坑指南
shortTitle: PaddleOCR 本地实战
date: 2025-07-13
icon: fa-solid fa-robot
order: 4
category:
  - 自动化脚本
tag:
  - PaddleOCR
  - OCR
  - 文字识别
  - 表格识别
  - Python
description: 本教程提供 PaddleOCR 的本地部署与运行的简明指南，内容涵盖环境准备、模型下载、文字识别与表格识别的 Python 代码实战，帮助开发者快速上手并避免常见问题。
---

## 项目概述

- **项目地址**：[PaddlePaddle · GitHub](https://github.com/PaddlePaddle)
- **文档地址**：[快速开始 - PaddleOCR 文档](https://paddlepaddle.github.io/PaddleOCR/latest/quick_start.html)

## 环境准备

### 1. 安装PaddlePaddle基础框架

首先，安装 CPU 版本的 PaddlePaddle 框架（推荐使用 Python 3.7+ 环境）：

```bat
python -m pip install paddlepaddle==3.1.0 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/
```

接着，安装 PaddleOCR 库：

```bat
pip install paddleocr
```

### 2. 验证安装

为了确保 PaddlePaddle 框架已正确安装，请运行以下 Python 代码进行检查：

```python
import paddle
paddle.utils.run_check()
print(paddle.__version__)
```

如果安装成功，您将看到如下输出：

```
Running verify PaddlePaddle program ...
PaddlePaddle works well on 1 CPU.
PaddlePaddle is installed successfully! Let's start deep learning with PaddlePaddle now.
```

## 文字识别实战

### 准备工作

1.  **阅读官方文档**：[Python脚本集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#22-python)
2.  **下载模型**：
    *   模型名称参考：[OCR模型列表](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#1-ocr)
    *   在[官方模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载所需模型。

### 代码示例

```python
from paddleocr import PaddleOCR
from PIL import Image, ImageOps
import numpy as np

# 定义图片路径
img_path = "文字.png"
img = Image.open(img_path)

# 图像预处理：缩放、灰度化、二值化
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)

# 将二值图像转换为3通道RGB格式以适配模型输入
img_rgb = np.stack((img_binary,)*3, axis=-1)

# 实例化OCR引擎
ocr = PaddleOCR(
    # 基础设置
    device="cpu",               # 使用CPU进行推理
    enable_mkldnn=True,         # 启用 MKL-DNN 加速
    cpu_threads=2,              # CPU线程数
    precision='fp16',           # 使用fp16精度以提升性能

    # 功能模块开关（按需禁用以减少资源占用）
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,

    # 文本检测与识别模型配置
    text_detection_model_name="PP-OCRv5_mobile_det",
    text_detection_model_dir="./Paddle_models/PP-OCRv5_mobile_det",  # 检测模型路径（不支持中文）
    text_recognition_model_name="PP-OCRv4_mobile_rec",
    text_recognition_model_dir="./Paddle_models/PP-OCRv4_mobile_rec" # 识别模型路径（不支持中文）
)

# 执行预测
result = ocr.predict(img_rgb)

# 处理并输出结果
for res in result:
    res.print()
    res.save_to_json("output") # 将结果保存为json文件
```

## 表格识别实战

### 准备工作

1.  **阅读官方文档**：[表格识别集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#22-python)
2.  **下载模型**：
    *   模型名称参考：[表格识别模型列表](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#1-v2)
    *   在[官方模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载所需模型。

### 代码示例

```python
from paddleocr import TableRecognitionPipelineV2
from PIL import Image, ImageOps
import numpy as np

# 定义图片路径
img_path = "表格.png"
img = Image.open(img_path)

# 图像预处理
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)
img_rgb = np.stack((img_binary,)*3, axis=-1)

# 实例化表格识别Pipeline
pipeline = TableRecognitionPipelineV2(
    # 禁用部分模块以简化流程
    use_doc_unwarping=False,

    # 配置各阶段所需模型（路径不支持中文）
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
)

# 执行预测
output = pipeline.predict(img_rgb)

# 处理并输出结果
for res in output:
    res.print() # 打印结构化输出
    res.save_to_xlsx("./output/") # 保存为Excel
    res.save_to_html("./output/") # 保存为HTML
    res.save_to_json("./output/") # 保存为JSON
```