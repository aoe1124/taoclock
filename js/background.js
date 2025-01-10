class BackgroundManager {
    constructor() {
        this.backgrounds = [
            {
                webp: 'assets/backgrounds/bg1.webp',
                jpg: 'assets/backgrounds/bg1.jpg'
            },
            {
                webp: 'assets/backgrounds/bg2.webp',
                jpg: 'assets/backgrounds/bg2.jpg'
            },
            {
                webp: 'assets/backgrounds/bg3.webp',
                jpg: 'assets/backgrounds/bg3.jpg'
            },
            {
                webp: 'assets/backgrounds/bg4.webp',
                jpg: 'assets/backgrounds/bg4.jpg'
            },
            {
                webp: 'assets/backgrounds/bg5.webp',
                jpg: 'assets/backgrounds/bg5.jpg'
            },
            {
                webp: 'assets/backgrounds/bg6.webp',
                jpg: 'assets/backgrounds/bg6.jpg'
            },
            {
                webp: 'assets/backgrounds/bg7.webp',
                jpg: 'assets/backgrounds/bg7.jpg'
            },
            {
                webp: 'assets/backgrounds/bg8.webp',
                jpg: 'assets/backgrounds/bg8.jpg'
            },
            {
                webp: 'assets/backgrounds/bg9.webp',
                jpg: 'assets/backgrounds/bg9.jpg'
            },
            {
                webp: 'assets/backgrounds/bg10.webp',
                jpg: 'assets/backgrounds/bg10.jpg'
            }
        ];
        this.currentIndex = 0;
        this.container = document.querySelector('.background-container');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        
        this.init();
        this.preloadImages();
        this.initViewCounts();
    }

    init() {
        // 初始化缩略图点击事件
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const index = parseInt(thumbnail.dataset.index);
                this.changeBackground(index);
                this.updateThumbnails(index);
            });
        });
    }

    updateThumbnails(activeIndex) {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active');
        });
        this.thumbnails[activeIndex].classList.add('active');
        this.currentIndex = activeIndex;
    }

    preloadImages() {
        // 预加载所有背景图
        this.backgrounds.forEach(src => {
            const img = new Image();
            img.src = src.webp;
        });
    }

    async changeBackground(index) {
        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 更新缩略图激活状态
        document.querySelectorAll('.background-item').forEach((item, i) => {
            if (i === index) {
                item.querySelector('.background-preview').classList.add('active');
            } else {
                item.querySelector('.background-preview').classList.remove('active');
            }
        });

        // 创建新背景元素
        const newBg = document.createElement('div');
        newBg.className = 'background';
        newBg.innerHTML = `
            <picture>
                <source srcset="${this.backgrounds[index].webp}" type="image/webp">
                <img src="${this.backgrounds[index].jpg}" alt="Background">
            </picture>
        `;
        this.container.appendChild(newBg);

        // 等待图片加载完成
        await new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.src = this.backgrounds[index].webp;
        });

        // 激活新背景
        setTimeout(() => {
            newBg.classList.add('active');
            
            // 移除旧背景
            const oldBgs = document.querySelectorAll('.background:not(:last-child)');
            oldBgs.forEach(bg => {
                bg.classList.remove('active');
                setTimeout(() => bg.remove(), 1000);
            });
        }, 50);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
        this.changeBackground(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.backgrounds.length) % this.backgrounds.length;
        this.changeBackground(this.currentIndex);
    }

    initViewCounts() {
        // 从localStorage获取已保存的浏览数
        const savedCounts = JSON.parse(localStorage.getItem('viewCounts') || '{}');
        
        document.querySelectorAll('.background-item').forEach(item => {
            const index = item.dataset.index;
            const countElement = item.querySelector('.count');
            
            // 设置初始值
            const views = savedCounts[index] || 0;
            this.updateViewCount(countElement, views);
            
            // 点击时增加计数并切换背景
            item.addEventListener('click', () => {
                const newCount = (savedCounts[index] || 0) + 1;
                savedCounts[index] = newCount;
                localStorage.setItem('viewCounts', JSON.stringify(savedCounts));
                this.updateViewCount(countElement, newCount);
                // 切换背景
                this.changeBackground(parseInt(index));
            });
        });
    }

    updateViewCount(element, count) {
        // 格式化数字
        let formatted = count;
        if (count >= 1000000) {
            formatted = (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            formatted = (count / 1000).toFixed(1) + 'k';
        }
        element.textContent = formatted;
    }
}

// 初始化背景管理器
document.addEventListener('DOMContentLoaded', () => {
    window.backgroundManager = new BackgroundManager();
}); 