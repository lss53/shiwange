---
title: PDF 页面自由裁切工具
shortTitle: PDF 页面裁切
date: 2026-08-13
icon: fa-solid fa-crop
order: 10
category:
  - 软件·应用
tag:
  - PDF
  - HTML
  - 工具
  - 裁剪
description: 一款纯前端、无需安装的 PDF 页面裁切工具，通过浏览器直接运行，自由裁剪 PDF 页面白边或多余区域。
---

## PDF 页面自由裁切工具

为了更方便地使用，您可以将以下代码保存为一个 .html 文件（如 pdf-page-cutter.html），双击 HTML 文件，在浏览器中直接打开。

::: details 点击查看完整 HTML 源码
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF页面自由裁切工具</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4f46e5;
      --primary-light: #818cf8;
      --bg: #f8fafc;
      --surface: #ffffff;
      --text-main: #1e293b;
      --text-sub: #64748b;
      --border: #e2e8f0;
      --shadow: 0 1px 3px rgba(0,0,0,0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
      --radius: 12px;
      --cut-line-color: #f87171;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .navbar {
      padding: 1rem 2rem;
      background: rgba(255,255,255,0.95);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }
    .logo {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-actions { display: flex; gap: 1rem; align-items: center; }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      display: none;
      align-items: center;
      gap: 0.5rem;
      background: var(--primary);
      color: white;
    }
    .btn:hover { background: #4338ca; }
    .btn.secondary {
      background: white;
      color: var(--primary);
      border: 1px solid var(--border);
    }
    .btn.secondary:hover { background: #f8fafc; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; background: #cbd5e1; }
    .btn.primary { background: var(--primary); color: white; }
    .btn.danger { background: #ef4444; color: white; }
    .btn.danger:hover { background: #dc2626; }

    .main-container {
      flex: 1;
      padding: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      position: relative;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 70vh;
      border: 2px dashed var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      transition: all 0.3s;
    }
    .empty-state.drag-over {
      border-color: var(--primary);
      background: #f0f9ff;
      transform: scale(1.01);
    }
    .upload-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .page-card {
      background: var(--surface);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: all 0.3s;
      position: relative;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .page-card.loading .card-content {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      min-height: 500px;
    }
    @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    .page-card:hover { box-shadow: var(--shadow-lg); border-color: var(--primary-light); }
    .page-card.selected { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2); }

    .card-content { width: 100%; position: relative; background: #f1f5f9; }
    .card-content canvas { width: 100%; height: auto; display: block; object-fit: contain; }

    .card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 30%);
      opacity: 0; transition: opacity 0.3s;
      display: flex; justify-content: flex-end; align-items: center; padding: 1rem;
      pointer-events: none;
      z-index: 20;
    }
    .page-card:hover .card-overlay { opacity: 1; }
    .card-overlay .btn { pointer-events: auto; display: inline-flex; }

    .page-num-badge {
      position: absolute; top: 1rem; left: 1rem;
      background: rgba(255,255,255,0.9); padding: 4px 12px;
      border-radius: 9999px; font-size: 0.9rem; font-weight: 600;
      color: var(--text-main); box-shadow: var(--shadow); z-index: 2;
    }

    /* 裁剪线样式 */
    .cut-line {
      position: absolute;
      top: 0; bottom: 0;
      width: 24px;
      margin-left: -12px;
      background: transparent;
      cursor: col-resize;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cut-line::before {
      content: '';
      position: absolute;
      top: 0; bottom: 0; left: 11px;
      width: 2px;
      border-left: 2px dashed var(--cut-line-color);
    }
    .cut-line:hover::before { border-left-style: solid; }
    .cut-line::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: white;
      border: 3px solid var(--cut-line-color);
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      pointer-events: none;
    }
    .cut-label {
      position: absolute;
      top: 28px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.75);
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
      z-index: 13;
    }

    .bottom-toolbar {
      position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
      background: var(--surface); padding: 0.75rem 2rem; border-radius: 9999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      display: none; gap: 1rem; align-items: center; z-index: 200;
      border: 1px solid var(--border);
    }
    .tool-btn {
      background: transparent; border: none; color: var(--text-sub);
      font-weight: 500; display: flex; align-items: center; gap: 0.5rem;
      padding: 0.6rem 1rem; border-radius: 0.5rem; cursor: pointer;
      transition: all 0.2s;
    }
    .tool-btn:hover { background: #f1f5f9; color: var(--text-main); }
    .tool-btn.primary { background: var(--primary); color: white; }
    .tool-btn.danger { background: #fee2e2; color: #b91c1c; }
    .tool-btn:disabled { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; color: var(--text-sub); }

    .loading-overlay {
      position: fixed; inset: 0;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(8px);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 9999; opacity: 0; visibility: hidden; transition: opacity 0.3s;
    }
    .loading-overlay.visible { opacity: 1; visibility: visible; }

    .loading-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      width: 320px;
      text-align: center;
      border: 1px solid var(--border);
    }

    .spinner-box { width: 50px; height: 50px; margin: 0 auto 1.5rem auto; position: relative; }
    .circle-outer {
      width: 100%; height: 100%; border-radius: 50%;
      border: 4px solid var(--border); border-top-color: var(--primary);
      animation: spin 1s linear infinite;
    }
    .circle-inner {
      position: absolute; top: 6px; left: 6px; right: 6px; bottom: 6px;
      border-radius: 50%; border: 3px solid transparent;
      border-bottom-color: var(--primary-light);
      animation: spin-reverse 2s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes spin-reverse { to { transform: rotate(-360deg); } }

    .loading-title { font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; }
    .loading-desc { font-size: 0.9rem; color: var(--text-sub); margin-bottom: 1.5rem; min-height: 1.35em; }

    .progress-container {
      width: 100%; height: 6px; background: var(--bg);
      border-radius: 3px; overflow: hidden; position: relative;
    }
    .progress-bar {
      height: 100%; background: var(--primary); width: 0%;
      border-radius: 3px; transition: width 0.2s ease-out;
      background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
      background-size: 1rem 1rem;
      animation: progress-stripes 1s linear infinite;
    }
    @keyframes progress-stripes { from { background-position: 1rem 0; } to { background-position: 0 0; } }
  </style>
</head>
<body>

  <nav class="navbar">
    <div class="logo"><span>✂️</span><span>PDF页面自由裁切工具</span></div>
    <div class="nav-actions">
      <button id="btnNewFile" class="btn secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
        导入新文件
      </button>
      <button id="btnDownload" class="btn primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        导出 PDF
      </button>
    </div>
  </nav>

  <main class="main-container" id="uploadZone">
    <div class="empty-state" id="emptyState">
      <div class="upload-icon">📄</div>
      <h2>拖拽 PDF 文件到这</h2>
      <p style="margin: 0.5rem 0 1.5rem; color: var(--text-sub);">支持原始清晰度导出，体积不变</p>
      <button class="btn primary" id="btnChooseFile" style="display: inline-flex;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
        选择文件
      </button>
      <input type="file" id="fileInput" hidden accept=".pdf">
    </div>
    <div class="grid-container" id="gridContainer" style="display: none;"></div>
  </main>

  <div class="bottom-toolbar" id="toolbar">
    <button class="tool-btn primary" id="btnAutoSplit">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
      一键平分所有页
    </button>
    <button class="tool-btn danger" id="btnRemoveCut" disabled>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      清除选中页裁剪线
    </button>
  </div>

  <!-- 加载层 -->
  <div class="loading-overlay" id="loader">
    <div class="loading-card">
      <div class="spinner-box">
        <div class="circle-outer"></div>
        <div class="circle-inner"></div>
      </div>
      <h3 class="loading-title" id="loadingTitle">正在处理...</h3>
      <p class="loading-desc" id="loadingDesc">请稍候</p>
      <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
      </div>
    </div>
  </div>

  <!-- PDF-lib (UMD) 必须在 module 之前加载 -->
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>

  <script type="module">
    import * as pdfjsLib from 'https://unpkg.com/pdfjs-dist@4.2.67/build/pdf.mjs';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.2.67/build/pdf.worker.mjs';

    const { PDFDocument } = PDFLib;

    // ========== 状态管理 ==========
    const state = {
      pages: [],              // 页面数据对象
      pdfDoc: null,           // pdf-lib 文档
      pdfJsDoc: null,         // pdf.js 文档 (用于销毁)
      currentIdx: null,       // 当前选中页
      isDragging: false,      // 拖拽状态
      activeLine: null,       // 当前拖拽的裁剪线对象
      fileName: '裁剪结果'
    };

    // ========== DOM 缓存 ==========
    const $ = id => document.getElementById(id);
    const loader = $('loader');
    const progressBar = $('progressBar');
    const loadingTitle = $('loadingTitle');
    const loadingDesc = $('loadingDesc');
    const emptyState = $('emptyState');
    const gridContainer = $('gridContainer');
    const toolbar = $('toolbar');
    const uploadZone = $('uploadZone');
    const fileInput = $('fileInput');
    const btnNewFile = $('btnNewFile');
    const btnDownload = $('btnDownload');
    const btnChooseFile = $('btnChooseFile');
    const btnAutoSplit = $('btnAutoSplit');
    const btnRemoveCut = $('btnRemoveCut');

    // ========== 工具函数 ==========
    function setLoadingState(title, desc, percent) {
      loadingTitle.innerText = title;
      loadingDesc.innerText = desc;
      progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    }
    const yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0));

    // ========== 事件绑定 ==========
    btnChooseFile.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
    btnNewFile.addEventListener('click', () => fileInput.click());
    btnDownload.addEventListener('click', exportPdf);
    btnAutoSplit.addEventListener('click', autoSplitAll);
    btnRemoveCut.addEventListener('click', removeCurrentCut);

    // 拖拽上传
    let dragCounter = 0;
    uploadZone.addEventListener('dragenter', e => {
      e.preventDefault();
      dragCounter++;
      emptyState.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', e => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        emptyState.classList.remove('drag-over');
      }
    });
    uploadZone.addEventListener('dragover', e => e.preventDefault());
    uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      dragCounter = 0;
      emptyState.classList.remove('drag-over');
      handleFile(e.dataTransfer.files[0]);
    });

    // ========== 核心逻辑：文件处理 ==========
    async function handleFile(file) {
      if (!file) return;

      // 清理旧的 PDF.js 文档（等待完成）
      if (state.pdfJsDoc) {
        try {
          await state.pdfJsDoc.destroy();
        } catch (e) {
          console.warn('销毁旧 PDF.js 文档失败:', e);
        }
        state.pdfJsDoc = null;
      }

      // 重置工作区
      emptyState.style.display = 'flex';
      gridContainer.style.display = 'none';
      toolbar.style.display = 'none';
      btnNewFile.style.display = 'none';
      btnDownload.style.display = 'none';
      gridContainer.innerHTML = '';

      // 重置状态
      state.pages = [];
      state.pdfDoc = null;
      state.currentIdx = null;
      let baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/:*?"<>|]/g, '_').trim();
      state.fileName = baseName.slice(0, 100) || '裁剪结果'; // 限制长度并防空

      setLoadingState("正在读取文件", "准备数据中", 0);
      loader.classList.add('visible');

      try {
        // 读取数据并创建两份副本
        const rawBuffer = await file.arrayBuffer();
        const pdfJsData = new Uint8Array(rawBuffer).slice();
        const pdfLibData = new Uint8Array(rawBuffer).slice();

        setLoadingState("正在解析 PDF", "分析结构...", 10);

        const [pdfDoc, pdf] = await Promise.all([
          PDFDocument.load(pdfLibData),
          pdfjsLib.getDocument({
            data: pdfJsData,
            isEvalSupported: false,
            useSystemFonts: true,
            cMapUrl: 'https://unpkg.com/pdfjs-dist@4.2.67/cmaps/',
            cMapPacked: true
          }).promise
        ]);

        state.pdfDoc = pdfDoc;
        state.pdfJsDoc = pdf;

        // 显示工作区容器（页面卡片尚未渲染，但容器可见）
        emptyState.style.display = 'none';
        gridContainer.style.display = 'grid';
        toolbar.style.display = 'flex';
        btnNewFile.style.display = 'inline-flex';
        btnDownload.style.display = 'inline-flex';

        setLoadingState("正在初始化页面", "准备画布...", 20);

        // 获取所有页面对象
        const pagePromises = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          pagePromises.push(pdf.getPage(i));
        }
        const pdfPages = await Promise.all(pagePromises);

        // 创建页面卡片
        for (let i = 0; i < pdfPages.length; i++) {
          const page = pdfPages[i];
          const vp = page.getViewport({ scale: 1.5 });
          const baseVP = page.getViewport({ scale: 1 });

          const card = createPageCard(i, vp.width, vp.height);

          const canvas = card.querySelector('canvas');
          const contentEl = card.querySelector('.card-content');

          state.pages.push({
            el: card,
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            contentEl: contentEl,
            cutLines: [],
            baseW: baseVP.width,
            baseH: baseVP.height,
            renderVP: vp,
            pdfPage: page
          });
        }

        // 并发渲染（第一页完成后隐藏加载层）
        setLoadingState("正在渲染预览", "大型文件可能较慢", 30);

        let renderedCount = 0;
        const totalPages = state.pages.length;
        const queue = [...state.pages];
        const concurrency = 4;

        async function renderWorker() {
          while (queue.length > 0) {
            const p = queue.shift();
            try {
              await p.pdfPage.render({ canvasContext: p.ctx, viewport: p.renderVP }).promise;
              p.el.classList.remove('loading');
              renderedCount++;

              // 【关键】第一页渲染完成后立即隐藏加载层，让用户开始操作
              if (renderedCount === 1) {
                loader.classList.remove('visible');
              }

              // 如果加载层仍可见（例如第一页渲染失败），继续更新进度
              if (loader.classList.contains('visible')) {
                const progress = 30 + Math.round(70 * renderedCount / totalPages);
                setLoadingState(`渲染预览 (${renderedCount}/${totalPages})`, "即将完成...", progress);
              }
            } catch (err) {
              console.error('页面渲染失败:', err);
            }
          }
        }

        const workers = Array(Math.min(concurrency, queue.length)).fill(0).map(() => renderWorker());
        await Promise.all(workers);

        // 兜底：若加载层仍可见（例如所有页面渲染失败），则隐藏
        if (loader.classList.contains('visible')) {
          loader.classList.remove('visible');
        }

      } catch (err) {
        console.error('文件处理失败:', err);
        alert('解析失败: ' + err.message);
        loader.classList.remove('visible');
      }
    }

    // ========== UI 生成 ==========
    function createPageCard(index, w, h) {
      const div = document.createElement('div');
      div.className = 'page-card loading';
      div.innerHTML = `
        <div class="page-num-badge">第 ${index + 1} 页</div>
        <div class="card-content">
            <canvas width="${w}" height="${h}"></canvas>
        </div>
        <div class="card-overlay">
          <button class="btn primary action-btn" style="padding: 0.6rem 1rem; border-radius: 8px; pointer-events: auto; display: inline-flex;">
            添加裁切线
          </button>
        </div>
      `;

      const btn = div.querySelector('.action-btn');
      const pageIndex = index;

      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleCutLine(pageIndex);
      });

      div.addEventListener('click', () => selectPage(pageIndex));
      gridContainer.appendChild(div);
      return div;
    }

    // ========== 交互逻辑 ==========
    function selectPage(index) {
      state.pages.forEach((p, i) => p.el.classList.toggle('selected', i === index));
      state.currentIdx = index;
      updateToolbarState();
    }

    function updateToolbarState() {
      const hasCurrent = state.currentIdx !== null;
      const currentPage = hasCurrent ? state.pages[state.currentIdx] : null;
      const hasCuts = currentPage && currentPage.cutLines.length > 0;
      btnRemoveCut.disabled = !hasCuts;
    }

    function toggleCutLine(index) {
      const page = state.pages[index];
      if (!page) return;
      selectPage(index);

      if (page.cutLines.length > 0) {
        clearCutLines(index);
      } else {
        addCutLine(index, 0.5);
      }
    }

    // ========== 裁剪线核心逻辑 ==========
    function addCutLine(index, initialRatio = 0.5) {
      const page = state.pages[index];
      if (!page) return;

      removeCutLineElements(index); // 清理旧线，但不更新状态

      const line = document.createElement('div');
      line.className = 'cut-line';

      const label = document.createElement('span');
      label.className = 'cut-label';
      line.appendChild(label);

      page.contentEl.appendChild(line);

      const cutData = { el: line, ratio: initialRatio, label };
      page.cutLines.push(cutData);

      // 使用 CSS 显示宽度定位
      updateLinePosition(page, cutData);

      line.addEventListener('mousedown', e => {
        state.isDragging = true;
        state.activeLine = { page, cutData };
        e.stopPropagation();
      });

      line.addEventListener('dblclick', e => {
        e.stopPropagation();
        updateButtonState(index);
      });

      updateButtonState(index);
      updateToolbarState();
    }

    function updateLinePosition(page, cutData) {
      // 使用 contentEl 的宽度，与裁剪线的定位父级保持一致
      const visualWidth = page.contentEl.getBoundingClientRect().width;
      
      cutData.el.style.left = `${visualWidth * cutData.ratio}px`;
      updateCutLabel(cutData);
    }

    function updateCutLabel(cutData) {
      const percent = Math.round(cutData.ratio * 100);
      cutData.label.textContent = percent + '%';
    }

    // 只负责移除裁剪线 DOM 和清空数据，不更新按钮状态
    function removeCutLineElements(index) {
      const page = state.pages[index];
      if (!page) return;
      page.cutLines.forEach(c => c.el.remove());
      page.cutLines = [];
    }

    // 清除裁剪线（外部调用，包含状态更新）
    function clearCutLines(index) {
      removeCutLineElements(index);
      updateButtonState(index);
      updateToolbarState();
    }

    function updateButtonState(index) {
      const page = state.pages[index];
      if (!page) return;
      const btn = page.el.querySelector('.action-btn');
      const hasCut = page.cutLines.length > 0;

      if (hasCut) {
        btn.textContent = "清除裁剪线";
        btn.className = "btn danger action-btn";
      } else {
        btn.textContent = "添加裁切线";
        btn.className = "btn primary action-btn";
      }
      btn.style.display = 'inline-flex';
    }

    // 全局鼠标移动
    window.addEventListener('mousemove', e => {
      if (!state.isDragging || !state.activeLine) return;

      const { page, cutData } = state.activeLine;

      // 使用 contentEl 的边界，保证坐标计算基准一致
      const rect = page.contentEl.getBoundingClientRect();

      const offsetX = e.clientX - rect.left;
      const ratio = offsetX / rect.width;

      // 限制在 0.05 ~ 0.95 之间，避免贴边
      cutData.ratio = Math.max(0.05, Math.min(0.95, ratio));

      updateLinePosition(page, cutData);
    });

    window.addEventListener('mouseup', () => {
      state.isDragging = false;
      state.activeLine = null;
    });

    // ========== 工具栏按钮 ==========
    function removeCurrentCut() {
      if (state.currentIdx !== null) {
        clearCutLines(state.currentIdx);
      }
    }

    function autoSplitAll() {
      state.pages.forEach((p, i) => {
        addCutLine(i, 0.5);
      });
      if (state.pages.length > 0) {
        selectPage(0);
      }
    }

    // ========== 导出逻辑 ==========
    async function exportPdf() {
      if (!state.pdfDoc) return alert('请先上传文件');

      const hasAnyCut = state.pages.some(p => p.cutLines.length > 0);
      if (!hasAnyCut) {
        if (!confirm('当前未设置任何裁剪线，将导出原文件。\n确定继续吗？')) return;
      }

      loader.classList.add('visible');
      setLoadingState("准备导出", "分析布局中...", 0);
      await yieldToMain();

      try {
        const newPdfDoc = await PDFDocument.create();

        // 收集所有片段
        const segments = [];
        state.pages.forEach((page, pageIndex) => {
          if (page.cutLines.length > 0) {
            const ratios = page.cutLines.map(c => c.ratio).sort((a, b) => a - b);
            let lastPos = 0;
            ratios.forEach(r => {
              segments.push({ pageIndex, start: lastPos, end: r });
              lastPos = r;
            });
            segments.push({ pageIndex, start: lastPos, end: 1 });
          } else {
            segments.push({ pageIndex, start: 0, end: 1 });
          }
        });

        setLoadingState("复制页面", "正在处理页面资源...", 20);

        const pageIndices = segments.map(s => s.pageIndex);
        const copiedPages = await newPdfDoc.copyPages(state.pdfDoc, pageIndices);

        const total = segments.length;
        for (let i = 0; i < total; i++) {
          const seg = segments[i];
          const copiedPage = copiedPages[i];

          const pageData = state.pages[seg.pageIndex];
          const w = pageData.baseW;
          const h = pageData.baseH;

          const x = seg.start * w;
          const newW = (seg.end - seg.start) * w;

          if (newW < 1) continue;

          copiedPage.setMediaBox(x, 0, newW, h);
          copiedPage.setCropBox(x, 0, newW, h);

          newPdfDoc.addPage(copiedPage);

          if (i % 10 === 0 || i === total - 1) {
            const progress = 20 + Math.round(75 * (i + 1) / total);
            setLoadingState(`正在生成`, `处理片段 ${i+1}/${total}`, progress);
            await yieldToMain();
          }
        }

        if (newPdfDoc.getPageCount() === 0) {
          alert('未生成有效页面，请检查裁剪线位置。');
          loader.classList.remove('visible');
          return;
        }

        setLoadingState("正在保存", "压缩数据中...", 95);
        const pdfBytes = await newPdfDoc.save({ useObjectStreams: false });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${state.fileName}_裁剪结果.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);

        setLoadingState("导出成功", "即将关闭...", 100);
        setTimeout(() => loader.classList.remove('visible'), 800);

      } catch (err) {
        console.error('导出失败:', err);
        alert('导出失败: ' + err.message);
        loader.classList.remove('visible');
      }
    }
  </script>
</body>
</html>
```
:::

## PDF24 Tools

> 更优秀的工具[PDF24 Tools](https://www.pdf24.org/zh)，如`将PDF页面裁切为两半`，可使用在线版本，也可以下载离线版本使用。