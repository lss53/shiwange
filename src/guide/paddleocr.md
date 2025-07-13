---
title: PaddleOCR本地运行简明避坑教程：文字与表格识别实战指南
date: 2025-07-13
icon: fa-solid fa-image
order: 8
category:
  - 攻略
tag:
  - PaddleOCR
---

## 项目概述

项目地址：[PaddlePaddle · GitHub](https://github.com/PaddlePaddle)  
文档地址：[快速开始 - PaddleOCR 文档](https://paddlepaddle.github.io/PaddleOCR/latest/quick_start.html)

## 环境准备

### 安装PaddlePaddle基础框架

1. [安装 CPU 版的 PaddlePaddle](https://www.paddlepaddle.org.cn/install/quick?docurl=/documentation/docs/zh/develop/install/pip/windows-pip.html#cpu)（推荐Python 3.7+环境）：

```bat
python -m pip install paddlepaddle==3.1.0 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/
```

2. 安装paddleocr

```bat
pip install paddleocr
```

### 验证安装

1. 安装paddle

```bat
pip install paddle
```

2. 运行以下Python代码检查安装状态：

```python
import paddle
paddle.utils.run_check()
print(paddle.__version__)
```

成功安装会显示：
```
Running verify PaddlePaddle program ... 
PaddlePaddle works well on 1 CPU.
PaddlePaddle is installed successfully! Let's start deep learning with PaddlePaddle now.
```

## 文字识别实战

### 准备工作

1. 阅读官方文档：[Python脚本集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#22-python)

2. 下载模型：
   - 模型名称参考：[OCR模型列表](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/OCR.html#1-ocr)
   - 在[模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载所需模型

### 代码示例

```python
from paddleocr import PaddleOCR
from PIL import Image, ImageOps
import numpy as np

img_path = "文字.png"  # 这里输入你的图片路径
img = Image.open(img_path )

# 缩放图片（宽度固定为700px，高度按比例调整）
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)

# 转换为灰度图 + 二值化
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)

# 将二值图像转换为3通道RGB格式
img = np.stack((img_binary,)*3, axis=-1)

# 实例化OCR
ocr = PaddleOCR(
    
    # 基础设置
    # 参数来源于「（1）通过 PaddleOCR() 实例化 OCR 产线对象，具体参数说明如下」（需要展开）
    device="cpu",  # 用于推理的设备
    #enable_hpi=True,  # 启用高性能推理
    #use_tensorrt=True,  # 启用 Paddle Inference 的 TensorRT 子图引擎
    precision='fp16',  # 计算精度，如 fp32、fp16
    enable_mkldnn=True,  # 启用 MKL-DNN 加速推理
    cpu_threads=2,  # 在 CPU 上进行推理时使用的线程数
    
    use_doc_orientation_classify=False,  # 不加载并使用文档方向分类模块
    use_doc_unwarping=False,  # 不加载并使用文本图像矫正模块
    use_textline_orientation=False,  # 不加载并使用文本行方向模块

    # 输入优化
    # 参数来源于「（1）通过 PaddleOCR() 实例化 OCR 产线对象，具体参数说明如下」（需要展开）
    #text_det_limit_type="min",  # 文本检测的边长度限制类型
    #text_det_limit_side_len=640,  # 文本检测的图像边长限制
    #text_recognition_batch_size=1,  # 文本识别模型的batch size
    #text_det_thresh = 0.4,  # 文本检测像素阈值，输出的概率图中，得分大于该阈值的像素点才会被认为是文字像素点
    #text_det_box_thresh = 0.7,  # 文本检测框阈值，检测结果边框内，所有像素点的平均得分大于该阈值时，该结果会被认为是文字区域
    #text_det_unclip_ratio = 1.2,  # 文本检测扩张系数，使用该方法对文字区域进行扩张，该值越大，扩张的面积越大

    text_recognition_model_name="PP-OCRv4_mobile_rec",  # 文本识别模型的名称
    text_recognition_model_dir="./Paddle_models/PP-OCRv4_mobile_rec",  # 文本识别模型的目录路径，路径中不兼容中文
    
    text_detection_model_name="PP-OCRv5_mobile_det",  # 文本检测模型的名称
    text_detection_model_dir="./Paddle_models/PP-OCRv5_mobile_det",  # 文本检测模型模型的目录路径
    
    #textline_orientation_model_dir="./Paddle_models/PP-LCNet_x1_0_doc_ori"  # 文本行方向模型的目录路径

)

# 使用predict方法
# 参数来源于「（3）对预测结果进行处理，每个样本的预测结果均为对应的Result对象，且支持打印、保存为图片、保存为json文件的操作」
result = ocr.predict(img)
for res in result:
    res.print()
    # res.save_to_img("output")
    res.save_to_json("output")
```

## 表格识别实战

### 准备工作

1. 阅读官方文档：[表格识别集成指南](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#22-python)

2. 下载模型：
   - 模型名称参考：[表格识别模型](https://paddlepaddle.github.io/PaddleOCR/latest/version3.x/pipeline_usage/table_recognition_v2.html#1-v2)
   - 在[模型库](https://aistudio.baidu.com/modelsoverview)搜索并下载所需模型

### 代码示例

```python
from paddleocr import TableRecognitionPipelineV2
from PIL import Image, ImageOps
import numpy as np

img_path = "表格.png"  # 这里输入你的图片路径
img = Image.open(img_path )

# 缩放图片（宽度固定为700px，高度按比例调整）
width = 700
height = int(img.height * (width / img.width))
img_resized = img.resize((width, height), Image.LANCZOS)

# 转换为灰度图 + 二值化
img_gray = ImageOps.grayscale(img_resized)
img_binary = img_gray.point(lambda x: 255 if x > 170 else 0)

# 将二值图像转换为3通道RGB格式
img = np.stack((img_binary,)*3, axis=-1)

pipeline = TableRecognitionPipelineV2(
    
    # 版面检测模型，指定路径使用本地模型，路径中不兼容中文
    # 需要注释掉 use_layout_detection=False
    layout_detection_model_name="PP-DocLayout-L",
    layout_detection_model_dir="./Paddle_models/PP-DocLayout-L",

    # 表格分类模块模型
    table_classification_model_name="PP-LCNet_x1_0_table_cls",
    table_classification_model_dir="./Paddle_models/PP-LCNet_x1_0_table_cls",

    # 有线表格结构识别模块模型
    wired_table_structure_recognition_model_name="SLANeXt_wireless",
    wired_table_structure_recognition_model_dir="./Paddle_models/SLANeXt_wireless",

    # 无线表格结构识别模块模型
    wireless_table_structure_recognition_model_name="SLANeXt_wireless",
    wireless_table_structure_recognition_model_dir="./Paddle_models/SLANeXt_wireless",

    # 有线表格单元格检测模块模型
    wired_table_cells_detection_model_name="RT-DETR-L_wired_table_cell_det",
    wired_table_cells_detection_model_dir="./Paddle_models/RT-DETR-L_wired_table_cell_det",

    # 无线表格单元格检测模块模型
    wireless_table_cells_detection_model_name="RT-DETR-L_wired_table_cell_det",
    wireless_table_cells_detection_model_dir="./Paddle_models/RT-DETR-L_wired_table_cell_det",

    # 文档方向分类模型
    # 需要注释掉 use_doc_orientation_classify=False
    doc_orientation_classify_model_name="PP-LCNet_x1_0_doc_ori",
    doc_orientation_classify_model_dir="./Paddle_models/PP-LCNet_x1_0_doc_ori",

    # 文本图像矫正模型
    # 需要注释掉 use_doc_unwarping=False
    # doc_unwarping_model_name="UVDoc",
    # doc_unwarping_model_dir="./Paddle_models/UVDoc",
    
    # 文本检测模块模型
    text_detection_model_name="PP-OCRv5_mobile_det",
    text_detection_model_dir="./Paddle_models/PP-OCRv5_mobile_det",
    
    
    # 文本识别模块模型
    text_recognition_model_name="PP-OCRv5_mobile_rec",
    text_recognition_model_dir="./Paddle_models/PP-OCRv5_mobile_rec",
    
    
    # use_doc_orientation_classify=False,  # 不使用文档方向分类模型
    use_doc_unwarping=False,  # 不使用文本图像矫正模型
    # use_layout_detection=False,  # 不使用版面检测模块；True 将会下载官方模型
    )

output = pipeline.predict(img)

for res in output:
    res.print() ## 打印预测的结构化输出
    # res.save_to_img("./output/")
    res.save_to_xlsx("./output/")
    res.save_to_html("./output/")
    res.save_to_json("./output/")
```
