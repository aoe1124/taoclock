# TaoClock

## 项目简介
TaoClock 是一个追求极简美学的全屏时钟网站。纯英文网站。我们通过精心制作的 AI 生成艺术背景和简约优雅的界面设计，为用户提供纯粹的时间显示体验。每一幅背景图都经过精心策划和生成，保持高品质的视觉效果和统一的美学风格。

## 设计理念
- 简约至上：去除冗余元素，让界面简洁清晰
- 内容为王：让精美的背景图像成为视觉主角
- 交互流畅：确保每个操作自然顺滑

## 核心功能

### 1. 时钟显示
- 全屏显示当前时间
  * 支持24小时制（默认）和12小时制切换
  * 显示格式：HH:MM:SS
- 日期显示
  * 显示格式：YYYY年MM月DD日
  * 位于时间显示下方

### 2. 视觉设计
- 背景图系统
  * 精选AI生成的高质量背景图
  * 图片命名规范：
    - 主图：bg[n].webp（n为序号）
    - 后备图：bg[n].jpg
    - 缩略图：thumbnail/preview[n].webp（485x272，用于网格显示）
    * 支持手动切换背景
    * 背景图要求：
      - 分辨率：统一2912 x 1632
      - 缩略图：485x272（保持原图16:9比例）
      - 风格：高质量AI生成艺术，保持视觉统一性
      - 图片优化：确保加载速度

- 字体设计
  * 主要时间显示：大号无衬线字体
  * 日期显示：较小字号
  * 确保在各种背景下都清晰可见

### 3. 交互功能
- 全屏模式
  * 支持进入/退出全屏显示
  * 快捷键：F11 或点击按钮
  
- 专注模式
  * 隐藏所有UI元素，仅显示时间
  * 快捷键：Esc 或点击按钮

- 设置面板
  * 时制切换（12/24小时）
  * 显示/隐藏秒数选项
  * 面板可收起

### 4. 技术要求
- 响应式设计
  * 支持桌面端
    - 标准宽屏（16:9，1920x1080及以上）
    - 超宽屏（21:9, 2560x1080及以上）
    - 方形屏幕（16:10，1920x1200等）
  * 支持平板端（768px及以上）
  * 支持移动端（320px及以上）
  
- 性能要求
  * 首屏加载时间 < 2秒
  * 时间显示精确度 < 1秒误差
  * 背景图预加载

## 项目结构 
tao-clock/
├── index.html
├── css/
│ ├── style.css
│ └── responsive.css
├── js/
│ ├── clock.js
│ ├── settings.js
│ └── background.js
├── assets/
│ ├── backgrounds/
│ │ ├── bg1.webp
│ │ ├── bg2.webp
│ │ └── thumbnail/
│ │   ├── preview1.webp
│ │   └── preview2.webp
│ ├── icons/
│ └── fonts/
└── README.md

## 开发优先级
1. 基础时钟功能实现
2. 背景图系统
3. 全屏与专注模式
4. 设置面板
5. 响应式适配

## 后续迭代方向（v2.0）
- 背景音效
- 多时区支持
- 主题切换