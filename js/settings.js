class SettingsManager {
    constructor() {
        this.fullscreenBtn = document.getElementById('fullscreen');
        this.settingsBtn = document.getElementById('settings');
        this.settingsOverlay = document.getElementById('settingsOverlay');
        this.closeSettingsBtn = document.getElementById('closeSettings');
        
        // 设置选项
        this.timeFormatToggle = document.getElementById('timeFormatToggle');
        this.showDateToggle = document.getElementById('showDateToggle');
        this.autoChangeToggle = document.getElementById('autoChangeToggle');
        
        // 自动切换背景的定时器
        this.autoChangeInterval = null;
        
        this.init();
        this.loadSettings();
    }

    init() {
        // 全屏模式
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        
        // 设置弹窗
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.settingsOverlay.addEventListener('click', (e) => {
            if (e.target === this.settingsOverlay) {
                this.closeSettings();
            }
        });
        
        // ESC键关闭设置
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.settingsOverlay.style.display === 'flex') {
                this.closeSettings();
            }
        });
        
        // 设置变更监听
        this.timeFormatToggle.addEventListener('change', () => {
            this.saveSettings();
            this.applySettings();
        });
        
        this.showDateToggle.addEventListener('change', () => {
            this.saveSettings();
            this.applySettings();
        });
        
        this.autoChangeToggle.addEventListener('change', () => {
            this.saveSettings();
            this.applySettings();
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            window.scrollTo(0, 0);
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    openSettings() {
        this.settingsOverlay.style.display = 'flex';
    }

    closeSettings() {
        this.settingsOverlay.style.display = 'none';
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('clockSettings') || '{}');
        
        // 设置默认值
        this.timeFormatToggle.checked = settings.timeFormat === '12' || false;
        this.showDateToggle.checked = settings.showDate !== false;
        this.autoChangeToggle.checked = settings.autoChange || false;
        
        this.applySettings();
    }

    saveSettings() {
        const settings = {
            timeFormat: this.timeFormatToggle.checked ? '12' : '24',
            showDate: this.showDateToggle.checked,
            autoChange: this.autoChangeToggle.checked
        };
        
        localStorage.setItem('clockSettings', JSON.stringify(settings));
    }

    applySettings() {
        // 应用时间格式
        const clockInstance = window.clockInstance;
        if (clockInstance) {
            clockInstance.use12Hour = this.timeFormatToggle.checked;
            clockInstance.updateTime();
        }
        
        // 应用日期显示
        const dateElement = document.getElementById('date');
        dateElement.style.display = this.showDateToggle.checked ? 'block' : 'none';
        
        // 应用自动切换背景
        if (this.autoChangeToggle.checked) {
            this.startAutoChange();
        } else {
            this.stopAutoChange();
        }
    }

    startAutoChange() {
        if (this.autoChangeInterval) {
            clearInterval(this.autoChangeInterval);
        }
        
        // 每2分钟切换一次背景
        this.autoChangeInterval = setInterval(() => {
            const backgroundManager = window.backgroundManager;
            if (backgroundManager) {
                backgroundManager.next();
            }
        }, 120000); // 120000ms = 2分钟
    }

    stopAutoChange() {
        if (this.autoChangeInterval) {
            clearInterval(this.autoChangeInterval);
            this.autoChangeInterval = null;
        }
    }
} 